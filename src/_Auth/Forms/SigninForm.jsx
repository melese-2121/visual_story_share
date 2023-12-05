import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import { useFormik } from "formik";
import { BiLogInCircle } from "react-icons/bi";

import { logo } from "../../assets/images";

const SigninForm = () => {
  const initialValues = {
    email: "",
    password: "",
  };

  const inputRef = useRef(null);

  const [showPassword, setShowPassword] = useState(false);
  const [isSigninHovered, setIsSigninHovered] = useState(false);

  useEffect(() => {
    inputRef.current.focus();
  }, []);
  const onSubmit = (values) => {
    // Handle form submission here
    console.log("Form data:", values);
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
  });

  return (
    <div className="md:mt-20" >
      <div className="flex-center">
        {" "}
        <img
          src={logo}
          alt=" logo"
          className="w-[34px] h-[34px] mb-4 mr-2 bg-cover rounded-full"
        />{" "}
        <h1 className="text-center text-[20px] text-black font-serif font-bold mb-4">
          Visual Story Share
        </h1>
      </div>
      <h1 className="text-center text-[34px] text-black font-serif font-bold mb-10">
        Welcome! <span className="text-gray-950">Log in </span> to Your Account
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
              }  mt-1`}
            />
            <div className=" text-[15px] flex-center flex-1 -ml-16 mx-sm:-ml-5 ">
              Sign in
            </div>
          </Button>
          <p className="text-center ">
            Didn't Create an Account?{" "}
            <span>
              <Link
                className=" text-sky-400 hover:text-sky-600 font-bold"
                to="/sign-up"
              >
                Sign up
              </Link>
            </span>
          </p>
        </Form>
      </div>
    </div>
  );
};

export default SigninForm;
