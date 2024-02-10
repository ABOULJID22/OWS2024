<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    public static $wrap = false;

    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $data = [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'created_at' => $this->created_at,
        ];

        // Vérifier et ajouter les champs facultatifs
        if (!is_null($this->role)) {
            $data['role'] = $this->role;
        }

        if (!is_null($this->telephone)) {
            $data['telephone'] = $this->telephone;
        }

        if (!is_null($this->sexe)) {
            $data['sexe'] = $this->sexe;
        }

        if (!is_null($this->nationalite)) {
            $data['nationalite'] = $this->nationalite;
        }

        if (!is_null($this->photo)) {
            $data['photo'] = $this->photo;
            /*   $data['photo'] = asset('storage/uploads/' . $this->photo); */
        }


        if (!is_null($this->adresse)) {
            $data['adresse'] = $this->adresse;
        }

        if (!is_null($this->ville)) {
            $data['ville'] = $this->ville;
        }

        return $data;
    }
}
