<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('user_points', function (Blueprint $table) {
            $table->uuid('user_id')->primary();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->integer('points')->default(0);
            $table->timestamps();
        });

        Schema::create('daily_play_counts', function (Blueprint $table) {
            $table->id();
            $table->uuid('user_id');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->string('level_id');
            $table->date('play_date');
            $table->integer('count')->default(0);
            $table->timestamps();

            $table->unique(['user_id', 'level_id', 'play_date']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('daily_play_counts');
        Schema::dropIfExists('user_points');
    }
};
