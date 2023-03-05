<?php // Code in app/Traits/MyTrait.php

namespace App\Traits;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
trait Upload
{
    public static function SaveFile($input)
    {
        $image_64 = $input;

        $extension = explode('/', explode(':', substr($image_64, 0, strpos($image_64, ';')))[1])[1];   

        $replace = substr($image_64, 0, strpos($image_64, ',') + 1);

        $image = str_replace($replace, '', $image_64);

        $image = str_replace(' ', '+', $image);

        $imageName = Str::random(10) . '.' . $extension;

        $file=Storage::disk('public')->put($imageName, base64_decode($image));
        

        $url = $file?"http://localhost:8000" . Storage::url($imageName):"http://localhost:8000"."/storage/85VYujMrMT.png";

        return $url;
    }
}