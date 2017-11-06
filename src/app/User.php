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
        'name', 'email', 'password', 'api_token', 'code', 'password_clean'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        //'password', 'remember_token',
    ];

    /**
     * The attributes that should be loaded with user
     *
     * @var array
     */
    protected $with = [
        'plan',
        'facebook',
        'twitter',
        'template',
        'twitter',
        'agency',
        'regions',
        'states',
        'counties',
        'carriers',
        'commercialCoverages',
        'cropCoverages',
        'personalCoverages',
        'benefitCoverages',
        'currentIndustries',
        'targetIndustries',
        'specialTopics',
        'causes',
        'payments'
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
     * Get the template record associated with the user.
     */
    public function template()
    {
        return $this->hasOne('App\FacebookTemplate');
    }

    /**
     * Get the twitter record associated with the user.
     */
    public function twitter()
    {
        return $this->hasOne('App\TwitterAccount');
    }

    /**
     * Get the linkedin record associated with the user.
     */
    public function linkedin()
    {
        return $this->hasOne('App\LinkedInAccount');
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

    /**
     * Get the carriers record associated with the user.
     */
    public function carriers()
    {
        return $this->hasMany('App\SelectedCarrier');
    }

    /**
     * Get the commercial coverages record associated with the user.
     */
    public function commercialCoverages()
    {
        return $this->hasMany('App\SelectedCommercialCoverage');
    }

    /**
     * Get the crop coverages record associated with the user.
     */
    public function cropCoverages()
    {
        return $this->hasMany('App\SelectedCropCoverage');
    }

    /**
     * Get the personal coverages record associated with the user.
     */
    public function personalCoverages()
    {
        return $this->hasMany('App\SelectedPersonalCoverage');
    }

    /**
     * Get the benefit coverages record associated with the user.
     */
    public function benefitCoverages()
    {
        return $this->hasMany('App\SelectedBenefitCoverage');
    }

    /**
     * Get the current industries record associated with the user.
     */
    public function currentIndustries()
    {
        return $this->hasMany('App\SelectedCurrentIndustry');
    }

    /**
     * Get the target industries record associated with the user.
     */
    public function targetIndustries()
    {
        return $this->hasMany('App\SelectedTargetIndustry');
    }

    /**
     * Get the special topic record associated with the user.
     */
    public function specialTopics()
    {
        return $this->hasMany('App\SelectedSpecialTopic');
    }

    /**
     * Get the causes record associated with the user.
     */
    public function causes()
    {
        return $this->hasMany('App\SelectedCause');
    }

    /**
     * Get the causes record associated with the user.
     */
    public function payments()
    {
        return $this->hasMany('App\Payment');
    }

    /**
     * Get the causes record associated with the user.
     */
    public function cards()
    {
        return $this->hasMany('App\Card');
    }

    /**
     * Get the causes record associated with the user.
     */
    public function facebookPerformance()
    {
        return $this->hasMany('App\FacebookPerformance');
    }

    /**
     * Get the causes record associated with the user.
     */
    public function facebookInteraction()
    {
        return $this->hasMany('App\FacebookInteraction');
    }

    /**
     * Get the causes record associated with the user.
     */
    public function twitterPerformance()
    {
        return $this->hasMany('App\TwitterPerformance');
    }

    /**
     * Get the causes record associated with the user.
     */
    public function twitterInteraction()
    {
        return $this->hasMany('App\TwitterInteraction');
    }
}
