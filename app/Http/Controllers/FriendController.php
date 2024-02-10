<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\User;
use App\Models\Friend;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class FriendController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $friends = $user->friends;

        return response()->json($friends, 200);
    }

    public function show($friendId)
    {
        $friend = Friend::find($friendId);

        if (!$friend) {
            return response()->json(['error' => 'Ami non trouvé.'], 404);
        }

        return response()->json($friend, 200);
    }

    public function addFriend($userId)
    {
        try {
            $user = User::findOrFail($userId);

            $authUser = auth()->user();

            // Vérifiez si les utilisateurs ne sont pas déjà amis
            if (!$authUser->friends()->where('friend_id', $user->id)->exists()) {
                // Ajouter  à la liste d'amis
                $authUser->friends()->attach($user);
            }

            return response()->json($user, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

// Dans FriendController.php


        public function getFriends($userId)
        {
            try {
                // Recherchez l'utilisateur avec l'ID $userId
                $user = User::findOrFail($userId);

                // Récupérez la liste des amis de l'utilisateur
                $friends = DB::table('friends')
                    ->join('users', 'friends.friend_id', '=', 'users.id')
                    ->where('friends.user_id', $userId)
                    ->select('users.*')
                    ->get();

                return response()->json($friends, 200);
            } catch (\Exception $e) {
                return response()->json(['error' => $e->getMessage()], 500);
            }
        }




public function deleteFriend($userId, $friendId)
{
    try {
        // Recherchez l'utilisateur actuellement authentifié
        $authenticatedUser = Auth::user();

        // Vérifiez si l'utilisateur authentifié est le propriétaire de l'ami à supprimer
        if ($authenticatedUser->id != $userId) {
            // L'utilisateur authentifié n'est pas autorisé à supprimer cet ami
            return response()->json(['error' => 'Non autorisé à supprimer cet ami.'], 403);
        }

        // Recherchez l'ami à supprimer
        $friend = User::findOrFail($friendId);

        // Supprimez l'ami
        $authenticatedUser->friends()->detach($friend);

        return response()->json(['message' => 'Ami supprimé avec succès.'], 200);
    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
}




}
