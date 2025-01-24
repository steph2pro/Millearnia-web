import { useState } from 'react';

function useSearch<T>(items: T[], filterFn: (item: T, searchTerm: string) => boolean) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = items.filter((item) => filterFn(item, searchTerm));

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return {
    searchTerm,
    filteredItems,
    handleSearchChange,
  };
}

export default useSearch;
