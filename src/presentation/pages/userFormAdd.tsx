import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import useUserAdd from "../hook/useUserAdd";
import { useNavigate } from "react-router-dom";
import { STRING_ROUTE_USERS } from "../utils/const";

const UserFormAdd = () => {
  
  const navigate = useNavigate();
  const { register, setValue, handleSubmit, onSubmit, errors, isCreating } = useUserAdd();
 

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" aria-hidden="true"></div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
            {/* Crois en haut à gauche pour fermer */}
            <button
              onClick={()=>navigate(STRING_ROUTE_USERS)}
              className="absolute text-gray-500 top-2 right-2 hover:text-gray-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h1 className="text-3xl font-bold text-center text-primaryColor">Ajouter un utilisateur</h1>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="z-20 w-2/4 p-6 mx-auto space-y-4 bg-white sm:w-full"
            >
              <div>
                <Label htmlFor="name">Nom de l'utilisateur</Label>
                <Input id="name" type="text" {...register("name")} placeholder="Nom de l'utilisateur" />
                {errors.name?.message && <p className="text-sm text-red-500">{errors.name.message}</p>}
              </div>

              <div>
                <Label htmlFor="email">Email de l'utilisateur</Label>
                <Input id="email" type="email" {...register("email")} placeholder="Email de l'utilisateur" />
                {errors.email?.message && <p className="text-sm text-red-500">{errors.email.message}</p>}
              </div>

              <div>
                <Label htmlFor="phone">Numéro de téléphone</Label>
                <Input id="phone" type="text" {...register("phone")} placeholder="Numéro de téléphone" />
                {errors.phone?.message && <p className="text-sm text-red-500">{errors.phone.message}</p>}
              </div>

              <div>
                <Label htmlFor="password">Mot de passe</Label>
                <Input id="password" type="password" {...register("password")} placeholder="Mot de passe" />
                {errors.password?.message && <p className="text-sm text-red-500">{errors.password.message}</p>}
              </div>

              <div>
                <Label htmlFor="role">Rôle de l'utilisateur</Label>
                <Select
                  onValueChange={(value) => {
                    setValue("role", value, { shouldValidate: true });
                  }}
                  defaultValue=""
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez un rôle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="mentor">Mentor</SelectItem>
                  </SelectContent>
                </Select>
                {errors.role?.message && <p className="text-sm text-red-500">{errors.role.message}</p>}
              </div>

              <Button type="submit" className="w-full" disabled={isCreating}>
                {isCreating ? "En cours d'ajout..." : "Ajouter"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserFormAdd;
