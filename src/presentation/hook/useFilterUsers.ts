import { useState, useMemo } from 'react';
import UserPorps from '../../data/models/User';

const useFilteredUsers = (users: UserPorps[]) => {
  const [selectedRole, setSelectedRole] = useState('View all'); // État pour le rôle sélectionné
  const [searchQuery, setSearchQuery] = useState(''); // État pour la recherche

  // Filtrer les utilisateurs en fonction du rôle et du texte de recherche
  const filteredUsers = useMemo(() => {
    return users.filter((user: UserPorps) => {
      // Vérifie si le rôle correspond
      const roleMatches =
        selectedRole === 'View all' || user.role === selectedRole;

      // Vérifie si le nom ou le pseudo correspond à la recherche
      const searchMatches =
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase());

      return roleMatches && searchMatches;
    });
  }, [users, selectedRole, searchQuery]);

  return { filteredUsers, selectedRole, setSelectedRole, searchQuery, setSearchQuery };
};

export default useFilteredUsers;
