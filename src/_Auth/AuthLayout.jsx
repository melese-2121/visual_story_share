import { Outlet, useNavigate } from "react-router-dom";
import { people } from "../assets/images";
import { useUserContext } from "../context/AuthContext";
const AuthLayout = () => {
  const { isAuthenticated, user } = useUserContext();
  const navigate = useNavigate();
  return (
    <div>
      {!isAuthenticated ? (
        <div className="flex flex-1">
          <section className="lg:w-1/2 max-lg:px-14 mx-md:px-8 max-sm:px-2 w-full h-screen bg-gradient-to-tl  from-rose-100 to-rose-500">
            <Outlet />
          </section>
          <img
            src={people}
            alt="people logo"
            className="w-1/2 object-cover h-screen hidden lg:block flex-1 "
          />
        </div>
      ) : (
        navigate("/")
      )}
    </div>
  );
};

export default AuthLayout;
