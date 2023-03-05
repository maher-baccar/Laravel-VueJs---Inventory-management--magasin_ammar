<?php

namespace App\Http\Controllers;

use App\Models\Provider;
use App\Http\Requests\StoreProviderRequest;
use App\Http\Requests\UpdateProviderRequest;

class ProviderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response([
            'data' => Provider::all(),
        ],200);

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
     * @param  \App\Http\Requests\StoreProviderRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreProviderRequest $request)
    {
        $provider = Provider::create([
            'name'=>$request['name'],
            'adress'=>$request['adress'],
            'phone'=>$request['phone'],
            'email'=>$request['email']
        ]);

        if($provider!=null)
        {
            return response([
                'data'=>$provider,
                'message'=>'Fournisseur crée avec succès'
            ],200);
        }
        return response([
            'message'=>"erreur de creation"
        ],403);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Provider  $provider
     * @return \Illuminate\Http\Response
     */
    public function show(Provider $provider)
    {
        return response([
            'data'=>$provider,
        ],200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Provider  $provider
     * @return \Illuminate\Http\Response
     */
    public function edit(Provider $provider)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateProviderRequest  $request
     * @param  \App\Models\Provider  $provider
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateProviderRequest $request, Provider $provider)
    {
        $provider->update([
            'name'=>$request['name'],
            'adress'=>$request['adress'],
            'phone'=>$request['phone'],
            'email'=>$request['email']
        ]);
        if ($provider != null)
        {
            return response([
                'data'=>$provider,
                'message'=>'Fournisseur mise a jour succès'
            ],200);
        }
        return response([
            'message'=>'erreur de mise a jour'
        ],200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Provider  $provider
     * @return \Illuminate\Http\Response
     */
    public function destroy(Provider $provider)
    {
        $provider->delete();
        if ($provider!=null)
        {return response([
            'message'=>'Fournisseur supprimer aves succès'
        ],200);
        }
        return response([
            'message'=>"erreur de suppression"
        ],403);
        
    }
}
