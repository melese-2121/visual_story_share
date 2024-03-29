import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { LiaEyeSlashSolid } from "react-icons/lia";
import { LiaEyeSolid } from "react-icons/lia";
import { useFormik } from "formik";
import { logo } from "../../assets/images";
import { SiGnuprivacyguard } from "react-icons/si";

import { SignupValidationSchema } from "../../schemas/SignupValidationSchema";
import Loading from "../../components/shared/Loading";
import {
  useCreateAccount,
  useSignInAccount,
} from "../../lib/react-query/queriesAndMutations";
import { useUserContext } from "../../context/AuthContext";
import Toast from "../../components/shared/Toast";

const SignupForm = () => {
  const { mutateAsync: createUserAccount, isPending: isCreatingUser } =
    useCreateAccount();
  const { mutateAsync: signInAccount, isPending: isSigningIn } =
    useSignInAccount();
  const { checkAuthenticatedUser, isLoading: isUserLoading } = useUserContext();
  const initialValues = {
    name: "",
    username: "",
    email: "",
    password: "",
  };
  const navigate = useNavigate();

  const inputRef = useRef(null);
  const [isChecked, setIsChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSignupHovered, setIsSignupHovered] = useState(false);
  const [error, setError] = useState(false);

  // Handle State of checkbox
  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  // Handle The Submit of The Form.
  const onSubmit = async (values, { resetForm }) => {
    const newUser = await createUserAccount(values);
    if (!newUser) {
      setError(true);
      return;
    }

    const session = await signInAccount({
      email: values.email,
      password: values.password,
    });

    const isLoggedIn = await checkAuthenticatedUser();
    if (isLoggedIn) {
      resetForm();
      navigate("/");
    } else {
      console.log("Sign up failed. Please try again.");
    }
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues,
    validationSchema: SignupValidationSchema,
    onSubmit,
  });

  return (
    <div className="pt-4">
      <div className="flex-center flex-1 pb-3">
        <img
          src={logo}
          alt=" logo"
          className="w-[34px] h-[34px] mr-2 bg-cover rounded-full"
        />
        <h1 className="text-center text-[20px] text-white font-serif font-bold ">
          Visual Story Share
        </h1>
      </div>
      <h1 className="text-center text-[34px] text-white font-serif font-bold">
        {/* <span className="hidden md:block text-white"> Welcome!</span> */}
        <span className="text-zinc-700">Create Your Account</span>
      </h1>
      <p className="mb-4 mt-2 text-center cursor-context-menu font-serif text-gray-700 hover:text-black">
        To use visual story share first you must create an account!
      </p>
      <div className="flex-center">
        <Form
          onSubmit={formik.handleSubmit}
          className="w-[50%] space-y-7 max-md:space-y-6"
        >
          <Form.Group controlId="name">
            <Form.Control
              type="text"
              ref={inputRef}
              className="input-style shadow-sm"
              placeholder="Your name"
              autoComplete="off"
              {...formik.getFieldProps("name")}
              isInvalid={
                formik.touched.name && !isCreatingUser && formik.errors.name
              }
            />
            <Form.Control.Feedback
              type="invalid"
              className="font-bold text-gray-500"
            >
              {formik.errors.name}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="username">
            <Form.Control
              type="text"
              className="input-style shadow-sm"
              autoComplete="off"
              placeholder="Your username"
              {...formik.getFieldProps("username")}
              isInvalid={formik.touched.username && formik.errors.username}
            />
            <Form.Control.Feedback
              type="invalid"
              className="font-bold text-gray-500"
            >
              {formik.errors.username}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Control
              type="email"
              className="input-style shadow-sm "
              placeholder="Your email"
              autoComplete="off"
              {...formik.getFieldProps("email")}
              isInvalid={formik.touched.email && formik.errors.email}
            />
            <Form.Control.Feedback
              type="invalid"
              className="font-bold text-gray-500"
            >
              {formik.errors.email}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="password flex">
            <div className="flex">
              <Form.Control
                type={showPassword ? "text" : "password"}
                className="input-style shadow-sm"
                placeholder="Your password"
                {...formik.getFieldProps("password")}
                isInvalid={formik.touched.password && formik.errors.password}
              />
              {formik.touched.password &&
              !formik.errors.password &&
              !showPassword ? (
                <LiaEyeSolid
                  onClick={() => {
                    setShowPassword((state) => !state);
                  }}
                  className="relative -ml-8 mt-2 text-[25px] cursor-pointer font-thin hover:text-sky-600 text-sky-400"
                />
              ) : (
                ""
              )}
              {formik.touched.password &&
              !formik.errors.password &&
              showPassword ? (
                <LiaEyeSlashSolid
                  onClick={() => {
                    setShowPassword((state) => !state);
                  }}
                  className="relative -ml-8 mt-2 text-[25px] cursor-pointer font-thin hover:text-sky-600 text-sky-400"
                />
              ) : (
                ""
              )}
            </div>
            {
              <Form.Control.Feedback
                type="invalid"
                className="font-bold text-gray-500"
              >
                {formik.errors.password}
              </Form.Control.Feedback>
            }
          </Form.Group>
          <Form.Check
            type="checkbox"
            id="checkbox-terms"
            className="text-zinc-500 font-light"
            label=" I agree to the terms and privacy policy"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />

          <Button
            onMouseOver={() => {
              setIsSignupHovered((state) => true);
            }}
            onMouseLeave={() => {
              setIsSignupHovered((state) => false);
            }}
            variant="seconday"
            disabled={!isChecked || isCreatingUser}
            className={` flex mx-auto w-full font-bold rounded-full hover:bg-green-400   border-stone-200  hover:text-white `}
            type="submit"
          >
            {isCreatingUser ? (
              <Loading text="Creating" isCreatingUser={isCreatingUser} />
            ) : (
              <>
                <SiGnuprivacyguard
                  className={`text-[18px] ml-3 ${
                    isSignupHovered ? "text-white" : "text-sky-400"
                  }  mt-1`}
                />
                <div className="flex-center flex-1 -ml-6">Sign up</div>
              </>
            )}
          </Button>
          <p className="text-center max-sm:pb-4 pb-1">
            Have an account?{" "}
            <span>
              <Link
                className=" text-[15px] text-sky-400 hover:text-sky-600 font-bold"
                to="/sign-in"
              >
                Sign in
              </Link>
            </span>
          </p>
        </Form>
      </div>
      {error && <Toast message="Account is not created, please try again." />}
    </div>
  );
};

export default SignupForm;
