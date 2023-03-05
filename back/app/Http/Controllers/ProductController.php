<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Http\Requests\StoreProductRequest;
use App\Traits\Upload;
use Illuminate\Support\Str;


use App\Http\Requests\UpdateProductRequest;
use App\Models\Category;
use App\Models\Provider;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $product = Product::all();
        $categories = Category::all();
        $providers = Provider::all();
        return response([
            'products' => $product,
            'categories' => $categories,
            'providers' => $providers,
        ], 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreProductRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreProductRequest $request)
    {
        $product= Product::create([
            'name'=>$request['name'],
            'image' => $request->image ? Upload::saveFile($request['image']) : "http://localhost:8000" . "/storage/85VYujMrMT.png",
            'purchase_price'=>$request['purchase_price'],
            'selling_price'=>$request['selling_price'],
            'quantity'=>$request['quantity'],
            'provider_id'=>$request['provider_id'],
            'category_id'=>$request['category_id'],

        ]);
        if ($product!=null)
        {
            return response([
                'data'=>$product,
                'message'=>'Produit crée avec succès'
            ], 200);
        }
        return response([
            'message'=>'erreur de creation'
        ], 403);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function show(Product $product)
    {
        return response([
            'data'=>$product,
        ], 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function edit(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateProductRequest  $request
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateProductRequest $request, Product $product)
    {
        $product->update([
            'name'=>$request['name'],
            'image' => $request->image && Str::contains($request->image, "http://localhost:8000") ? $request->image : (!$request->image ? "http://localhost:8000" . "/storage/85VYujMrMT.png" : Upload::saveFile($request['image'])),
            'purchase_price'=>$request['purchase_price'],
            'selling_price'=>$request['selling_price'],
            'provider_id'=>$request['provider_id'],
            'category_id'=>$request['category_id'],
        ]);
        if ($product!=null)
        {
            return response([
                'data'=>$product,
                'message'=>'Produit mise a jour  avec succès'
            ], 200);
        }
        return response([
            'message'=>'erreur de mettre a jour'
        ], 403);
    
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function destroy(Product $product)
    {
        $product->delete();
        if ($product!=null)
        {
            return response([
                'message'=>'Produit supprimer avec succès'
            ], 200);
        }
        return response([
            'message'=>'erreur de suppression'
        ], 403);
    }
}

