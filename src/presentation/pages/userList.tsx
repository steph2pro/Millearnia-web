import React, { useState } from "react";
import UserProps from "../../data/models/User";
import UserActions from "../components/UserActions";
import useUserGetAll from "../hook/useUserGetAll";
import { Loader } from "../components/Loader";
import { STRING_ROUTE_USER_ADD } from "../utils/const";
import { useNavigate } from 'react-router-dom';
import { format } from "date-fns"; // Import de la fonction format

const UserList = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedRole, setSelectedRole] = useState<string>("View all");

  const { userQuery } = useUserGetAll();
  const { data: users = [], isLoading, isError } = userQuery;

  // Fonction pour filtrer les utilisateurs en fonction du rôle sélectionné
  const filterUsers = () => {
    return users
      .filter((user: UserProps) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .filter((user: UserProps) =>
        selectedRole === "View all" ? true : user.role === selectedRole
      );
  };

  // Fonction pour calculer les statistiques
  const getStatistics = (role: string) => {
    const filteredUsers = users.filter((user: UserProps) => 
      role === "View all" ? true : user.role === role
    );
    return filteredUsers.length;
  };

  const toggleStatus = (userId: number) => {
    // Ajouter une logique API pour changer le statut côté serveur si nécessaire
    console.log(`Toggled status for user ID: ${userId}`);
  };

  const deleteUser = (userId: number) => {
    // Ajouter une logique API pour supprimer un utilisateur côté serveur si nécessaire
    console.log(`Deleted user ID: ${userId}`);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <div>Failed to fetch users. Please try again later.</div>;
  }

  return (
    <div className="p-2">
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between m-5">
          <div className="">
            <h1 className="text-2xl font-bold">Users</h1>
            <p className="text-gray-600">Find all platform users here</p>
          </div>
          <button
            onClick={() => navigate(STRING_ROUTE_USER_ADD)}
            className="flex items-center justify-center bg-blue-500 text-white p-2 rounded-xl hover:bg-blue-600 focus:outline-none"
          >
            + Ajouter un utilisateur
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-500">General users</p>
          <h2 className="text-2xl font-bold">{getStatistics("user")}</h2>
          <p className="text-green-500 text-sm">+215%</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-500">Admins</p>
          <h2 className="text-2xl font-bold">{getStatistics("admin")}</h2>
          <p className="text-red-500 text-sm">-0.34%</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-500">Creators</p>
          <h2 className="text-2xl font-bold">{getStatistics("creator")}</h2>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 flex justify-between items-center">
          <div className="mb-4">
            <button
              className={`font-medium px-3 py-1 ${
                selectedRole === "View all" ? "text-gray-800" : "text-gray-500"
              }`}
              onClick={() => setSelectedRole("View all")}
            >
              View all
            </button>
            <button
              className={`font-medium px-3 py-1 ${
                selectedRole === "user" ? "text-gray-800" : "text-gray-500"
              }`}
              onClick={() => setSelectedRole("user")}
            >
              user
            </button>
            <button
              className={`font-medium px-3 py-1 ${
                selectedRole === "admin" ? "text-gray-800" : "text-gray-500"
              }`}
              onClick={() => setSelectedRole("admin")}
            >
              Admin
            </button>
            <button
              className={`font-medium px-3 py-1 ${
                selectedRole === "creator" ? "text-gray-800" : "text-gray-500"
              }`}
              onClick={() => setSelectedRole("creator")}
            >
              Creator
            </button>
          </div>
          <div>
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border rounded-lg px-3 py-1 text-sm"
            />
          </div>
        </div>

        <table className="table-auto w-full">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Phone</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Created At</th>
              <th className="px-4 py-2">Options</th>
            </tr>
          </thead>
          <tbody>
            {filterUsers().map((user: UserProps, index: number) => (
              <tr key={index} className="border-t">
                <td className="px-4 py-2">
                  <div className="flex items-center">
                    <img
                      src="public/assets/profile.png"
                      alt="User"
                      className="w-10 h-10 rounded-full mr-5"
                    />
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-2">{user.role}</td>
                <td className="px-4 py-2">{user.phone}</td>
                <td className="px-4 py-2">{user.status}</td>
                <td className="px-4 py-2">
                  {/* {user.createdAt} */}

                  {format(new Date(user.createdAt), "dd-MM-yyyy")}
                </td>
                <td className="px-4 py-2 relative">
                  <UserActions
                    user={{ id: user.id, status: user.status }}
                    toggleStatus={toggleStatus}
                    deleteUser={deleteUser}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
