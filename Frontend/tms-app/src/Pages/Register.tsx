import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserSchema, userSchema } from "../Schemas/UserSchema";
import { Link } from "react-router-dom";
import { useRegisterUserMutation } from "../redux/api/authApi";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/UserSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export function Register() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<userSchema>({
    mode: "all",
    resolver: zodResolver(UserSchema),
  });

  const [registerUser] = useRegisterUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [apiErrors, setApiErrors] = useState<{ code: string; description: string }[]>([]);

  const onSubmit = async (data: userSchema) => {
    const { confirmPassword, ...userData } = data; // omit confirmPassword
    try {
      const user = await registerUser(userData).unwrap();
      dispatch(setUser({ id: user.Id, username: user.username, email: user.email }));
      console.log("User registered successfully: ", user.role);
      navigate("/layout");
    } catch (err) {
      if (err && typeof err === "object" && "data" in err) {
        console.error("Failed to register user: ", (err as { data: any }).data);
        setApiErrors((err as { data: { code: string; description: string }[] }).data);
      }
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Half: Text */}
      <div className="w-1/2 bg-cover bg-center">
        <div className="flex items-center justify-center h-full bg-black bg-opacity-30">
          <h1 className="text-white text-4xl font-bold">🚀 Task Management System</h1>
        </div>
      </div>

      {/* Right Half: Registration Card */}
      <div className="w-1/2 flex items-center justify-center bg-gray-100">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col p-8 bg-white rounded-lg shadow-lg w-4/5 sm:w-2/3"
        >
          <h2 className="text-center text-2xl sm:text-2xl text-gray mb-4 animate-pulse">
            🎉 Create New Account
          </h2>

          <input
            {...register("username")}
            placeholder="Username"
            className="p-3 border border-gray-300 rounded-lg w-full mt-4 transition-colors duration-200 focus:border-blue-500 focus:outline-gray"
          />
          <span className="text-red-500">{errors.username?.message}</span>

          <input
            {...register("email")}
            placeholder="Email"
            className="p-3 border border-gray-300 rounded-lg w-full mt-4 transition-colors duration-200 focus:border-blue-500 focus:outline-gray"
          />
          <span className="text-red-500">{errors.email?.message}</span>
         
          

          <input
            {...register("password")}
            type="password"
            placeholder="Password"
            className="p-3 border border-gray-300 rounded-lg w-full mt-4 transition-colors duration-200 focus:border-blue-500 focus:outline-gray"
          />
          <span className="text-red-500">{errors.password?.message}</span>

          <input
            {...register("confirmPassword")}
            type="password"
            placeholder="Confirm Password"
            className="p-3 border border-gray-300 rounded-lg w-full mt-4 transition-colors duration-200 focus:border-blue-500 focus:outline-gray"
          />
          <span className="text-red-500">{errors.confirmPassword?.message}</span>

          <button
            type="submit"
            className="mt-5 bg-gray-500 text-white font-bold py-2 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            Sign Up
          </button>

          {apiErrors && apiErrors.length > 0 && (
            <div className="text-red-500 p-2">
              {apiErrors.map((error, index) => (
                <p key={index}>{error.description}</p>
              ))}
            </div>
          )}

          <Link to="/login"
            className="text-gray pt-4 text-center text-decoration-line: underline hover:cursor-pointer transition-colors duration-200 hover:text-gray-300"
          >
            Already a user? Click here to sign in
          </Link>
        </form>
      </div>
    </div>
  );
}
