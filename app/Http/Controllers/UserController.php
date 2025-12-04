<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;

class UserController extends Controller
{
    /**
     * Store a newly created user in storage.
     */
    public function store(StoreUserRequest $request): JsonResponse
    {
        $validated = $request->validated();

        $user = User::create($validated);

        return response()->json([
            'message' => 'ユーザーが正常に登録されました。',
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'grade' => $user->grade,
            ],
        ], 201);
    }
}
