<?php

namespace App\Http\Controllers;

use App\Models\Card;
use App\Models\Group;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Carbon\Carbon;

class CardController extends Controller
{

    public function index()
    {
        $cards = Card::with('tags')->get();
        return response()->json($cards);
    }

    public function create(Request $request)
    {
        $request->validate([
            'title'     => 'required',
            'description'     => 'required',
            'duration'     => 'required',
            'type'     => 'required',
        ]);

        if (request('image')) {
            $image = $request->input('image');
            $base64Data = substr($image, strpos($image, ',') + 1);
            $decodedData = base64_decode($base64Data);
            $filename = 'cards/' . Str::random(10) . '.' . explode('/', mime_content_type($image))[1];
            $path = Storage::disk('public')->put($filename, $decodedData);
        }

        $card = Card::create([
            'title'         => $request->title,
            'image'         => $filename ?? '',
            'description'   => $request->description,
            'duration'      => $request->duration,
            'type'          => $request->type,
            'status'        => 2,
        ]);

        if ($cardTagsId = $request->tags_id) {
            ($card->tags()->sync($cardTagsId));
        }

        if ($groupTagsId = DB::table('group_tags')->whereIn('tag_id', $cardTagsId)->distinct()->pluck('group_id')) {
            foreach ($groupTagsId as $groupId) {
                $groupTypeId = DB::table('group_types')->where('type_id', $card->type)->where('group_id', $groupId)->pluck('type_id')->first();
                if ($groupTypeId == $card->type) {
                    DB::table('group_cards')->insert(['group_id' => $groupId, 'card_id' => $card->id, 'state' => 0, 'frequency' => Group::find($groupId)->tasks_frequency, 'card_created_at' => $card->created_at, 'created_at' => now(), 'updated_at' => now()]);
                }
            }
        }

        return response()->json($card);
    }

    public function show($id)
    {
        $card = Card::with('tags')->find($id);
        return response()->json($card);
    }

    public function getGroupCards($idGroups)
    {
        $cards = [];

        $cardsGroupsId = DB::table('group_cards')->where('state', 20)->whereIn('group_id', explode(',', $idGroups))->get(['id', 'card_id', 'group_id']);

        foreach ($cardsGroupsId as $cardsGroupId) {
            $card = Card::where('id', $cardsGroupId->card_id)->with('tags')->first();
            $group = Group::find($cardsGroupId->group_id);
            $card->group = $group;
            $card->countdown = $this->getCardRemainingDate($card);
            $cards[] = $card;
        }

        return response()->json($cards);
    }

    public function getShiftedGroupCards($idGroups)
    {
        $cards = [];
        $cardsGroupsId = DB::table('group_cards')->where('state', 10)->whereIn('group_id', explode(',', $idGroups))->get(['id', 'card_id', 'group_id']);

        foreach ($cardsGroupsId as $cardsGroupId) {
            $card = Card::where('id', $cardsGroupId->card_id)->with('tags')->first();
            $group = Group::find($cardsGroupId->group_id);
            $card->group = $group;

            $cards[] = $card;
        }

        return response()->json($cards);
    }

    public function getExpiredGroupCards($idGroups)
    {
        $cards = [];
        $cardsGroupsId = DB::table('group_cards')->where('state', 40)->whereIn('group_id', explode(',', $idGroups))->get(['id', 'card_id', 'group_id']);

        foreach ($cardsGroupsId as $cardsGroupId) {
            $card = Card::where('id', $cardsGroupId->card_id)->with('tags')->first();
            $group = Group::find($cardsGroupId->group_id);
            $card->group = $group;

            $cards[] = $card;
        }

        return response()->json($cards);
    }

    public function getFinishedGroupCards($idGroups)
    {
        $cards = [];
        $cardsGroupsId = DB::table('group_cards')->where('state', 50)->whereIn('group_id', explode(',', $idGroups))->get(['id', 'card_id', 'group_id']);

        foreach ($cardsGroupsId as $cardsGroupId) {
            $card = Card::where('id', $cardsGroupId->card_id)->with('tags')->first();
            $group = Group::find($cardsGroupId->group_id);
            $card->group = $group;

            $cards[] = $card;
        }

        return response()->json($cards);
    }
    public function getUnfinishedGroupCards($idGroups)
    {
        $cards = [];
        $cardsGroupsId = DB::table('group_cards')->where('state', 60)->whereIn('group_id', explode(',', $idGroups))->get(['id', 'card_id', 'group_id']);

        foreach ($cardsGroupsId as $cardsGroupId) {
            $card = Card::where('id', $cardsGroupId->card_id)->with('tags')->first();
            $group = Group::find($cardsGroupId->group_id);
            $card->group = $group;

            $cards[] = $card;
        }

        return response()->json($cards);
    }
    public function edit(Request $request, $id)
    {
        $card = Card::find($id);

        if (request('image') != $card->image) {
            $image = $request->input('image');
            $base64Data = substr($image, strpos($image, ',') + 1);
            $decodedData = base64_decode($base64Data);
            $filename = 'cards/' . Str::random(10) . '.' . explode('/', mime_content_type($image))[1];
            $path = Storage::disk('public')->put($filename, $decodedData);
        }

        $card->update([
            'title'         => $request->title ?? $card->title,
            'image'         => $filename ?? $card->image,
            'description'   => $request->description ?? $card->description,
            'duration'      => $request->duration ?? $card->duration,
            'type'          => $request->type ?? $card->type,
            'status'        => $request->status ?? $card->status,
        ]);

        if ($cardTagsId = $request->tags_id) {
            $card->tags()->sync($cardTagsId);
        }

        if ($groupTagsId = DB::table('group_tags')->whereIn('tag_id', $cardTagsId)->distinct()->pluck('group_id')) {
            foreach ($groupTagsId as $groupId) {
                $groupTypeId = DB::table('group_types')->where('type_id', $card->type)->where('group_id', $groupId)->pluck('type_id')->first();
                if ($groupTypeId == $card->type) {
                    DB::table('group_cards')->where('card_id', $card->id)->where('group_id', $groupId)->update([
                        'group_id' => $groupId,
                        'card_id' => $card->id,
                        'frequency' => Group::find($groupId)->tasks_frequency,
                        'card_created_at' => $card->created_at,
                        'created_at' => now(),
                        'updated_at' => now()
                    ]);
                }
            }
        }

        return response()->json($card);
    }

    public function destroy($id)
    {
        $card = Card::find($id);
        $card->delete();
        return response()->json($card);
    }

    public function cronjob()
    {
        $groupIds = DB::table('group_cards')->distinct('group_id')->pluck('group_id');
        foreach ($groupIds as $groupId) {
            // If group has no assigned cards 
            $nullDatesGroupCards = DB::table('group_cards')->where('group_id', $groupId)->whereNull('assignement_date')->get();
            $allGroupCards = DB::table('group_cards')->where('group_id', $groupId)->get();
            if (count($allGroupCards) == count($nullDatesGroupCards)) {
                $randomGroupCard = $allGroupCards->random();
                DB::table('group_cards')->where('id', $randomGroupCard->id)->update(['state' => 20, 'assignement_date' => now()]);
            }
            // If group has finished/shifted card and wants to assign new one 
            else {
                $activeGroupCards = DB::table('group_cards')
                    ->whereRaw('state = 20 and group_id = ?', $groupId)
                    ->get();
                if (count($activeGroupCards) <= 0) {
                    $shiftedGroupCards = DB::table('group_cards')
                        ->whereRaw('TIMESTAMPDIFF(DAY,shift_date, NOW())  >= 0 and state = 10 and group_id = ?', $groupId)
                        ->get();
                    $statelessGroupCards = DB::table('group_cards')
                        ->whereRaw('TIMESTAMPDIFF(DAY,card_created_at, NOW())  >= frequency and state = 0 and group_id = ?', $groupId)
                        ->get();
                    // If we have shifted cards
                    if (count($shiftedGroupCards) > 0) {
                        $randomShiftedGroupCard = $shiftedGroupCards->random();
                        DB::table('group_cards')->where('id', $randomShiftedGroupCard->id)->update(['state' => 20, 'assignement_date' => now(), 'shift_date' => null]);
                    }
                    // If we have stateless cards
                    else if (count($statelessGroupCards) > 0) {
                        $randomStatelessGroupCards = $statelessGroupCards->random();
                        DB::table('group_cards')->where('id', $randomStatelessGroupCards->id)->update(['state' => 20, 'assignement_date' => now(), 'shift_date' => null]);
                    }
                }
            }
        }
    }

    public function cardsGroupCreatorId()
    {
        $cardGroups = DB::table('group_cards')->get(['group_id', 'card_id']);
        foreach ($cardGroups as $cardGroup) {
            $group = Group::find($cardGroup->group_id);
            $cardGroup->creator_id = $group->creator_id;
        }

        return response()->json($cardGroups);
    }

    public function shift(Request $request, $cardId)
    {
        $cardGroup = DB::table('group_cards')
            ->where('card_id', $cardId)
            ->where('group_id', $request->group_id)
            ->update([
                'shift_date' => date('Y-m-d H-i-s', strtotime('+' . $request->days . ' days')),
                'state' => 10
            ]);

        return response()->json($cardGroup);
    }

    public function expire(Request $request, $cardId)
    {
        $cardGroup = DB::table('group_cards')
            ->where('card_id', $cardId)
            ->where('group_id', $request->group_id)
            ->update([
                'state' => 40,
            ]);

        return response()->json($cardGroup);
    }

    public function finish(Request $request, $cardId)
    {
        $cardGroup = DB::table('group_cards')
            ->where('card_id', $cardId)
            ->where('group_id', $request->group_id)
            ->update([
                'state' => $request->state,
            ]);

        return response()->json($cardGroup);
    }

    public function getCardRemainingDate($card)
    {
        $durationInDays = $card->duration;
        $assignementDate = DB::table('group_cards')->where('card_id', $card->id)->where('group_id', $card->group->id)->pluck('assignement_date')->first();
        $expiryDate = Carbon::parse($assignementDate)->addDays($durationInDays);

        return $expiryDate;
    }

    public function getCardCustomDescription($cardId, $groupId)
    {

        $customDescription = DB::table('group_cards')->where('card_id', $cardId)->where('group_id', $groupId)->first();

        return response()->json($customDescription);
    }

    public function updateCardCustomDescription(Request $request, $cardId, $groupId)
    {

        $customDescription = DB::table('group_cards')->where('card_id', $cardId)->where('group_id', $groupId)->update(['custom_description' => $request->custom_description]);

        return response()->json($customDescription);
    }
}
