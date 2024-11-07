import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from '../redux/api/authApi';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../redux/slices/AuthSlice';
import { setUser } from '../redux/slices/UserSlice';
import { LoginSchema, loginSchema } from "../Schemas/UserSchema";
import { useState } from "react";
import { useAppSelector } from "../redux/hooks";

export function Login() {
  const { register, formState: { errors }, handleSubmit } = useForm<loginSchema>({
    mode: "all",
    resolver: zodResolver(LoginSchema)
  });

  const [loginUser] = useLoginUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const onSubmit = async (data: loginSchema) => {
    try {
      const response = await loginUser(data).unwrap();
      dispatch(setCredentials({ user: response.username, token: response.token, role: response.role }));
      dispatch(setUser({ id: response.id, username: response.username, email: response.email }));
      navigate('/layout');
    } catch (err) {
      if (err && typeof err === 'object' && 'data' in err) {
        setError(err.data as string);
      }
    }
  };

  const user = useAppSelector((state) => state.auth.user);

  return (
    <div className="flex min-h-screen">
      {/* Left Half: Text */}
      <div className="w-1/2 bg-cover bg-center">
        <div className="flex items-center justify-center h-full bg-black bg-opacity-30">
          <h1 className="text-white text-4xl font-bold">🚀 Task Management System</h1>
        </div>
      </div>

      {/* Right Half: Login Card */}
      <div className="w-1/2 flex items-center justify-center bg-gray-100">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col p-8 bg-white rounded-lg shadow-lg w-4/5 sm:w-2/3">
          <h1 className="text-2xl font-bold text-center text-gray-700 mb-6">Sign In</h1>

          <div className="mb-4">
            <input
              {...register('username')}
              placeholder="Username"
              className={`p-3 border rounded-lg w-full transition duration-200 ${errors.username ? 'border-red-500' : 'border-gray-300'}`}
            />
            <span className="text-red-500">{errors.username?.message}</span>
          </div>

          <div className="mb-4">
            <input
              {...register('password')}
              type="password"
              placeholder="Password"
              className={`p-3 border rounded-lg w-full transition duration-200 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
            />
            <span className="text-red-500">{errors.password?.message}</span>
          </div>

          <span className="text-red-500 mb-4">{error}</span>

          <button
            type="submit"
            className="w-full bg-gray-500 text-white font-bold py-2 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            Login
          </button>

          <Link to='/'
            className="block text-center text-gray-600 mt-4 hover:underline transition duration-200">
            Sign Up! Click Here To Register New Account
          </Link>
        </form>
      </div>
    </div>
  );
}
