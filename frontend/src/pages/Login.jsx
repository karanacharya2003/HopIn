import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuthContext } from "../context/authContext.jsx";



const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setAuthUser } = useAuthContext();




  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Login details:', { email, password });

    try {

      const res = await axios.post("http://localhost:8000/api/auth/login", {
        email,
        password
      }, {
        withCredentials: true,
      })
      localStorage.setItem("app-user", JSON.stringify(res));
      toast.success("successful");
      setAuthUser(res);

      navigate("/");

    } catch {
      toast.error("something went wrong")
    }

  }

  return (
    <div className="h-[89vh] flex items-center justify-center bg-gray-100 overflow-hidden">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full p-2 border rounded-lg mt-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full p-2 border rounded-lg mt-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          >
            Login
          </button>
        </form>
        <div className="text-center mt-4">
          <p>
            Don&apos;t have an account? <a href="/signup" className="text-blue-500">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
