<?php

namespace App\Http\Controllers\API;

use App\Models\User;
use Illuminate\Http\Request;
use App\Mail\EmailVerification;
use App\Http\Requests\LoginRequest;
use App\Http\Controllers\Controller;
use App\Http\Requests\SignupRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Session;

class AuthController extends Controller
{
    public function Signup(SignupRequest $request)
    {
        try {
            $data = $request->validated();

            $user = User::create([
                'first_name' => $data['first_name'],
                'last_name' => $data['last_name'],
                'email' => $data['email'],
                'phone_num' => $data['phone_num'],
                'location' => $data['location'],
                'password' => Hash::make($data['password']),
            ]);

            // Set the expiration time for the token (e.g., 1 hour)
            $expirationTime = 60 * 60;

            $token = $user->createToken('main', ['expires_in' => $expirationTime])->plainTextToken;

            return response([
                'user' => $user,
                'token' => $token,
                // 'otp' => $otp,
            ], 201);
        } catch (\Exception $e) {
            return response(['message' => 'Registration failed'], 422);
        }

    }

    public function sendVerification(SignupRequest $request)
    {
        try {
            $data = $request->validated();

            // $basic  = new \Vonage\Client\Credentials\Basic("acdb6a74", "ZLsq6osvMLqc8INX");
            // $client = new \Vonage\Client($basic);


            $Email_otp = str_pad(random_int(0, 999999), 6, '0', STR_PAD_LEFT);
            // Session::put('email_otp', $Email_otp);

            // $Phone_otp = str_pad(random_int(0, 999999), 6, '0', STR_PAD_LEFT);
            // Session::put('phone_otp', $Phone_otp);

            // Session::put('otp_expires_at', now()->addMinutes(10));

            // Message OTP Sending
            // $response = $client->sms()->send(
            //     new \Vonage\SMS\Message\SMS("923185339077", "Daily Tasker", 'Your OTP code is ' . $Phone_otp . ' Daily Tasker')
            // );
            // $message = $response->current();

            // Email OTP Sending
            Mail::to($data['email'])->send(new EmailVerification($data['first_name'] .' '. $data['last_name'], $Email_otp));


            // if ($message->getStatus() == 0) {
                return ['message' => "Check you Email and phone for OTP", "otp" => $Email_otp];
            // }

        } catch(\Exception $e) {
            // return response(['message' => $e->getMessage()], 422);
            return response(['message' => 'Registration failed'], 422);
        }

    }

    public function Login(LoginRequest $request)
    {
        $credentials = $request->validated();

        if(!Auth::attempt($credentials)){
            return  response()->json([
                'error' => "Email or Password is incorrect.",
            ]);
        };

        /** @var Admin $admin **/

        $user = Auth::user();

        // Set the initial expiration time (e.g., 1 hour)
        $initialExpiration = 60 * 60;

        // Extend the token's expiration time by resetting it
        $user->tokens->each(function ($token) use ($initialExpiration) {
            $token->forceFill([
                'expires_at' => now()->addSeconds($initialExpiration),
            ])->save();
        });

        $token = $user->createToken('main')->plainTextToken;

        return response([
            'user' => $user,
            'token' => $token
        ]);
    }

    public function Logout(Request $request)
    {
        /** @var Admin $user **/

        $user = $request->user();
        $user->currentAccessToken()->delete();
        return response('User has been Logged Out', 204);
    }

    public function refreshToken(Request $request)
{
    $refreshToken = $request->input('refresh_token');

    // Attempt to refresh the token
    $newToken = Auth::guard('api')->refresh($refreshToken);

    if (!$newToken) {
        return response()->json(['message' => 'Unable to refresh token'], 401);
    }

    return $this->respondWithToken($newToken);
}
}
