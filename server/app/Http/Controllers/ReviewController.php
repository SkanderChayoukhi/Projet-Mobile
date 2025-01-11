<?php

namespace App\Http\Controllers;

use App\Models\Review;
use App\Http\Requests\StoreReviewRequest;
use App\Http\Requests\UpdateReviewRequest;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function index($cardId, $groupId)
    {
        $reviews = Review::where('card_id', $cardId)->where('group_id', $groupId)->get();

        return (response()->json($reviews));
    }

    public function store(Request $request, $cardId, $groupId)
    {
        $review = Review::where('card_id', $cardId)->where('group_id', $groupId)->where('user_id', $request->user_id)->first();
        if ($review) {
            return (response()->json($review));
        } else {
            $request->validate([
                'user_id'     => 'required',
                'review'     => 'required',
            ]);
            $created = Review::create([
                'card_id'      => $cardId,
                'group_id'      => $groupId,
                'user_id'      => $request->user_id,
                'review'      => $request->review,
            ]);

            return response()->json($created);
        }
    }
}
