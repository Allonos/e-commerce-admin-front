import { useState } from "react";
import AuthLayout from "../components/ui/layout/AuthLayout";
import { Link, Navigate } from "react-router";
import { useSignupServiceMutation } from "../services/react-query/signup/mutation/useSignupServiceMutation";

const SignupPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");

  const { mutate: signupMutate } = useSignupServiceMutation();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signupMutate({ username, email, password }, {
      onSuccess: () => <Navigate to="/" />,
    });
  };

  return (
    <AuthLayout>
      <h1 className="text-2xl font-semibold text-center">Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div className="py-2">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            Username
          </label>
          <input
            type="text"
            placeholder="Enter username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 px-2 py-1 block w-full rounded-md border border-gray-300 focus:border-indigo-500  transition-all duration-300 sm:text-sm"
          />
        </div>
        <div className="py-2">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            placeholder="Enter email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 px-2 py-1 block w-full rounded-md border border-gray-300 focus:border-indigo-500  transition-all duration-300 sm:text-sm"
          />
        </div>
        <div className="py-2">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            placeholder="Enter password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 px-2 py-1 block w-full rounded-md border border-gray-300 focus:border-indigo-500  transition-all duration-300 sm:text-sm"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-md mt-4 hover:bg-indigo-700 transition-all duration-300 cursor-pointer"
        >
          Sign Up
        </button>
      </form>
      <div className="py-2">
        <p className="text-[14px] text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default SignupPage;
