<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Image;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ImageController extends Controller
{
    public function index($cardId, $groupId)
    {
        $images = Image::where('card_id', $cardId)->where('group_id', $groupId)->orderBy('id', 'desc')->get();
        foreach ($images as $image) {
            $image->user = User::find($image->user_id);
        }
        return response()->json($images);
    }

    public function create(Request $request, $cardId, $groupId)
    {

        if (request('image')) {
            $image = $request->input('image');
            $base64Data = substr($image, strpos($image, ',') + 1);
            $decodedData = base64_decode($base64Data);
            $filename = 'cards/images/' . Str::random(10) . '.' . explode('/', mime_content_type($image))[1];
            $path = Storage::disk('public')->put($filename, $decodedData);
        }

        $image = new Image();
        $image->image = $filename;
        $image->card_id = $cardId;
        $image->group_id = $groupId;
        $image->user_id = $request->userId;
        $created = $image->save();

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
