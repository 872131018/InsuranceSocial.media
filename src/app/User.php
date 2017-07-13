<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

use Illuminate\Database\Eloquent\SoftDeletes;

class User extends Authenticatable
{
    use Notifiable, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 'api_token', 'discount'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * Get the fbAccount record associated with the user.
     */
    public function plan()
    {
        return $this->hasOne('App\UserPlan', 'email');
    }

    /**
     * Get the fbAccount record associated with the user.
     */
    public function fb()
    {
        return $this->hasOne('App\FbAccount', 'email');
    }
}
