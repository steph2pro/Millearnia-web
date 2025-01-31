import React, { useState } from 'react';
import { Search, Envelope, Bell, QuestionCircle } from "react-bootstrap-icons";

const Header = () => {
    const [loading, setLoading] = useState(false);

    // Fonction à exécuter lors de la soumission
    const handleSearch = (query: string) => {
        console.log('Requête de recherche :', query);
        setLoading(true);

        // Simuler une requête asynchrone (exemple : appel API)
        setTimeout(() => {
            setLoading(false);
            alert(`Résultat pour : ${query}`);
        }, 2000);
    };

    return (
        <div className="w-full bg-white p-4 flex items-center justify-between shadow-sm pl-10 pr-10">
            {/* Search Bar */}
            <div className="flex items-center bg-gray-100 px-4 py-2 rounded-full shadow-md w-1/2">
                <Search className="text-gray-400 text-lg" />
                <input 
                    type="text" 
                    placeholder="Search anything" 
                    className="bg-gray-100 outline-none ml-3 w-full text-gray-600 placeholder-gray-400"
                />
            </div>

            {/* Icons */}
            <div className="flex items-center space-x-6">
                {/* Email */}
                <Envelope className="text-gray-500 text-xl cursor-pointer hover:text-gray-700 transition duration-200" />

                {/* Notifications */}
                <div className="relative">
                    <Bell className="text-gray-500 text-xl cursor-pointer hover:text-gray-700 transition duration-200" />
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-3 h-3 flex items-center justify-center"></span>
                </div>

                {/* Help */}
                <QuestionCircle className="text-gray-500 text-xl cursor-pointer hover:text-gray-700 transition duration-200" />
            </div>
        </div>
    );
};

export default Header;
