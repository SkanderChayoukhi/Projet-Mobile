<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Mail\EmailVerification;
use App\Models\UserGroupReview;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use App\Mail\Download;


class UserController extends Controller
{
    public function update(Request $request, $id)
    {
        try {

            if ($request->password) {
                $cryptedPassword = bcrypt($request->password);
            }
            $user = User::find($id);
            $user->update([
                'first_name' => $request->first_name ?? $user->first_name,
                'last_name' => $request->last_name ?? $user->last_name,
                'email' => $request->email ?? $user->email,
                'password' => $cryptedPassword ?? $user->password,
            ]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Impossible de mettre à jour votre profil.', 'status' => '500'], 500);
        }
        return response()->json(['user' => $user, 'status' => '200']);
    }
    public function getGroupUsers($groupId)
    {
        $userIds = DB::table('user_groups')->where('group_id', $groupId)->pluck('user_id');
        $users = [];
        foreach ($userIds as $userId) {
            $users[] = User::find($userId);
        }

        return response()->json($users);
    }

    public function getUserGroupReviews($groupId)
    {
        $reviews = UserGroupReview::where('group_id', $groupId)->get();

        return (response()->json($reviews));
    }

    public function sendUserGroupReview(Request $request, $partnerId, $groupId)
    {
        $review = UserGroupReview::where('partner_id', $partnerId)->where('group_id', $groupId)->where('user_id', $request->user_id)->first();
        if ($review) {
            return (response()->json($review));
        } else {
            $request->validate([
                'user_id'     => 'required',
                'review'     => 'required',
            ]);
            $created = UserGroupReview::create([
                'partner_id'      => $partnerId,
                'group_id'      => $groupId,
                'user_id'      => $request->user_id,
                'review'      => $request->review,
            ]);

            return response()->json($created);
        }
    }
    public function InviteUser(Request $request)
    {
         $Download = new Download($request->email);
        Mail::to(['email' => $request->email])->send(new Download ($request->email));

    }

    public function generateVerificationNumber()
    {
        return (rand(100000, 999999));
    }
}
