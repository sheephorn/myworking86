<?php

use App\Models\User;
use App\Models\UserPrize;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Str;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class UserPrizeApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_register_prize()
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        $prizeId = (string) Str::uuid();
        $rarity = 'SSR';

        $response = $this->postJson('/api/user/prizes', [
            'prize_id' => $prizeId,
            'rarity' => $rarity,
        ]);

        $response->assertStatus(201)
            ->assertJson([
                'user_id' => $user->id,
                'prize_id' => $prizeId,
                'rarity' => $rarity,
            ]);

        $this->assertDatabaseHas('user_prizes', [
            'user_id' => $user->id,
            'prize_id' => $prizeId,
            'rarity' => $rarity,
        ]);
    }

    public function test_user_can_get_owned_prizes_with_counts()
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        $prizeId1 = (string) Str::uuid();
        $prizeId2 = (string) Str::uuid();

        // 2 of prize 1
        UserPrize::factory()->create(['user_id' => $user->id, 'prize_id' => $prizeId1, 'rarity' => 'UR']);
        UserPrize::factory()->create(['user_id' => $user->id, 'prize_id' => $prizeId1, 'rarity' => 'UR']);
        // 1 of prize 2
        UserPrize::factory()->create(['user_id' => $user->id, 'prize_id' => $prizeId2, 'rarity' => 'SSR']);

        $response = $this->getJson('/api/user/prizes');

        $response->assertStatus(200)
            ->assertJsonCount(2)
            ->assertJsonFragment([
                'prize_id' => $prizeId1,
                'rarity' => 'UR',
                'count' => 2,
            ])
            ->assertJsonFragment([
                'prize_id' => $prizeId2,
                'rarity' => 'SSR',
                'count' => 1,
            ]);
    }

    public function test_unauthenticated_user_cannot_access_prize_apis()
    {
        $this->postJson('/api/user/prizes', [
            'prize_id' => (string) Str::uuid(),
            'rarity' => 'N',
        ])->assertStatus(401);

        $this->getJson('/api/user/prizes')->assertStatus(401);
    }
}
