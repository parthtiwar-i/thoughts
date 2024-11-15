import { Link, useNavigate } from "react-router-dom";
import Quote from "./quote";
import Inputs from "../helper/Inputs";
import { useEffect, useState } from "react";
import { SignUpInput } from "@parthtiwar_i/thoughts-common";
import axios from "axios";
import { BACKEND_URL } from "../config";
import showAlert from "../helper/Alert";
import { useAuth } from "../context";
const LoginForm = ({ type }: { type: "signup" | "signin" }) => {
  const [userInputs, setUserInputs] = useState<SignUpInput>({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { login, jwt } = useAuth();
  async function authenticateUser() {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/user/${type === "signin" ? "login" : "signup"}`,
        userInputs
      );
      if (response.data.error) {
        throw Error(response.data.error);
      }
      const jwt = response.data;
      login(jwt.token);
      const message: string =
        type == "signin"
          ? "Logged In successfully"
          : "Account created successfully";
      showAlert(message, "success");
      navigate("/blogs");
    } catch (error) {
      let errorMessage = "An unknown error occurred";
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === "string") {
        errorMessage = error;
      }
      showAlert(errorMessage, "error");
    }
  }

  useEffect(() => {
    if (jwt) {
      navigate("/");
    }
  }, [jwt]);

  return (
    <div className="md:flex h-screen w-full box-border">
      <div className="bg-orange-100 flex items-center justify-center h-screen w-screen md:w-1/2 box-border ">
        <div className="flex justify-center items-center flex-col w-full ">
          <h1 className="text-3xl text-orange-800 font-semibold font-serif ">
            {type === "signup" ? "Create an account" : "Login"}
          </h1>
          <p className="text-gray-500">
            {type === "signin"
              ? "Don't have an account"
              : "Already have an account"}
            <Link
              className="underline"
              to={type === "signup" ? "/login" : "/signup"}
            >
              {type === "signup" ? " Login" : " Signup"}
            </Link>
          </p>
          <div className="w-full md:w-1/2 flex flex-col justify-center rounded-md p-10">
            {type === "signup" && (
              <Inputs
                label="Username"
                placeholder="Enter user name"
                onchange={(e) => {
                  setUserInputs((c) => ({
                    ...c,
                    name: e.target.value,
                  }));
                }}
              />
            )}
            <Inputs
              type="email"
              label="Email"
              placeholder="Enter user email"
              onchange={(e) => {
                setUserInputs((c) => ({
                  ...c,
                  email: e.target.value,
                }));
              }}
            />
            <Inputs
              type="password"
              label="Password"
              placeholder="Enter password"
              onchange={(e) => {
                setUserInputs((c) => ({
                  ...c,
                  password: e.target.value,
                }));
              }}
            />
            <button
              onClick={authenticateUser}
              type="button"
              className=" mt-5 w-full text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            >
              {type === "signin" ? "Login" : "SignUp"}
            </button>
          </div>
        </div>
      </div>
      <div className="hidden bg-orange-200 md:flex items-center justify-center box-border w-1/2">
        <Quote />
      </div>
    </div>
  );
};

export default LoginForm;
