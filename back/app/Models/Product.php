<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $guarded = [];  


    public function categories()
    {
        return $this->belongsTo(Category::class);
    }
    public function providers()
    {
        return $this->belongsTo(Provider::class);
    }
}
