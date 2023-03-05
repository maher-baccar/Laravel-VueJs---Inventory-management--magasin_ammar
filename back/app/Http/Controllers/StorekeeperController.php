<?php

namespace App\Http\Controllers;

use App\Models\Storekeeper;
use App\Models\User;
use App\Http\Requests\StoreStorekeeperRequest;
use App\Http\Requests\UpdateStorekeeperRequest;
use App\Mail\storekeeper as MailStorekeeper;
use Illuminate\Support\Str;
use App\Traits\Upload;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

class StorekeeperController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response([
            'data' => Storekeeper::all()->load('user'),

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
     * @param  \App\Http\Requests\StoreStorekeeperRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreStorekeeperRequest $request)
    {
       
        $password=Str::random(10);
        $user=User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($password),
            'role_id'=>2,
        ]);
        $storekeeper=Storekeeper::create([
            'adress' => $request->adress,
            'phone' => $request->phone,
            'user_id'=>$user->id,
        ]);
       
        if($storekeeper != null){
            $data=[
                'message'=> "Bienvenu avec nous dans notre societé 
                \n Votre email:$request->email,
                \n Votre mot de passe:$password "
            ];
            Mail::to($user->email)->send(new MailStorekeeper($data,$user));
            return response([
                'data'=> $storekeeper->load('user'),
                'message' =>'creation avec succès'
            ],200);
        }
        return response([
            'message' => "erreur de mise a jour"
        ],403);
        
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Storekeeper  $storekeeper
     * @return \Illuminate\Http\Response
     */
    public function show(Storekeeper $storekeeper)
    {
        return $storekeeper->load('user');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Storekeeper  $storekeeper
     * @return \Illuminate\Http\Response
     */
    public function edit(Storekeeper $storekeeper)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateStorekeeperRequest  $request
     * @param  \App\Models\Storekeeper  $storekeeper
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateStorekeeperRequest $request, Storekeeper $storekeeper)
    {
        $validatedData = $request->validate([
            'email' => ['email','unique:users,email,'.$storekeeper->user->id]
        ]);
        
        $storekeeper->update([
            'adress' => $request->adress,
            'phone' => $request->phone,
        ]);
        $storekeeper->user()->update([
            'email'=>$validatedData['email'],
            'name' => $request->name,

        ]);
        if($storekeeper != null){
            return response([
                'data'=> $storekeeper,
                'message' =>'mise a jour avec succès'
            ],200);
        }
        return response([
            'message' => "erreur de mise a jour"
        ],403);
        
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Storekeeper  $storekeeper
     * @return \Illuminate\Http\Response
     */
    public function destroy(Storekeeper $storekeeper)
    {

        $storekeeper->user()->delete();
        if ($storekeeper!=null){
            return response([
                'data'=>$storekeeper,
                'message'=>'Suppression avec succès'], 200);
             }
        return response([
            'message'=>"erreur de suppression"], 403);
    }
}
