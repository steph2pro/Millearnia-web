import { PersonFill, CheckCircleFill, ClockFill } from "react-bootstrap-icons";

const CircularProgressbar = ({ value, text, color }) => {
  const circleRadius = 50;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * circleRadius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <svg width={120} height={120} viewBox="0 0 120 120" className="mx-auto">
      <circle
        cx="60"
        cy="60"
        r={circleRadius}
        stroke="#e5e7eb"
        strokeWidth={strokeWidth}
        fill="none"
      />
      <circle
        cx="60"
        cy="60"
        r={circleRadius}
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
      />
      <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" className="text-xl font-bold" fill={color}>
        {text}
      </text>
    </svg>
  );
};

const StatisticsCard = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-80">
      <h2 className="text-xl font-semibold">Statistics</h2>
      <p className="text-gray-500 text-sm">January - June 2021</p>
      
      <div className="flex items-center space-x-4 my-4">
        <div className="flex items-center space-x-2">
          <PersonFill className="text-blue-500 text-xl" />
          <div>
            <p className="text-blue-500">Absence</p>
            <p className="font-bold">90%</p>
          </div>
        </div>
      </div>
      
      <div className="flex items-center space-x-4 my-2">
        <div className="flex items-center space-x-2">
          <CheckCircleFill className="text-green-500 text-xl" />
          <div>
            <p className="text-green-500">Tasks & Exam</p>
            <p className="font-bold">70%</p>
          </div>
        </div>
      </div>
      
      <div className="flex items-center space-x-4 my-2">
        <div className="flex items-center space-x-2">
          <ClockFill className="text-yellow-500 text-xl" />
          <div>
            <p className="text-yellow-500">Quiz</p>
            <p className="font-bold">85%</p>
          </div>
        </div>
      </div>
      
      <div className="w-32 mx-auto mt-6">
        <CircularProgressbar value={75} text={`75%`} color="#22c55e" />
        <p className="text-center text-gray-500 mt-2">Grades Completed</p>
      </div>
    </div>
  );
};

export default StatisticsCard;
