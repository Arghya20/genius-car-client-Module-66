import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import img from "../../assets/images/login/login.svg";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";

const Login = () => {
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handelLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    loginUser(email, password)
      .then((result) => {
        const user = result.user;

        const currentUser = {
          email: user.email,
        };
        console.log(currentUser);

        //Get jwt Token
        fetch("http://localhost:5000/jwt", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(currentUser),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            //Local Storage is the easiest but not the best place to store .
            localStorage.setItem("genius-token", data.token);
            navigate(from, { replace: true });
          });
      })
      .catch((error) => console.log(error.message));
  };
  return (
    <div className="hero min-h-screen bg-base-200 rounded-xl ">
      <div className="hero-content grid grid-cols-1 md:grid-cols-2 gap-20 flex-col lg:flex-row">
        <div className="gap-x-20">
          <img className="w-3/4" src={img} alt="" />
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 py-6 ">
          <p className="text-2xl text-center font-bold text-sky-600 underline">
            Login
          </p>
          <form onSubmit={handelLogin} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                name="email"
                type="text"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                name="password"
                type="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <input className="btn btn-primary" type="submit" value="Login" />
            </div>
          </form>
          <p className="text-center text-sm">
            New to Car Doctor ?{" "}
            <Link
              to="/signup"
              className="text-orange-600 font-semibold hover:underline"
            >
              Sign Up
            </Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
