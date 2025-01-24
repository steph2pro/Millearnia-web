import React, { useEffect, useState } from "react";

const KeywordInput = ({ register, setValue, errors, initialKeywords = [] }) => {
  const [keywords, setKeywords] = useState([]);
  const [inputValue, setInputValue] = useState("");

  // Initialiser les mots-clés si `initialKeywords` est fourni
  useEffect(() => {
    if (initialKeywords.length > 0) {
      setKeywords(initialKeywords);
      setValue("tabs", initialKeywords); // Mettre à jour les mots-clés dans le formulaire
    }
  }, [initialKeywords, setValue]);

  const handleAddKeyword = () => {
    if (inputValue.trim() && !keywords.includes(inputValue.trim())) {
      const updatedKeywords = [...keywords, inputValue.trim()];
      setKeywords(updatedKeywords);
      setValue("tabs", updatedKeywords); // Enregistrer les mots-clés dans le formulaire
      setInputValue(""); // Réinitialiser le champ
    }
  };

  const handleRemoveKeyword = (keyword) => {
    const updatedKeywords = keywords.filter((k) => k !== keyword);
    setKeywords(updatedKeywords);
    setValue("tabs", updatedKeywords); // Mettre à jour les mots-clés dans le formulaire
  };

  return (
    <div className="mb-4">
      <label htmlFor="tabs" className="block text-sm font-medium text-gray-700">
        Mots-clés pour cette Profession
      </label>
      <div className="flex items-center gap-2">
        <input
          type="text"
          id="tabs"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ajouter un mot-clé"
          className={`mt-1 block w-full px-3 py-2 border ${
            errors.keywords ? "border-red-500" : "border-gray-300"
          } rounded-md shadow-sm focus:outline-none`}
        />
        <button
          type="button"
          onClick={handleAddKeyword}
          className="px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Ajouter
        </button>
      </div>
      {errors.keywords?.message && (
        <p className="text-red-500 text-sm">{String(errors.keywords.message)}</p>
      )}

      {keywords.length > 0 && (
        <ul className="mt-2 flex flex-wrap gap-2">
          {keywords.map((keyword, index) => (
            <li
              key={index}
              className="bg-gray-200 text-gray-800 px-3 py-1 rounded-md flex items-center gap-2"
            >
              {keyword}
              <button
                type="button"
                onClick={() => handleRemoveKeyword(keyword)}
                className="text-red-500 hover:text-red-700"
              >
                &times;
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default KeywordInput;
