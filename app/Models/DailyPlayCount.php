<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DailyPlayCount extends Model
{
    protected $fillable = ['user_id', 'level_id', 'play_date', 'count'];

    protected $casts = [
        'play_date' => 'date',
        'count' => 'integer',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
