<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Mail\EmailVerification;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

class AuthController extends Controller
{

    public function registerOrLoginGoogle(Request $request)
    {
        try {
            $foundUser = User::where('email', $request['email'])->first();
            if ($foundUser && $foundUser->type == 'google') {
                return response()->json(['status' => '200', 'user' => $foundUser], 200);
            }

            $user = User::create([
                'first_name'      => $request->first_name,
                'last_name'     => $request->last_name,
                'email'     => $request->email,
                'password'  => bcrypt($request->first_name),
                'type'  => 'google',
                'picture'  => $request->picture,
            ]);

            $user->email_verified_at = now();
            $user->save();
        } catch (\Exception $e) {
            return response()->json(['message' => 'Profil avec cet addresse mail existe.', 'status' => '500'], 500);
        }
        return response()->json(['status' => '201', 'user' => $user], 201);
    }
    public function register(Request $request)
    {
        try {
            $request->validate([
                'first_name'     => 'required',
                'last_name'     => 'required',
                'email'     => 'required|email',
                'email'     => 'required',
            ]);
            $user = User::create([
                'first_name'      => $request->first_name,
                'last_name'     => $request->last_name,
                'email'     => $request->email,
                'password'  => bcrypt($request->password),
            ]);

            $verificationNumber = $this->generateVerificationNumber();
            Cache::put('verification_number_' . $user->id, $verificationNumber, 30 * 60);
            Mail::to($user)->send(new EmailVerification($user, $verificationNumber));
        } catch (\Exception $e) {
            return response()->json(['message' => 'Profil avec cet addresse mail existe.', 'status' => '500'], 500);
        }
        return response()->json(['message' => 'Veuiller valider par mail la création de votre profil.', 'status' => '201', 'user' => $user], 201);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email'     => 'required|email',
            'password'  => 'required',
        ]);

        $user = User::where('email', $request['email'])->first();

        if (!$user) {
            return response()->json(['message' => 'Email inexistant', 'status' => '404']);
        } else if (!Hash::check($request['password'], $user->password)) {
            if ($user->type == 'basic') {
                return response()->json(['message' => 'Faux identifiants', 'status' => '500']);
            } else if ($user->type == 'google') {
                return response()->json(['message' => 'Ce compte est lié à Google', 'status' => '500']);
            } else {
                return response()->json(['message' => 'Ce compte est lié à Facebook', 'status' => '500']);
            }
        } else {
            $token = $user->createToken('auth_token')->plainTextToken;
            $status = '200';
            $user->save();
            return response()->json(compact('status', 'user', 'token'));
        }
    }

    public function verification(Request $request)
    {
        $user = User::find($request->id);

        $verificationNumber = Cache::get('verification_number_' . $user->id);

        if ($request->number == $verificationNumber) {
            $user->email_verified_at = $request->email_verified_at;
            $user->save();
            Cache::forget('verification_number_' . $user->id);
            return response()->json(['user' => $user, 'status' => '200']);
        } else {
            return response()->json(['message' => 'Code de vérification invalide', 'status' => '500']);
        }
    }

    public function generateVerificationNumber()
    {
        return (rand(100000, 999999));
    }

    public function sendResetVerification(Request $request)
    {
        try {
            $user = User::where('email', $request['email'])->first();
            if (!$user) {
                return response()->json(['message' => "Profil avec cet addresse mail n'existe pas.", 'status' => '500'], 500);
            } else {
                if ($user->type == 'basic') {
                    $verificationNumber = $this->generateVerificationNumber();
                    Cache::put('verification_number_' . $user->id, $verificationNumber, 30 * 60);
                    Mail::to($user)->send(new EmailVerification($user, $verificationNumber));
                } else if ($user->type == 'google') {
                    return response()->json(['message' => 'Ce compte est lié à Google', 'status' => '500']);
                } else {
                    return response()->json(['message' => 'Ce compte est lié à Facebook', 'status' => '500']);
                }
            }
        } catch (\Exception $e) {
            return response()->json(['message' => "Profil avec cet addresse mail n'existe pas.", 'status' => '500'], 500);
        }
        return response()->json(['message' => 'Veuiller inserer le code de validation envoyé par mail.', 'status' => '201', 'user' => $user], 201);
    }

    public function verifyPassword(Request $request)
    {
        $user = User::where('email', $request->email)->first();

        $verificationNumber = Cache::get('verification_number_' . $user->id);

        if ($request->number == $verificationNumber) {
            return response()->json(['status' => '200']);
        } else {
            return response()->json(['message' => 'Code de vérification invalide', 'status' => '500']);
        }
    }

    public function reset(Request $request)
    {
        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json(['status' => '500', 'message' => 'Erreur dans la mise à jour de mot de passe']);
        }

        $user->update([
            'password' => bcrypt($request->password),
        ]);

        return response()->json(['status' => '200']);
    }
}
