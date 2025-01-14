import { InputBox } from "./InputBox";
import { SinginInputs } from "@npmuserhahaha/medium-common";
import { useState } from "react";
import { AuthHeader } from "./AuthHeader";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const SigninComponent = () => {
  const navigate = useNavigate();
  const [postInputs, setpostInputs] = useState<SinginInputs>({
    username: "",
    password: "",
  });

  const SendRequest = async () => {
    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/v1/user/signin`,
        postInputs,
      );
      const jwt = res.data;
      localStorage.setItem("token", jwt);
      navigate("/");
    } catch (e) {
      return Error;
    }
  };

  return (
    <>
      <div className="h-screen flex justify-center flex-col">
        <div className="flex justify-center">
          <div className="px-10 flex  flex-col">
            <div className="text-3xl font-bold">Create an account</div>
            <AuthHeader type="signin" />
            <div className="pt-8 ">
              <InputBox
                label="Username"
                placeholder="Pratham Yadav"
                onChange={(e) => {
                  setpostInputs({
                    ...postInputs,
                    username: e.target.value,
                  });
                }}
              />

              <InputBox
                label="Password"
                placeholder="Pratham Yadav"
                type={"password"}
                onChange={(e) => {
                  setpostInputs({
                    ...postInputs,
                    password: e.target.value,
                  });
                }}
              />
              <button
                onClick={SendRequest}
                type="button"
                className="mt-3 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
              >
                SignIn
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
