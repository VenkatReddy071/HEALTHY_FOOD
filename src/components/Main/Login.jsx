// import React, { useState } from 'react';
// import { IoMdClose } from 'react-icons/io';
// import Axios from "axios"
// export const Login = ({ setShowLogin }) => {
//   const [activeTab, setActiveTab] = useState('login');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [username, setUsername] = useState('');
//   const [loading, setLoading] = useState(false);
//   const url=`http://localhost:3000/api/`
//   const handleForgotPassword = () => {
//     alert("Password reset functionality will be added soon!");
//   };

//   const handleSignIn = (e) => {
//     e.preventDefault();
//     setLoading(true);
//     Axios.post(url + "login", { email, password }, { withCredentials: true })
//       .then((response) => {
//         setShowLogin(false);
//         setLoading(false);
//       })
//       .catch((error) => {
//         setLoading(false);
//         console.log(error);
//       });
//   };
  
//   const handleSignUp = (e) => {
//     e.preventDefault();
//     Axios.post(url + "register", { email, password,username }, { withCredentials: true })
//     .then((response) => {
//       console.log(response.data)
//       setShowLogin(false);
//       setLoading(false);
//     })
//     .catch((error) => {
//       setLoading(false);
//       console.log(error);
//     });
//   };

//   return (
//     <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
//       <div className="relative md:w-full md:max-w-md p-6 bg-white shadow-md rounded-lg w-80">
//         {/* Close Button */}
//         <IoMdClose
//           size={24}
//           className="absolute top-4 right-4 text-black cursor-pointer"
//           onClick={() => setShowLogin(false)}
//         />

//         {/* Tabs */}
//         <div className="flex justify-center mb-6">
//           <button
//             className={`px-4 py-2 font-semibold ${
//               activeTab === 'login' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-500'
//             }`}
//             onClick={() => setActiveTab('login')}
//           >
//             Login
//           </button>
//           <button
//             className={`px-4 py-2 font-semibold ${
//               activeTab === 'signup' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-500'
//             }`}
//             onClick={() => setActiveTab('signup')}
//           >
//             Sign Up
//           </button>
//         </div>

//         {/* Login Form */}
//         {activeTab === 'login' && (
//           <form onSubmit={handleSignIn}>
//             <h2 className="text-2xl font-bold text-center mb-4 text-orange-500">Login</h2>
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700">Username</label>
//               <input
//                 type="email"
//                 placeholder="Enter email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700">Password</label>
//               <input
//                 type="password"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
//               />
//             </div>
//             <div className="text-right mb-4">
//               <span
//                 className="text-sm text-orange-500 cursor-pointer hover:underline"
//                 onClick={handleForgotPassword}
//               >
//                 Forgot Password?
//               </span>
//             </div>
//             <button
//               type="submit"
//               className="w-full py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
//             >
//               Sign in
//             </button>
//           </form>
//         )}

//         {/* Sign Up Form */}
//         {activeTab === 'signup' && (
//           <form onSubmit={handleSignUp}>
//             <h2 className="text-2xl font-bold text-center mb-4 text-orange-500">Sign Up</h2>
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700">Full Name</label>
//               <input
//                 type="text"
//                 placeholder="Enter username"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700">Email</label>
//               <input
//                 type="email"
//                 placeholder="Enter email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700">Password</label>
//               <input
//                 type="password"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
//               />
//             </div>
//             <button
//               type="submit"
//               className="w-full py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
//             >
//               Sign Up
//             </button>
//           </form>
//         )}

//         {/* Toggle Between Forms */}
//         <p className="text-center text-sm mt-4">
//           {activeTab === 'login' ? (
//             <>
//               Don't have an account?{' '}
//               <span
//                 className="text-orange-500 cursor-pointer hover:underline"
//                 onClick={() => setActiveTab('signup')}
//               >
//                 Sign Up
//               </span>
//             </>
//           ) : (
//             <>
//               Already have an account?{' '}
//               <span
//                 className="text-orange-500 cursor-pointer hover:underline"
//                 onClick={() => setActiveTab('login')}
//               >
//                 Login
//               </span>
//             </>
//           )}
//         </p>
//       </div>
//     </div>
//   );
// };

import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const Login = ({ setShowLogin }) => {
  const [activeTab, setActiveTab] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [forgotPasswordStep, setForgotPasswordStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const url = `http://localhost:3000/api/`;

  const handleSignIn = (e) => {
    e.preventDefault();
    toast.info("Fetching data, please wait...");
    Axios.post(url + "login", { email, password }, { withCredentials: true })
      .then(() => {
        setShowLogin(false);
        setLoading(false);
        toast.success("Login sucessfull");
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    Axios.post(url + "register", { email, password, username }, { withCredentials: true })
      .then((response) => {
        console.log(response.data);
        toast.success("Register successfull");
        setShowLogin(false);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  const handleForgotPassword = () => {
    setForgotPasswordStep(1);
  };

  const handleSendOtp = (e) => {
    e.preventDefault();
    setLoading(true);
    Axios.post(url + "send-otp", { email })
      .then((response) => {
        console.log(response.data)
        toast.success("Otp send ");
        setForgotPasswordStep(2);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    setLoading(true);
    Axios.post(url + "verify-otp", { email, otp })
      .then((response) => {
        console.log(response.data)
        toast.success("otp verified");
        setForgotPasswordStep(3);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    setLoading(true);
    Axios.post(url + "reset-password", { email, newPassword })
      .then((response) => {
        
        console.log(response.data)
        toast.success("reset successfull");
        setForgotPasswordStep(0);
        setActiveTab("login");
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="relative md:w-full md:max-w-md p-6 bg-white shadow-md rounded-lg w-80">
        <IoMdClose
          size={24}
          className="absolute top-4 right-4 text-black cursor-pointer"
          onClick={() => setShowLogin(false)}
        />

        {forgotPasswordStep > 0 && (
          <div className="mb-6">
            {/* Step Indicator */}
            <div className="flex justify-around items-center">
              {["Enter Email", "Verify OTP", "Reset Password"].map((label, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div
                    className={`w-8 h-8 flex items-center justify-center rounded-full ${
                      index + 1 <= forgotPasswordStep
                        ? "bg-orange-500 text-white"
                        : "bg-gray-300 text-gray-500"
                    }`}
                  >
                    {index + 1}
                  </div>
                  {index < 2 && (
                    <div
                      className={`h-1 w-14 ${
                        index + 1 < forgotPasswordStep ? "bg-orange-500" : "bg-gray-300"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="text-center mt-2">
              <p className="text-sm font-semibold">
                {["Enter Email", "Verify OTP", "Reset Password"][forgotPasswordStep - 1]}
              </p>
            </div>
          </div>
        )}

        {forgotPasswordStep === 0 && (
          <>
            {/* Tabs */}
            <div className="flex justify-center mb-6">
              <button
                className={`px-4 py-2 font-semibold ${
                  activeTab === "login" ? "text-orange-500 border-b-2 border-orange-500" : "text-gray-500"
                }`}
                onClick={() => setActiveTab("login")}
              >
                Login
              </button>
              <button
                className={`px-4 py-2 font-semibold ${
                  activeTab === "signup" ? "text-orange-500 border-b-2 border-orange-500" : "text-gray-500"
                }`}
                onClick={() => setActiveTab("signup")}
              >
                Sign Up
              </button>
            </div>

            {/* Login Form */}
            {activeTab === "login" && (
              <form onSubmit={handleSignIn}>
                <h2 className="text-2xl font-bold text-center mb-4 text-orange-500">Login</h2>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Password</label>
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div className="text-right mb-4">
                  <span
                    className="text-sm text-orange-500 cursor-pointer hover:underline"
                    onClick={handleForgotPassword}
                  >
                    Forgot Password?
                  </span>
                </div>
                <button
                  type="submit"
                  className="w-full py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                >
                  Sign in
                </button>
              </form>
            )}
            {activeTab === 'signup' && (
          <form onSubmit={handleSignUp}>
            <h2 className="text-2xl font-bold text-center mb-4 text-orange-500">Sign Up</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
            >
              Sign Up
            </button>
          </form>
        )}
          </>
        )}

        {/* Forgot Password Steps */}
        {forgotPasswordStep === 1 && (
          <form onSubmit={handleSendOtp}>
            <h2 className="text-2xl font-bold text-center mb-4 text-orange-500">Forgot Password</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
            >
              Send OTP
            </button>
          </form>
        )}

        {forgotPasswordStep === 2 && (
          <form onSubmit={handleVerifyOtp}>
            <h2 className="text-2xl font-bold text-center mb-4 text-orange-500">Verify OTP</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">OTP</label>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
            >
              Verify OTP
            </button>
          </form>
        )}

        {forgotPasswordStep === 3 && (
          <form onSubmit={handleResetPassword}>
            <h2 className="text-2xl font-bold text-center mb-4 text-orange-500">Reset Password</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">New Password</label>
              <input
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
            >
              Reset Password
            </button>
          </form>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};
