import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader } from '../components/Loader';
import useCourseGetAll from '../hook/useCourseGetAll';
import { STRING_ROUTE_COURSE_ADD } from '../utils/const';
import DataTable from "../components/data-table"; 
import { DataTablePagination } from '../components/data-table-pagination2'; 
import Course from '@/data/models/Cours';
import { Button } from '../components/ui/button';
import { Pencil, Trash } from 'lucide-react';
import RetryComponent from '../components/RetryComponent';

const CourseList = () => {
  const navigate = useNavigate();
  const { CourseQuery } = useCourseGetAll();
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  // Vérifier si les données doivent être rafraîchies
  // useEffect(() => {
  //   if (!CourseQuery.isFetching && !CourseQuery.isSuccess) {
  //     CourseQuery.refetch();
  //   }
  // }, [CourseQuery]);

  // Gestion des états
  if (CourseQuery.isLoading) {
    return <Loader />;
  }

   if (CourseQuery.error) {
    return <RetryComponent onRetry={CourseQuery.refetch} />;
  }


  const courses = CourseQuery.data || [];

  // Fonction pour tronquer le texte à 20 caractères
  const truncateText = (text) => {
    return text.length > 20 ? text.slice(0, 20) + '...' : text;
  };

  // Définir les colonnes pour DataTable en utilisant useMemo
  const columns = [
   
    {
      header: 'Title',
      accessorKey: 'title',
    },
    {
      header: 'Description',
      accessorKey: 'description',
      cell: (info) => truncateText(info.getValue()),
    },
    {
      header: 'Content',
      accessorKey: 'contenu',
      cell: (info) => truncateText(info.getValue()),
    },
    {
      header: 'Duration',
      accessorKey: 'duration',
      cell: (info) => `${info.getValue()} hours`,
    },
    {
      header: 'Options',
      accessorKey: 'options',
      cell: (info) => (
        <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      {/* Bouton Modifier */}
                      <Button variant="outline" size="icon"
                          onClick={() => navigate(`/courseEdit/${info.row.original.id}`)} >
                          <Pencil className="w-4 h-4" />
                        </Button>
  
                        {/* Bouton Supprimer */}
                        <Button variant="destructive" size="icon"
                          onClick={() => navigate(`/courseDelete/${info.row.original.id}`)}>
                          <Trash className="w-4 h-4" />
                        </Button>
                      </div>
          
        </div>
      ),
    },
  ];

  // Gestion de la pagination (filtrage de pages)
  const pagedData = courses.slice((page - 1) * perPage, page * perPage);
  

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      {/* Affichage des statistiques */}
      <div className="grid grid-cols-4 gap-6 mb-6">
        <div className="p-4 bg-white rounded-lg shadow">
          <h4 className="text-gray-500">Total Courses</h4>
          <h2 className="text-xl font-bold">{courses.length}</h2>
        </div>
      </div>

      {/* Tableau des cours avec DataTable */}
      <div className="p-4 bg-white rounded-lg shadow">
        <div className="flex items-center justify-between mb-4">
          <h3 className="mb-4 text-lg font-bold">Course</h3>
          
          <Button className="ml-10 bg-primaryColor " onClick={() => navigate(STRING_ROUTE_COURSE_ADD)}>
              Ajouter un cours
            </Button>
          
        </div>

        <DataTable
          columns={columns}
          data={pagedData}
        />

        {/* Pagination */}
        <DataTablePagination
          count={courses.length}
          page={page}
          per_page={perPage}
          onPageChange={setPage}
          onRowsPerPageChange={setPerPage}
        />
      </div>
    </div>
  );
};

export default CourseList;
