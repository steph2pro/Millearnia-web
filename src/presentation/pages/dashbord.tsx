const Dashbord = () => {
    return (
        <>
            <div className="min-h-screen flex items-center justify-center  ml-60">
                <div>
            <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">My Progress</h2>
          <div className="bg-indigo-600 text-white p-6 rounded-lg flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">
                Hi, Alyssa! You have completed 6 lessons this week!
              </h3>
              <button className="mt-4 bg-white text-indigo-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100">
                See All
              </button>
            </div>
            <div className="flex space-x-4">
              <div className="bg-purple-500 w-40 h-20 rounded-lg flex flex-col justify-center items-center">
                <p className="font-bold text-white">Design Composition</p>
                <p className="text-sm">12 lessons | 54%</p>
              </div>
              <div className="bg-yellow-300 w-40 h-20 rounded-lg flex flex-col justify-center items-center">
                <p className="font-bold">UX Design</p>
                <p className="text-sm">17 lessons | 81%</p>
              </div>
              <div className="bg-lime-400 w-40 h-20 rounded-lg flex flex-col justify-center items-center">
                <p className="font-bold">3D Design</p>
                <p className="text-sm">10 lessons | 21%</p>
              </div>
            </div>
          </div>
        </section>

        {/* Statistics */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">Statistics</h2>
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg shadow">
              <p className="text-2xl font-bold">2</p>
              <p className="text-sm text-gray-600">Courses completed</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <p className="text-2xl font-bold">3</p>
              <p className="text-sm text-gray-600">Courses in progress</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <p className="text-2xl font-bold">8.5</p>
              <p className="text-sm text-gray-600">Hours spent this week</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="h-16 bg-indigo-100 rounded-full"></div>
              <p className="text-sm text-gray-600 mt-2">Your progress</p>
            </div>
          </div>
        </section>
                    
                    </div>

            </div>
        </>
    );
}
export default Dashbord;