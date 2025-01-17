import React, { useState } from 'react';
import SearchBar from "../SearchBar";

const Header = () => {

   
        const [loading, setLoading] = useState(false);
      
        // Fonction à exécuter lors de la soumission
        const handleSearch = (query: string) => {
          console.log('Requête de recherche :', query);
          setLoading(true);
      
          // Simuler une requête asynchrone (par exemple, une API)
          setTimeout(() => {
            setLoading(false);
            alert(`Résultat pour : ${query}`);
          }, 2000); // Attendre 2 secondes
        };
  return (
    <>
        <header className="flex items-center justify-between mb-8 m-8 ml-10">
        <SearchBar callBack={handleSearch} isLoading={loading} />
          <div className="flex items-center space-x-4">
            <span>🔔</span>
            <img
              src="public/assets/profile.png"
              alt="User"
              className="w-10 h-10 rounded-full"
            />
          </div>
        </header>
    </>
  );
};

export default Header;