<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\User;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function index($cardId, $groupId)
    {
        $cardComments = Comment::where('card_id', $cardId)->where('group_id', $groupId)->orderBy('updated_at', 'DESC')->get();
        foreach ($cardComments as $cardComment) {
            $user = User::find($cardComment->user_id);
            $cardComment['user'] = $user;
        }
        return response()->json($cardComments);
    }

    public function create(Request $request, $cardId, $groupId)
    {
        $created = Comment::query()->create([
            'body' => $request->comment,
            'user_id' => $request->user_id,
            'card_id' => $cardId,
            'group_id' => $groupId,
        ]);

        if ($created) {
            return response()->json('Commentaire créer avec succès');
        } else {
            return response()->json('Erreur de création de commentaire');
        }
    }

    public function edit(Request $request, $id)
    {
        $comment = Comment::find($id);

        $updated = $comment->update([
            'body' => $request->comment ?? $comment->body,
            'user_id' => $comment->user_id,
            'card_id' =>  $comment->card_id,
        ]);

        if ($updated) {
            return response()->json('Commentaire modifié avec succès');
        } else {
            return response()->json('Erreur de modification de commentaire');
        }
    }

    public function destroy($id)
    {
        $comment = Comment::find($id);
        $comment->delete();
        return response()->json($comment);
    }
}
