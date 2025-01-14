import { Quote } from "../components/Quote";
import { SignupComponent } from "../components/SignupComponent";

export const Signup = () => {
  return (
    <>
      <div className="grid grid-cols-2">
        <div>
          <SignupComponent type="signup" />
        </div>
        <div className="invisible lg:visible">
          <Quote />
        </div>
      </div>
    </>
  );
};
