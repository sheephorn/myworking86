<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Carbon\Carbon;

class PointSystemTest extends TestCase
{
    use RefreshDatabase;

    public function test_award_points_calculates_correctly()
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        // 1st play: 100 points score -> 1000 points (100%)
        $response = $this->postJson('/api/points/award', [
            'level_id' => 'test-level',
            'score' => 100,
        ]);

        $response->assertStatus(200)
            ->assertJson([
                'earned_points' => 1000,
                'total_points' => 1000,
                'multiplier' => 1.0,
                'play_count' => 1,
            ]);

        $this->assertDatabaseHas('user_points', [
            'user_id' => $user->id,
            'points' => 1000,
        ]);

        $this->assertDatabaseHas('daily_play_counts', [
            'user_id' => $user->id,
            'level_id' => 'test-level',
            'count' => 1,
        ]);
    }

    public function test_award_points_decay_logic()
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        // 1st play
        $this->postJson('/api/points/award', ['level_id' => 'test-level', 'score' => 100]);

        // 2nd play: 100 score -> 900 points (90%)
        $response = $this->postJson('/api/points/award', ['level_id' => 'test-level', 'score' => 100]);
        $response->assertJson(['earned_points' => 900, 'multiplier' => 0.9, 'play_count' => 2]);

        // 3rd play: 80% -> 800
        $this->postJson('/api/points/award', ['level_id' => 'test-level', 'score' => 100])
            ->assertJson(['earned_points' => 800, 'multiplier' => 0.8]);

        // Fast forward to 8th play (should be 30%)
        // Current count is 3. We need 4 more plays to reach 7. Then 8th.
        for ($i = 4; $i <= 7; $i++) {
             $this->postJson('/api/points/award', ['level_id' => 'test-level', 'score' => 100]);
        }
        // Next is 8th play. (1.0 - 0.7 = 0.3)
        $response = $this->postJson('/api/points/award', ['level_id' => 'test-level', 'score' => 100]);
        $response->assertJson(['earned_points' => 300, 'multiplier' => 0.3, 'play_count' => 8]);

        // 9th play (should still be 30%)
        $response = $this->postJson('/api/points/award', ['level_id' => 'test-level', 'score' => 100]);
        $response->assertJson(['earned_points' => 300, 'multiplier' => 0.3, 'play_count' => 9]);
    }

    public function test_daily_reset_logic()
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        // Play today
        $this->postJson('/api/points/award', ['level_id' => 'test-level', 'score' => 100]); // count 1

        // Move to tomorrow
        Carbon::setTestNow(Carbon::tomorrow());

        // Play tomorrow (should be count 1 again)
        $response = $this->postJson('/api/points/award', ['level_id' => 'test-level', 'score' => 100]);
        $response->assertJson(['earned_points' => 1000, 'multiplier' => 1.0, 'play_count' => 1]);
    }
}
