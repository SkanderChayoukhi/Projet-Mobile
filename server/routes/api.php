<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\CardController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\GroupController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\UserDefiController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::controller(AuthController::class)->group(function () {
    Route::post('/reset', 'reset');
    Route::post('/verifyPassword', 'verifyPassword');
    Route::post('/resetVerification', 'sendResetVerification');
    Route::post('/login', 'login')->middleware('verifyEmail');
    Route::post('/register', 'register');
    Route::post('/registerOrLoginGoogle', 'registerOrLoginGoogle');
    Route::post('/verification', 'verification');
});

Route::controller(UserController::class)->group(function () {
    Route::patch('/users/{id}/update', 'update');
    Route::get('/users/{id}', 'view');
    Route::get('/users/groups/{groupId}', 'getGroupUsers');
    Route::get('/users/getReviews/{groupId}', 'getUserGroupReviews');
    Route::post('/users/{partnerId}/{groupId}', 'sendUserGroupReview');
    Route::post('/user/InviteUser', 'InviteUser');
});

Route::controller(TagController::class)->group(function () {
    Route::get('/tags', 'index');
    Route::post('/tags', 'create');
    Route::get('/tags/{id}', 'show');
    Route::delete('/tags/{id}', 'destroy');
    Route::patch('/tags/{id}', 'edit');
});

Route::controller(GroupController::class)->group(
    function () {
        Route::get('/groups', 'index');
        Route::get('/groups/users/{userId}', 'getUserGroups');
        Route::post('/groups', 'create');
        Route::post('/groups/verifyUserGroup', 'verifyUserGroup');
        Route::get('/groups/{id}', 'show');
        Route::delete('/groups/{id}', 'destroy');
        Route::delete('/groups/{id}/{userId}', 'destroyUser');
        Route::post('/groups/{id}', 'addUser');
        Route::delete('/groups/{id}/{userId}/quit', 'quit');
        Route::patch('/groups/{id}/pause', 'pause');
        Route::patch('/groups/{id}', 'edit');
        Route::get('/invitations/{id}', 'getInvitationsToGroups');
        Route::get('/groups/getGroupIdFromGroupName/{groupName}', 'getGroupIdFromGroupName');
        Route::get('/groups/checkInvitationByGroupIdAndEmail', 'checkInvitationByGroupIdAndEmail');
    }
);

Route::controller(CardController::class)->group(function () {
    Route::get('/cardsGroupCreatorId', 'cardsGroupCreatorId');
    Route::get('/cronjob', 'cronjob');
    Route::get('/cards', 'index');
    Route::post('/cards', 'create');
    Route::get('/cards/{id}', 'show');
    Route::get('/groupCards/{groupId}', 'getGroupCards');
    Route::get('/shiftedGroupCards/{groupId}', 'getShiftedGroupCards');
    Route::get('/expiredGroupCards/{groupId}', 'getExpiredGroupCards');
    Route::get('/finishedGroupCards/{groupId}', 'getFinishedGroupCards');
    Route::get('/unfinishedGroupCards/{groupId}', 'getUnfinishedGroupCards');
    Route::delete('/cards/{id}', 'destroy');
    Route::patch('/cards/{id}', 'edit');
    Route::patch('/cards/{id}/finish', 'finish');
    Route::patch('/cards/{id}/shift', 'shift');
    Route::patch('/cards/{id}/expire', 'expire');
    Route::get('/cards/customDescription/{cardId}/{groupId}', 'getCardCustomDescription');
    Route::patch('/cards/customDescription/{cardId}/{groupId}', 'updateCardCustomDescription');
});

Route::controller(CommentController::class)->group(function () {
    Route::get('/comments/{cardId}/{groupId}', 'index');
    Route::post('/comments/{cardId}/{groupId}', 'create');
    Route::delete('/comments/{id}', 'destroy');
    Route::patch('/comments/{id}', 'edit');
});

Route::controller(ImageController::class)->group(function () {
    Route::get('/images/{cardId}/{groupId}', 'index');
    Route::post('/images/{cardId}/{groupId}', 'create');
});

Route::controller(ReviewController::class)->group(function () {
    Route::get('reviews/{cardId}/{groupId}', 'index');
    Route::post('reviews/{cardId}/{groupId}', 'store');
});

Route::controller(UserDefiController::class)->group(function () {
    Route::get('defis/{cardId}/{groupId}', 'index');
    Route::post('defis', 'store');
    Route::patch('defis/{cardId}/{groupId}', 'update');
});
