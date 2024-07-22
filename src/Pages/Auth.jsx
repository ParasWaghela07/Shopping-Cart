

import { useNavigate } from "react-router-dom";

function Auth() {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col justify-center items-center gap-y-10 min-h-screen w-full bg-gray-900 text-white overflow-x-hidden overflow-y-hidden">
      <p className="text-2xl font-light">
        Already have an account?{" "}
        <span
          onClick={() => navigate('/login')}
          className="font-semibold hover:underline text-gray-500 cursor-pointer underline-offset-4"
        >
          Login
        </span>
      </p>
      
      <div className="flex flex-col justify-center gap-y-2">
        <p className="text-2xl font-normal">Create a new account</p>
        <button
          className="font-semibold bg-black p-2 text-white rounded-lg text-2xl hover:bg-gray-700 transition duration-200"
          onClick={() => navigate('/signup1')}
        >
          SIGN UP
        </button>
      </div>
    </div>
  );
}

export default Auth;
