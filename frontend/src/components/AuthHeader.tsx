import { Link } from "react-router-dom";

export const AuthHeader = ({ type }: { type: "signup" | "signin" }) => {
  return (
    <>
      <div>
        {type === "signin"
          ? "Dont have an account?"
          : "Already have an account?"}
        <Link
          className="pl-2 underline"
          to={type === "signin" ? "/signup" : "/signin"}
        >
          {type === "signin" ? "Signup" : "Sign in"}
        </Link>
      </div>
    </>
  );
};
