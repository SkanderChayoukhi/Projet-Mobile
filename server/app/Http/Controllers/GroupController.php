<?php

namespace App\Http\Controllers;

use App\Models\Group;
use App\Http\Requests\StoreGroupRequest;
use App\Http\Requests\UpdateGroupRequest;
use App\Mail\QuitGroupMail;
use App\Mail\WelcomeOutsideToGroupMail;
use App\Mail\WelcomeToGroupMail;
use App\Models\Card;
use App\Models\Invitation;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;

class GroupController extends Controller
{

    public function index()
    {
        $groups = Group::with(['users' => function ($query) {
            $query->withPivot('is_validated');
        }])->with('tags')->with('types')->get();

        return response()->json($groups);
    }

    public function getUserGroups($userId)
    {
        $userGroupsId = DB::table('user_groups')->where('user_id', $userId)->where('is_validated', 1)->pluck('group_id');

        $userGroups = Group::with(['users' => function ($query) {
            $query->withPivot('is_validated');
        }])->with('tags')->with('types')->whereIn('id', $userGroupsId)->get();

        return response()->json($userGroups);
    }

    public function create(Request $request)
    {
        try {
            $request->validate([
                'creator_id'    => 'required',
                'name'          => 'required',
                'description'     => '',
                'tasks_frequency'     => '',
                'is_paused'     => '',
            ]);
            $group = Group::create([
                'creator_id'      => $request->creator_id,
                'name'      => $request->name,
                'description'      => $request->description ?? '',
                'tasks_frequency'      => $request->tasks_frequency ?? 0,
                'is_paused'      => $request->is_paused ?? 0,
            ]);

            if ($creatorId = $request->creator_id) {
                $group->users()->sync([$creatorId]);

                DB::table('user_groups')->where('user_id', $creatorId)->where('group_id', $group->id)->update(['is_validated' => 1]);
            }

            if ($groupTagsId = $request->tags_id) {
                $group->tags()->sync($groupTagsId);
            }

            if ($groupTypesId = $request->types_id) {
                $group->types()->sync($groupTypesId);
            }

            if ($cardTagsId = DB::table('card_tags')->whereIn('tag_id', $groupTagsId)->distinct()->pluck('card_id')) {
                foreach ($cardTagsId as $cardId) {
                    $card = Card::find($cardId);
                    if (in_array($card->type, $groupTypesId)) {
                        DB::table('group_cards')->insert(['group_id' => $group->id, 'card_id' => $cardId, 'state' => 0, 'frequency' =>  $group->tasks_frequency, 'card_created_at' =>  $card->created_at, 'created_at' => now(), 'updated_at' => now()]);
                    }
                }
            }

            return response()->json($group);
        } catch (\Exception $e) {
            return response()->json($e);
        }
    }

    public function show($id)
    {
        $group = Group::with(['users' => function ($query) {
            $query->withPivot('is_validated');
        }])->with('tags')->with('types')->find($id);

        return response()->json($group);
    }

    public function edit(Request $request, $id)
    {
        try {
            $group = Group::find($id);

            $group->update([
                'creator_id'      => $request->creator_id ?? $group->creator_id,
                'name'      => $request->name ?? $group->name,
                'description'      => $request->description ?? $group->description,
                'tasks_frequency'      => $request->tasks_frequency ?? $group->tasks_frequency,
                'is_paused'      => $request->is_paused ?? $group->is_paused,
            ]);

            if ($groupTagsId = $request->tags_id) {
                $group->tags()->sync($groupTagsId);
            }

            if ($groupTypesId = $request->types_id) {
                $group->types()->sync($groupTypesId);
            }

            if ($cardTagsId = DB::table('card_tags')->whereIn('tag_id', $groupTagsId)->distinct()->pluck('card_id')) {
                foreach ($cardTagsId as $cardId) {
                    $card = Card::find($cardId);
                    if (in_array($card->type, $groupTypesId)) {
                        DB::table('group_cards')->where('group_id', $group->id)->where('card_id', $cardId)->update([
                            'frequency'      => $request->tasks_frequency ?? $group->tasks_frequency,
                            'card_created_at' =>  Card::find($cardId)->created_at,
                            'created_at' => now(),
                            'updated_at' => now()
                        ]);
                    }
                }
            }

            return response()->json($group);
        } catch (\Exception $e) {
            return response()->json($e);
        }
    }

    public function pause(Request $request, $id)
    {
        $group = Group::find($id);

        $group->update([
            'name'      => $group->name,
            'description'      => $group->description,
            'tasks_frequency'      => $group->tasks_frequency,
            'is_paused'      => $request->is_paused ?? 1,
        ]);

        return response()->json($group);
    }

    public function destroy($id)
    {
        $group = Group::find($id);
        $group->delete();
        return response()->json($group);
    }

    public function destroyUser($groupId, $userId)
    {
        $group = Group::with('users')->with('tags')->find($groupId);
        for ($i = 0; $i < count($group['users']); $i++) {
            if ($group['users'][$i]['id'] == $userId) {
                unset($group['users'][$i]);
            }
        }

        $usersGroup = json_decode(json_encode($group['users']), true);
        $newUserIds = array_column($usersGroup, 'id');

        $group->users()->sync($newUserIds);

        return response()->json($group);
    }

    public function addUser(Request $request, $groupId)
    {
        $user = User::where('email', $request->email)->first();

        if ($user) {
            $group = Group::with('users')->with('tags')->find($groupId);
            $usersGroup = json_decode(json_encode($group['users']), true);
            $userIds = array_column($usersGroup, 'id');
            array_push($userIds, $user->id);

            $invitationNumber =  $this->generateVerificationNumber();
            Invitation::create([
                'group_id'      => $group->id,
                'email'      => $request->email,
                'number'      => $invitationNumber,
            ]);
            Mail::to($user)->send(new WelcomeToGroupMail($user, $group, $invitationNumber));
            $group->users()->sync($userIds);
            return response()->json($group);
        } else {
            $group = Group::with('users')->with('tags')->find($groupId);
            $invitationNumber =  $this->generateVerificationNumber();
            Invitation::create([
                'group_id'      => $group->id,
                'email'      => $request->email,
                'number'      => $invitationNumber,
            ]);
            Mail::to(['email' => $request->email])->send(new WelcomeOutSideToGroupMail($request->email, $group, $invitationNumber));

            return response()->json($group);
        }
    }

    public function verifyUserGroup(Request $request)
    {
        $user = User::where('email', $request->email)->first();
        $userIsFound = DB::table('user_groups')->where('user_id', $user->id)->where('group_id', $request->group_id)->exists();

        $verificationNumber = Invitation::where('group_id', $request->group_id)->where('email', $request->email)->first();

        if ($verificationNumber->number == $request->number) {
            if (!$userIsFound) {
                $group = Group::with('users')->find($request->group_id);
                $usersGroup = json_decode(json_encode($group['users']), true);
                $userIds = array_column($usersGroup, 'id');
                array_push($userIds, $request->user_id);
                $group->users()->sync($userIds);
            }
            $verificationNumber->delete();
            DB::table('user_groups')->where('user_id', $request->user_id)->where('group_id', $request->group_id)->update(['is_validated' => 1]);
            return response()->json(['message' => 'Bienvenu', 'status' => '200']);
        } else {
            return response()->json(['message' => 'Code de vérification invalide', 'status' => '500']);
        }
    }

    public function getInvitationsToGroups($id)
    {
        $user = User::find($id);
        $invitations = Invitation::where('email', $user->email)->with('group')->get();
        return response()->json($invitations);
    }

    public function quit($groupId, $userId)
    {
        $group = Group::with('users')->with('tags')->find($groupId);
        for ($i = 0; $i < count($group['users']); $i++) {
            if ($group['users'][$i]['id'] == $userId) {
                unset($group['users'][$i]);
            }
        }

        $usersGroup = json_decode(json_encode($group['users']), true);
        $newUserIds = array_column($usersGroup, 'id');


        $user = User::find($userId);
        $creator = User::find($group->creator_id);

        Mail::to([$user, $creator])->send(new QuitGroupMail($user, $group));

        $group->users()->sync($newUserIds);

        return response()->json($group);
    }

    public function generateVerificationNumber()
    {
        return (rand(100000, 999999));
    }
    function getGroupIdFromGroupName($groupName) {
    // Get the group ID based on the group name
    $group = Group::where('name', $groupName)->first();

    if ($group) {
        return  response()->json($group->id); // Return group ID if group exists
    } else {
        return null; // Return null if group doesn't exist
    }
}

    function checkInvitationByGroupIdAndEmail(Request $request)
    {
        $groupId = $request->input('group_id');
        $email = $request->input('email');
        dd($groupId, $email);
        // Check if an invitation exists for the provided group ID and email
        $invitationExists =  Invitation::where('group_id', $request->group_id)->where('email', $request->email)->first();

        return "true";
    }

}
