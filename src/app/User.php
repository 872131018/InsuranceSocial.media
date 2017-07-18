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
        'name', 'email', 'password', 'api_token'
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
     * Get the plan record associated with the user.
     */
    public function plan()
    {
        return $this->hasOne('App\UserPlan');
    }

    /**
     * Get the facebook record associated with the user.
     */
    public function facebook()
    {
        return $this->hasOne('App\FacebookAccount');
    }

    /**
     * Get the twitter record associated with the user.
     */
    public function twitter()
    {
        return $this->hasOne('App\TwitterAccount');
    }

    /**
     * Get the agency record associated with the user.
     */
    public function agency()
    {
        return $this->hasOne('App\Agency');
    }

    /**
     * Get the regions record associated with the user.
     */
    public function regions()
    {
        return $this->hasMany('App\SelectedRegion');
    }

    /**
     * Get the states record associated with the user.
     */
    public function states()
    {
        return $this->hasMany('App\SelectedState');
    }

    /**
     * Get the counties record associated with the user.
     */
    public function counties()
    {
        return $this->hasMany('App\SelectedCounty');
    }
}
