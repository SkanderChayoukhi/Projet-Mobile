<?php

namespace App\Http\Controllers;

use App\Models\UserDefi;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUserDefiRequest;
use App\Http\Requests\UpdateUserDefiRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UserDefiController extends Controller
{
    public function index($cardId, $groupId)
    {
        $group_card_id = DB::table('group_cards')->where('card_id', $cardId)->where('group_id', $groupId)->pluck('id')->first();
        $defiUsers = UserDefi::where('group_card_id', $group_card_id)->get();
        return response()->json($defiUsers);
    }

    public function store(Request $request)
    {
        $group_card_id = DB::table('group_cards')->where('card_id', $request->card_id)->where('group_id', $request->group_id)->pluck('id')->first();

        $created = UserDefi::create([
            'user_id' => $request->user_id,
            'group_card_id' => $group_card_id,
            'has_finished' => false,
        ]);

        $defiUsers = UserDefi::where('group_card_id', $group_card_id)->get();
        if (count($defiUsers) == 2) {
            DB::table('group_cards')->where('id', $group_card_id)->update(['assignement_date' => now()]);
            return response()->json("Countdown is reset");
        }

        return response()->json($created);
    }

    public function show(UserDefi $userDefi)
    {
        //
    }

    public function update(Request $request, $cardId, $groupId)
    {
        $group_card_id = DB::table('group_cards')->where('card_id', $cardId)->where('group_id', $groupId)->pluck('id')->first();

        $defiUser = UserDefi::where('group_card_id', $group_card_id)->where('user_id', $request->user_id)->update(['has_finished' => 1]);

        return response()->json($defiUser);
    }

    public function destroy(UserDefi $userDefi)
    {
        //
    }
}
