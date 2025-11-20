import { useContext } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { IoEye } from "react-icons/io5";
import { useState } from "react";
import axios from "axios";
import logo from "../assets/logo.jpg";

import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Loading from "../components/Loading";
import { serverURL } from "../main";

const Login = () => {
  let navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const adminLogin = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const result = await axios.post(
        `${serverURL}/api/auth/adminlogin`,
        { email, password },
        { withCredentials: true }
      );
      console.log(result);
      setLoading(false);
      toast.success("Log in Successfully");

      navigate("/");
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error("Log in Failed");
    }
  };
  return (
    <>
      <div className="bg-gradient-to-r from-[#3B3A28] via-[#5E503F] to-[#B08D57] h-[80px] flex justify-start items-center px-[10px] gap-[10px] cursor-pointer">
        <img className="w-[40px] rounded-lg" src={logo} alt="" />
        <h1 className="text-[25px] font-sans text-white">SnehaTraders</h1>
      </div>

      <div className="h-[100vh] w-[100vw] bg-gradient-to-r from-[#3B3A28] via-[#5E503F] to-[#B08D57] text-[white] flex flex-col items-center justify-start">
        <div className="w-[100%] h-[100px] flex flex-col justify-center items-center gap-[10px]">
          <span className="text-[25px] font-semibold">Login Page</span>
          <span className="text-[16px]">
            Welcome to SnehaTraders , Apply for admin login
          </span>
        </div>
        <div className="max-w-[600px] w-[90%] h-[500px] bg-[#00000025] border-[1px] border-[#96969635] backdrop-blur-2xl rounded-lg shadow-lg flex items-center justify-center ">
          <form
            action=""
            onSubmit={adminLogin}
            className="w-[90%] h-[90%] flex flex-col items-center justify-start gap-[20px] "
          >
            <div className="w-[90%] h-[400px] flex flex-col items-center justify-center gap-[15px] ">
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop:blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold "
                placeholder="Email"
                required
              />
              <input
                type={!show ? "password" : "text"}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="w-[100%] h-[50px] border-[2px] relative border-[#96969635] backdrop:blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold "
                placeholder="Password"
                required
              />
              {!show && (
                <IoEyeOutline
                  className="w-[20px] h-[20px] cursor-pointer absolute right-[12%] bottom-[55%]"
                  onClick={() => {
                    setShow((prev) => !prev);
                  }}
                />
              )}
              {show && (
                <IoEye
                  className="w-[20px] h-[20px] cursor-pointer absolute right-[12%] bottom-[55%]"
                  onClick={() => {
                    setShow((prev) => !prev);
                  }}
                />
              )}
              <button className="w-[100%] h-[50px] mt-[20px] bg-[#c97f6a] rounded-lg flex items-center justify-center cursor-pointer">
                {loading ? <Loading /> : "Log in"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
