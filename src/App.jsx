import "./styles/global.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./config/firebase";
import { useState } from "react";
import { AiOutlineLoading3Quarters as Loading } from "react-icons/ai";

export const createUserSchema = z.object({
  email: z
    .string()
    .nonempty("Cannot be blank")
    .email("Wrong format")
    .transform((email) => {
      return email.toLocaleLowerCase();
    }),
  password: z.string().min(6, "Password must have at least 6 characteres"),
});

export default function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createUserSchema),
  });

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (values) => {
    setLoading(true);
    await signInWithEmailAndPassword(auth, values.email, values.password).then(
      (userCredential) => {
        const user = userCredential;
        navigate("/welcome");
        setLoading(false);
      }
    );
  };

  return (
    <main className="h-screen bg-slate-800 flex justify-center items-center flex-col">
      <h1 className="h-10 text-3xl text-slate-200 mb-10">Login</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col min-w-1/6 gap-2 flex flex-col "
      >
        <label htmlFor="" className="text-slate-300 font-semibold ">
          Email
        </label>
        <input
          type="text"
          {...register("email")}
          className="bg-slate-900 rounded h-10 text-slate-400 pl-2"
        />
        {errors.email && (
          <p className="text-xs text-red-500">{errors.email.message}</p>
        )}
        <label htmlFor="" className="text-slate-300 font-semibold">
          Password
        </label>
        <input
          type="password"
          className="bg-slate-900 rounded h-10 text-slate-400 pl-2"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-xs text-red-500">{errors.password.message}</p>
        )}

        <button
          className={
            loading
              ? "h-10 bg-emerald-600 rounded font-semibold text-slate-300 animate-pulse flex justify-center items-center"
              : "h-10 bg-emerald-600 rounded font-semibold text-slate-300 flex justify-center items-center"
          }
          type="submit"
        >
          {!loading ? "Login" : <Loading className="animate-spin slate-50" />}
        </button>
      </form>
      <p className="text-slate-300 mt-5">
        Don't have an account yet?{" "}
        <Link to="/register" className="ml-2 text-cyan-600">
          Sign Up
        </Link>
      </p>
    </main>
  );
}
