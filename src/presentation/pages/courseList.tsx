import React, { useEffect } from 'react';
import useCourseGetAll from '../hook/useCourseGetAll';
import { Loader } from '../components/Loader';
import { STRING_ROUTE_COURSE_ADD } from '../utils/const';
import { useNavigate } from 'react-router-dom';
const CourseList = () => {
  const navigate = useNavigate();
  const { CourseQuery } = useCourseGetAll();

  // Vérifier si les données doivent être rafraîchies
  useEffect(() => {
    if (!CourseQuery.isFetching && !CourseQuery.isSuccess) {
      CourseQuery.refetch();
    }
  }, [CourseQuery]);

  // Gestion des états
  if (CourseQuery.isLoading) {
    return <Loader />;
  }

  if (CourseQuery.isError) {
    return (
      <div className="p-6 text-red-500">
        Error: impossible de charger les cours
      </div>
    );
  }

  const courses = CourseQuery.data || [];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Affichage des statistiques */}
      <div className="grid grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h4 className="text-gray-500">Total Courses</h4>
          <h2 className="text-xl font-bold">{courses.length}</h2>
          <p className="text-green-500 text-sm">Data fetched successfully</p>
        </div>
      </div>

      {/* Tableau des cours */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center justify-between mb-4">
          
          
                  <h3 className="mb-4 text-lg font-bold">Course</h3>
                  <button
                    onClick={() => navigate(STRING_ROUTE_COURSE_ADD)}
                    className="flex items-center justify-center bg-blue-500 text-white p-2 rounded-xl hover:bg-blue-600 focus:outline-none"
                  >
                    + Ajouter une vidéo
                  </button>
                  
        </div>
        <table className="table-auto w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Content</th>
              <th className="px-4 py-2">Duration</th>
              <th className="px-4 py-2">Options</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.id} className="border-t">
                <td className="px-4 py-2">{course.id}</td>
                <td className="px-4 py-2">{course.title}</td>
                <td className="px-4 py-2">{course.description}</td>
                <td className="px-4 py-2">{course.contenu}</td>
                <td className="px-4 py-2">{course.duration} hours</td>
                
                <td className="px-4 py-2 flex justify-between items-center">
                    <button
                      onClick={() => navigate(`/courseEdit/${course.id}`)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => navigate(`/courseDelete/${course.id}`)}
                      className="text-blue-500 hover:text-blue-700 ml-2"
                    >
                      Delete
                    </button>
                  </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CourseList;
