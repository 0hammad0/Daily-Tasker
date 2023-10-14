import ImgSide from "../../assets/images/login_page_sideImage.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import ClientAPI from "../../API/ClientAPI";
import { useAuthStateContext } from "../../Context/AuthContext";
import Verification from "./Verification";
import { Notification } from "../components/Alerts/Notification";

const Register = () => {
  const {
    setUser,
    setToken,
    setOtpEmail,
    SetAlert,
    setNotification,
    notification,
  } = useAuthStateContext(); // getting auth values

  const [errors, setErrors] = useState(null); // errors while registering
  const [loading, setLoading] = useState(false); // Loading when Pending

  const [confirmHandleForm, setConfirmHandleForm] = useState(false); // toggle form

  //payload for register method
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_num: "",
    location: "",
    password: "",
    password_confirmation: "",
    otp_email: "otp",
    // otp_phone: "otp",
  });

  const [otp, setOtp] = useState("");

  // confirming that form is filled
  const ConfirmHandle = async () => {
    setLoading(true);

    for (const key in formData) {
      if (formData[key] === "") {
        SetAlert(true, "failed", "Fill all fields");
        setLoading(false);
        return false;
      }
    }

    await ClientAPI.post("/send-verification-alert", formData)
      .then((res) => {
        if (res.status === 200) {
          setConfirmHandleForm(true);
          setOtp(res.data.otp);
          SetAlert(true, "success", "OTP has been sent");
        } else if (res.status === 422) {
          console.log(res);
          SetAlert(true, "failed", res.response.data.errors);
        }
      })
      .catch((e) => {
        if (e.response.status === 422) {
          SetAlert(true, "failed", e.response.data.message);
        } else if (e.response.status === 500) {
          SetAlert(true, "failed", e.response.data.message);
        } else if (e.response.status === 404) {
          SetAlert(true, "failed", "Not found");
        }
      })
      .finally(() => setLoading(false));
  };

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
  };

  // register
  const register = (e) => {
    e.preventDefault();
    if (formData.otp_email === otp) {
      ClientAPI.post("/signup", formData)
        .then(({ data }) => {
          setUser(data.user);
          setToken(data.token);
          setOtpEmail(data.otp);
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
    } else {
      SetAlert(true, "failed", "OTP does not match");
    }
  };

  return (
    <>
      {confirmHandleForm && (
        <Verification register={register} handleInput={handleInput} />
      )}

      {notification.isOpen && (
        <Notification
          toggle={notification}
          Toggler={setNotification}
          message={notification.msg}
        ></Notification>
      )}

      {/* Desktop View */}
      <div className="sm:flex hidden bg-green-50 h-screen items-center justify-center p-10">
        <div className="flex items-center rounded-3xl bg-white max-w-[1400px] m-auto shadow-md">
          <form className="mt-5 flex flex-col gap-5 px-10" onSubmit={onSubmit}>
            <h1 className="font-bold text-2xl text-center">Register</h1>
            {errors && (
              <div className="text-white bg-danger p-5 rounded-lg mb-2">
                {Object.keys(errors).map((key) => (
                  <p key={key}>{errors[key][0]}</p>
                ))}
              </div>
            )}
            <div className="flex items-center gap-5">
              <input
                type="name"
                value={formData.first_name}
                onChange={(e) => handleInput(e)}
                required
                name="first_name"
                placeholder="first name"
                className="border border-[#61677A] outline-none rounded-3xl p-2 px-3"
              />
              <input
                type="name"
                value={formData.last_name}
                onChange={(e) => handleInput(e)}
                required
                name="last_name"
                placeholder="last name"
                className="border border-[#61677A] outline-none rounded-3xl p-2 px-3"
              />
            </div>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInput(e)}
              required
              name="email"
              placeholder="johnWick@example.com"
              className="border border-[#61677A] outline-none rounded-3xl p-2 px-3"
            />
            <input
              type="number"
              value={formData.phone_num}
              onChange={(e) => handleInput(e)}
              required
              name="phone_num"
              placeholder="+92 334-56677889"
              className="border border-[#61677A] outline-none rounded-3xl p-2 px-3"
            />
            <select
              name="location"
              value={formData.location}
              onChange={(e) => handleInput(e)}
              required
              id="location"
              className="border border-[#61677A] outline-none rounded-3xl p-2 px-3"
            >
              <option value="" disabled readOnly>
                choose location
              </option>
              <option value="islamabad">Islamabad</option>
              <option value="rawalpindi">Rawalpindi</option>
            </select>
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
              type="password"
              name="password_confirmation"
              value={formData.password_confirmation}
              required
              onChange={(e) => handleInput(e)}
              placeholder="confirm password"
              className="border border-[#61677A] outline-none rounded-3xl p-2 px-3"
            />

            {loading ? (
              <button
                type="button"
                className="border-none outline-none rounded-3xl p-2 px-3 font-semibold text-white text-center bg-[#05C46B] cursor-pointer hover:bg-[#40c587] duration-300"
                disabled
              >
                <div className="flex justify-center items-center gap-2 p-2 ">
                  <div className="w-3 h-3 rounded-full animate-pulse bg-white"></div>
                  <div className="w-3 h-3 rounded-full animate-pulse bg-white"></div>
                  <div className="w-3 h-3 rounded-full animate-pulse bg-white"></div>
                </div>
              </button>
            ) : (
              <span
                onClick={() => ConfirmHandle()}
                className="border-none outline-none rounded-3xl p-2 px-3 font-semibold text-white text-center bg-[#05C46B] cursor-pointer hover:bg-[#40c587] duration-300"
              >
                Sign up
              </span>
            )}

            <p className="block mb-5">
              Already have account?{" "}
              <Link to="/login" className="hover:underline text-[#FF5E57]">
                Sign in
              </Link>
            </p>
          </form>
          <div className="relative lg:block hidden">
            <div className="bg-[#FFDD55] rounded-l-[80px] p-10 h-[100%] p-16 flex flex-col gap-10">
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
        </div>
      </div>

      {/* Mobile View */}
      <div className="sm:hidden block bg-green-50 h-screen pt-20">
        <h1 className="text-3xl font-bold text-center text-heading pb-10">
          Daily Tasker
        </h1>
        <div className="bg-white w-[100%] pt-10 p-2 px-3 shadow-lg">
          <h3 className="font-semibold text-heading text-2xl text-center pb-5">
            Register
          </h3>
          {errors && (
            <div className="text-white bg-danger p-5 rounded-lg mb-2">
              {Object.keys(errors).map((key) => (
                <p key={key}>{errors[key][0]}</p>
              ))}
            </div>
          )}
          <form onSubmit={onSubmit} className="w-full">
            <div className="py-2 flex">
              <input
                type="name"
                placeholder="first name"
                className="border-l border-t border-b border-gray-200 rounded-l-3xl p-2 px-3 w-full"
                required
                name="first_name"
                value={formData.first_name}
                onChange={(e) => handleInput(e)}
              />
              <input
                type="name"
                placeholder="last name"
                className="border-r border-t border-b border-gray-200 rounded-r-3xl p-2 px-3 w-full"
                required
                name="last_name"
                value={formData.last_name}
                onChange={(e) => handleInput(e)}
              />
            </div>
            <div className="py-2">
              <input
                type="email"
                placeholder="johnWick@example.com"
                className="border border-gray-200 rounded-3xl p-2 px-3 w-full"
                required
                name="email"
                value={formData.email}
                onChange={(e) => handleInput(e)}
              />
            </div>
            <div className="py-2">
              <input
                type="number"
                placeholder="+92 334-5566778"
                className="border border-gray-200 rounded-3xl p-2 px-3 w-full"
                required
                name="phone_num"
                value={formData.phone_num}
                onChange={(e) => handleInput(e)}
              />
            </div>
            <div className="py-2">
              <select
                name="location"
                value={formData.location}
                onChange={(e) => handleInput(e)}
                required
                className="border border-grey-200 outline-none rounded-3xl p-2 px-3 w-full"
              >
                <option value="" disabled readOnly>
                  choose location
                </option>
                <option value="islamabad">Islamabad</option>
                <option value="rawalpindi">Rawalpindi</option>
              </select>
            </div>
            <div className="py-2">
              <input
                type="password"
                placeholder="password"
                className="border border-gray-200 rounded-3xl p-2 px-3 w-full"
                required
                name="password"
                value={formData.password}
                onChange={(e) => handleInput(e)}
              />
            </div>
            <div className="py-2">
              <input
                type="password"
                placeholder="confirm password"
                className="border border-gray-200 rounded-3xl p-2 px-3 w-full"
                required
                name="password_confirmation"
                value={formData.password_confirmation}
                onChange={(e) => handleInput(e)}
              />
            </div>
            <div className="py-2 pb-6">
              <span
                onClick={() => setConfirmHandleForm(ConfirmHandle())}
                className="block text-center border-none outline-none rounded-3xl p-2 px-3 font-semibold text-white bg-[#05C46B] cursor-pointer hover:bg-[#40c587] duration-300 w-full"
              >
                Sign up
              </span>
            </div>
            <p className="block pb-6">
              Already have account?{" "}
              <Link to="/login" className="hover:underline text-[#FF5E57]">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
