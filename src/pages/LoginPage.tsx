import React, { useState } from "react";
import AuthLayout from "../components/ui/layout/AuthLayout";
import { Link, Navigate } from "react-router";
import { useLoginServiceMutation } from "../services/react-query/login/mutation/useLoginServiceMutation";

const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { mutate: loginMutate } = useLoginServiceMutation();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginMutate({ email, password }, { onSuccess: () => <Navigate to="/" /> });
  };

  return (
    <AuthLayout>
      <h1 className="text-2xl font-semibold text-center">Login</h1>
      <form onSubmit={handleSubmit}>
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
          Login
        </button>
      </form>
      <div className="py-2">
        <p className="text-[14px] text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="text-indigo-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;
