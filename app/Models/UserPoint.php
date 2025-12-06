<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserPoint extends Model
{
    protected $primaryKey = 'user_id';
    public $incrementing = false;
    protected $keyType = 'string';
    protected $fillable = ['user_id', 'points'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
