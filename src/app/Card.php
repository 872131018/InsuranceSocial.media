<?php
namespace App;

use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\SoftDeletes;

class Card extends Model
{
    use SoftDeletes;
    /**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */
    protected $dates = ['deleted_at'];

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'cards';

    /**
     * Get the user that owns the Card.
     */
    public function user()
    {
        return $this->belongsTo('App\User');
    }
}
