import ImgSide from "../../assets/images/login_page_sideImage.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import ClientAPI from "../../API/ClientAPI";
import { useAuthStateContext } from "../../Context/AuthContext";

const Login = () => {
  const { setUser, setToken } = useAuthStateContext(); // getting auth values

  const [errors, setErrors] = useState(null); // errors while registering

  // payload for register method
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // input handle for form
  const handleInput = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // submitting values to backend
  const onSubmit = (e) => {
    e.preventDefault();

    ClientAPI.post("/login", formData)
      .then(({ data }) => {
        setUser(data.user);
        setToken(data.token);
        if (data.error)
          setErrors({ error: ["Email or Password is incorrect."] });
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors);
        }
        if (response && response.status === 403) {
          setErrors("");
        }
      });
  };

  return (
    <>
      {/* Desktop View */}
      <div className="sm:flex hidden bg-green-50 h-screen items-center justify-center p-10">
        <div className="flex items-center rounded-3xl bg-white max-w-[1400px] m-auto shadow-md">
          <div className="relative lg:block hidden">
            <div className="bg-[#FFDD55] rounded-r-[80px] p-10 h-[100%] p-16 flex flex-col gap-10">
              <h1 className="text-2xl font-bold text-center pb-5">
                Daily Tasker
              </h1>
              <p className="max-w-sm font-semibold text-center">
                We are here to complete you daily tasks Like no one done before.
              </p>
              <div className="">
                <img src={ImgSide} alt="login-side-image" width={400} />
              </div>
              <p className="max-w-sm font-semibold text-center">
                We are here to make your daily life easy. Easy life you never
                seen before
              </p>
            </div>
          </div>

          <form className="mt-5 flex flex-col gap-5 px-10" onSubmit={onSubmit}>
            <h1 className="font-bold text-4xl text-center pb-10">Login</h1>
            {errors && (
              <div className="text-white bg-danger p-5 rounded-lg mb-2">
                {Object.keys(errors).map((key) => (
                  <p key={key}>{errors[key][0]}</p>
                ))}
              </div>
            )}
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInput(e)}
              required
              name="email"
              placeholder="johnWick@example.com"
              className="border border-[#61677A] outline-none rounded-3xl p-2 px-3 w-[450px]"
            />

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={(e) => handleInput(e)}
              required
              placeholder="password"
              className="border border-[#61677A] outline-none rounded-3xl p-2 px-3"
            />

            <input
              type="submit"
              value="Sign up"
              className="border-none outline-none rounded-3xl p-2 px-3 font-semibold text-white bg-[#05C46B] cursor-pointer hover:bg-[#40c587] duration-300"
            />
            <p className="block pb-5 flex justify-between items-center">
              <Link to="" className="hover:underline text-[#FF5E57]">
                forgot password?
              </Link>
              <Link to="/signup" className="hover:underline text-[#FF5E57]">
                Don't have an account?
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* Mobile View */}
      <div className="sm:hidden block bg-green-50 h-screen pt-20">
        <h1 className="text-3xl font-bold text-center text-heading pb-10">
          Daily Tasker
        </h1>
        <div className="bg-white w-[100%] pt-10 p-2 px-3 shadow-lg">
          <h3 className="font-semibold text-heading text-2xl text-center pb-5">
            Login
          </h3>
          {errors && (
            <div className="text-white bg-danger p-5 rounded-lg mb-2">
              {Object.keys(errors).map((key) => (
                <p key={key}>{errors[key][0]}</p>
              ))}
            </div>
          )}
          <form onSubmit={onSubmit} className="w-full">
            <div className="py-2">
              <input
                type="email"
                placeholder="johnWick@example.com"
                className="border border-gray-200 rounded-3xl p-2 px-3 mb-3 w-full"
                required
                name="email"
                value={formData.email}
                onChange={(e) => handleInput(e)}
              />
            </div>

            <div className="py-2">
              <input
                type="password"
                placeholder="password"
                className="border border-gray-200 rounded-3xl p-2 px-3 mb-3 w-full"
                required
                name="password"
                value={formData.password}
                onChange={(e) => handleInput(e)}
              />
            </div>
            <div className="py-2 pb-6">
              <button className="border-none outline-none rounded-3xl p-2 px-3 font-semibold text-white bg-[#05C46B] cursor-pointer hover:bg-[#40c587] duration-300 w-full">
                Sign in
              </button>
            </div>
            <div className="flex items-center justify-between">
              <p className="block pb-6">
                <Link to="" className="hover:underline text-[#FF5E57]">
                  forgot password?
                </Link>
              </p>
              <p className="block pb-6">
                <Link to="/signup" className="hover:underline text-[#FF5E57]">
                  Don't have an account?
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
