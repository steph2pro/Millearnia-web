import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const UserActions: React.FC<{ user: { id: number; status?: string }; toggleStatus: Function; deleteUser: Function }> = ({ user, toggleStatus, deleteUser }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };
  const navigate = useNavigate();

  return (
    <div className="inline-block text-left relative">
      {/* Bouton Plus/Moins */}
      <button
        onClick={toggleMenu}
        className="text-gray-600 px-4 py-2 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {isMenuOpen ? "Moins" : "Plus"}
      </button>

      {/* Menu déroulant */}
      {isMenuOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-10">
          <div className="py-1">
            <button
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => {
                toggleStatus(user.id);
                setIsMenuOpen(false); // Ferme le menu après l'action
              }}
            >
              {user.status === "Active" ? "Désactiver" : "Activer"}
            </button>
            <button
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => {
                navigate(`/userEdit/${user.id}`);
                setIsMenuOpen(false); // Ferme le menu après l'action
              }}
            >
              Modifier
            </button>
            <button
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => {
                navigate(`/userDelete/${user.id}`);
                setIsMenuOpen(false); // Ferme le menu après l'action
              }}
            >
              Supprimer
            </button>
            <button
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => {
                alert("Contacter l'utilisateur !");
                setIsMenuOpen(false); // Ferme le menu après l'action
              }}
            >
              Contacter
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserActions;
