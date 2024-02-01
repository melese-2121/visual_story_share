import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import { useFormik } from "formik";
import { BiLogInCircle } from "react-icons/bi";

import { logo } from "../../assets/images";
import { signInAccount } from "../../lib/apiFunctions";
import { useUserContext } from "../../context/AuthContext";
import Toast from "../../components/shared/Toast";

const SigninForm = () => {
  const { checkAuthenticatedUser, isLoading } = useUserContext();
  const initialValues = {
    email: "",
    password: "",
  };
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isSigninHovered, setIsSigninHovered] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const onSubmit = async (values, { resetForm }) => {
    setShowToast(false);
    const session = await signInAccount({
      email: values.email,
      password: values.password,
    });
    if (!session) {
      setShowToast(true);
      return;
    } else {
      const isLoggedIn = await checkAuthenticatedUser();
      if (isLoggedIn) {
        resetForm();
        navigate("/");
      } else {
        setShowToast(true);
      }
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
  });

  return (
    <div className="max-md:mt-14 md:mt-20">
      <div className="flex-center">
        {" "}
        <img
          src={logo}
          alt=" logo"
          className="w-[34px] h-[34px] mb-4 mr-2 bg-cover rounded-full"
        />{" "}
        <h1 className="text-center text-[20px] text-white font-serif font-bold mb-4">
          Visual Story Share
        </h1>
      </div>
      <h1 className="text-center text-[34px] text-gray-700 font-serif font-bold mb-10">
        <span className="hidden md:block text-white"> Welcome!</span>
        <span className="">Log in </span> to Your Account
      </h1>
      <div className="flex-center">
        <Form onSubmit={formik.handleSubmit} className="w-[50%] space-y-8">
          <Form.Group controlId="email">
            <Form.Control
              type="email"
              ref={inputRef}
              className="input-style shadow-sm"
              placeholder="Your email"
              autoComplete="off"
              {...formik.getFieldProps("email")}
            />
          </Form.Group>

          <Form.Group controlId="password flex">
            <div className="flex">
              <Form.Control
                type={showPassword ? "text" : "password"}
                className="input-style shadow-sm"
                placeholder="Your password"
                autoComplete="off"
                {...formik.getFieldProps("password")}
              />
              {formik.touched.password && !showPassword ? (
                <IoEyeOutline
                  onClick={() => {
                    setShowPassword((state) => !state);
                  }}
                  className="relative -ml-8 mt-2 text-[25px] cursor-pointer font-thin hover:text-sky-600 text-sky-400"
                />
              ) : (
                ""
              )}
              {formik.touched.password && showPassword ? (
                <IoEyeOffOutline
                  onClick={() => {
                    setShowPassword((state) => !state);
                  }}
                  className="relative -ml-8 mt-2 text-[25px] cursor-pointer font-thin hover:text-sky-600 text-sky-400"
                />
              ) : (
                ""
              )}
            </div>
          </Form.Group>

          <Button
            onMouseOver={() => {
              setIsSigninHovered((state) => true);
            }}
            onMouseLeave={() => {
              setIsSigninHovered((state) => false);
            }}
            variant="seconday"
            className="flex-center mx-auto w-full font-bold rounded-full hover:bg-green-400  border-stone-300  hover:text-white"
            type="submit"
          >
            <BiLogInCircle
              className={`text-[22px] ml-3 ${
                isSigninHovered ? "text-white" : "text-sky-400"
              }  mt-1 max-sm:hidden`}
            />
            <div className=" text-[16px] font-bold flex-center flex-1 -ml-16 mx-sm:-ml-5 ">
              Sign in
            </div>
          </Button>
          <p className="text-center max-sm:text-sm ">
            Didn't Have an Account?{" "}
            <span>
              <Link
                className=" text-sky-400 hover:text-sky-600 font-bold"
                to="/sign-up"
              >
                Sign up
              </Link>
            </span>
          </p>
          <div className="relative">
            {showToast && <Toast message="Sign in Failed, Please try again!" />}
          </div>
        </Form>
      </div>
    </div>
  );
};

export default SigninForm;
