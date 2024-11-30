// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import image1 from "../imgs/loginbackground.5ad1adb02f73f4ac865e.webp";
// import image2 from "../imgs/recruitment-agency-logo-vector.jpg";

// const Login = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = () => {
//     if (username === "admin" && password === "12345") {
//       navigate("/executive");
//     } else {
//       alert("Invalid username or password");
//     }
//   };

//   return (
//     <div
//       className="h-screen bg-cover bg-center flex items-end justify-start p-10"
//       style={{ backgroundImage: `url(${image1})` }}
//     >
//       <div className="w-96 p-6 bg-white bg-opacity-80 backdrop-blur-lg rounded-lg shadow-md mb-10 ml-10">
//         <div className="text-center mb-16">
//         <img src={image2} alt="Logo" className="w-64 mx-auto mb-4" />
//           <h1 className="text-2xl font-bold mb-6">Sign-In</h1>
//         </div>
//         <input
//           type="text"
//           placeholder="Username"
//           className="w-full mb-4 p-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           className="w-full mb-4 p-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button
//           className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600"
//           onClick={handleLogin}
//         >
//           Login
//         </button>
//         <p className="text-center text-sm text-gray-500 mt-4">
//           Powered by Dockyard Total Solutions. Copyright © 2023
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import image1 from "../imgs/recruit.jpg";
import image2 from "../imgs/recruitment-agency-logo-vector.jpg";
import "./Login.css";  // Import the CSS file

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === "admin" && password === "12345") {
      navigate("/home");
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <div
      className="login-container"
      style={{ backgroundImage: `url(${image1})` }}
    >
      <div className="login-card">
        <div className="text-center mb-16">
          <img src={image2} alt="Logo" className="logo" />
          <h1 className="text-2xl font-bold mb-6">Sign-In</h1>
        </div>
        <input
          type="text"
          placeholder="Username"
          className="input-field"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="input-field"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="login-button"
          onClick={handleLogin}
        >
          Login
        </button>
        <p className="footer-text">
          Powered by Dockyard Total Solutions. Copyright © 2023
        </p>
      </div>
    </div>
  );
};

export default Login;
