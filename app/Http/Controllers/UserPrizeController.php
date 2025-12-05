<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\UserPrize;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class UserPrizeController extends Controller
{
    /**
     * Register an obtained prize.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'prize_id' => 'required|uuid',
            'rarity' => 'required|string',
        ]);

        $userPrize = UserPrize::create([
            'user_id' => Auth::id(),
            'prize_id' => $validated['prize_id'],
            'rarity' => $validated['rarity'],
            'obtained_at' => now(),
        ]);

        return response()->json($userPrize, 201);
    }

    /**
     * Get list of owned prizes with counts.
     */
    public function index()
    {
        $userPrizes = UserPrize::where('user_id', Auth::id())
            ->select('prize_id', 'rarity', DB::raw('count(*) as count'))
            ->groupBy('prize_id', 'rarity')
            ->get();

        return response()->json($userPrizes);
    }
}
