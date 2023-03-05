<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            // 'image'=>'required|string|regex:/^data:/',
            'name'=>'required|max:255',
            'purchase_price'=>'required|numeric',
            'selling_price'=>'required|numeric',
            'provider_id'=>'required|integer|max:20',
            'category_id'=>'required|integer|max:20'
        ];
    }
}
