// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import "./Login.css";

// function Login() {
//   const [userId, setUserId] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!userId || !password) {
//       setError("Please enter both User ID and Password.");
//       return;
//     }

//     try {
//       const res = await fetch("http://localhost:5000/api/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email: userId.trim(), password }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         localStorage.setItem("token", data.token);
//         localStorage.setItem("email", data.email);
//         localStorage.setItem("userId", data.userId);
//         navigate("/web");
//       } else {
//         setError(data.message || "Invalid credentials.");
//       }
//     } catch (err) {
//       setError("Server error. Please try again later.");
//     }
//   };

//   return (
//     <div className="main-container">
//       <div className="center-box">
//         <div className="container-1">
//           <h2>Logo</h2>
//           <p className="p1">Enter your credentials to access your account</p>
//           <form onSubmit={handleSubmit}>
//             <input
//               type="text"
//               placeholder="User ID"
//               className="ip1"
//               value={userId}
//               onChange={(e) => setUserId(e.target.value)}
//             />
//             <input
//               type="password"
//               placeholder="Password"
//               className="ip2"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//             {error && <p style={{ color: "red" }}>{error}</p>}
//             <button type="submit" className="bt-1">
//               Sign in
//             </button>
//           </form>
//           <Link to="/signup">
//             <button className="bt-2">Sign up</button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;











// // import React, { useState } from "react";
// // import { useNavigate, Link } from "react-router-dom";
// // import "./Login.css";

// // function Login() {
// //   const [userId, setUserId] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [error, setError] = useState("");
// //   const navigate = useNavigate();

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     if (!userId || !password) {
// //       setError("Please enter both User ID and Password.");
// //       return;
// //     }

// //     try {
// //       const res = await fetch("http://localhost:5000/api/login", {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify({ email: userId.trim(), password }),
// //       });

// //       const data = await res.json();

// //       if (res.ok) {
// //         localStorage.setItem("token", data.token);
// //         localStorage.setItem("email", data.email);
// //         localStorage.setItem("userId", data.userId);
// //         navigate("/web");
// //       } else {
// //         setError(data.message || "Invalid credentials.");
// //       }
// //     } catch (err) {
// //       setError("Server error. Please try again later.");
// //     }
// //   };

// //   return (
// //     <div className="main-container">
// //       <div className="center-box">
// //         <div className="container-1">
// //           <h2>Logo</h2>
// //           <p className="p1">Enter your credentials to access your account</p>
// //           <form onSubmit={handleSubmit}>
// //             <input
// //               type="text"
// //               placeholder="User ID"
// //               className="ip1"
// //               value={userId}
// //               onChange={(e) => setUserId(e.target.value)}
// //             />
// //             <input
// //               type="password"
// //               placeholder="Password"
// //               className="ip2"
// //               value={password}
// //               onChange={(e) => setPassword(e.target.value)}
// //             />
// //             {error && <p style={{ color: "red" }}>{error}</p>}
// //             <button type="submit" className="bt-1">
// //               Sign in
// //             </button>
// //           </form>
// //           <Link to="/signup">
// //             <button className="bt-2">Sign up</button>
// //           </Link>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default Login;
// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import "./Login.css";

// function Login() {
//   const [userId, setUserId] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!userId || !password) {
//       setError("Please enter both User ID and Password.");
//       return;
//     }

//     try {
//       const res = await fetch("http://localhost:5000/api/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email: userId.trim(), password }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         localStorage.setItem("token", data.token);
//         localStorage.setItem("email", data.email);
//         localStorage.setItem("userId", data.userId);
//         navigate("/web");
//       } else {
//         setError(data.message || "Invalid credentials.");
//       }
//     } catch (err) {
//       setError("Server error. Please try again later.");
//     }
//   };

//   return (
//     <div className="main-container">
//       <div className="center-box">
//         <div className="container-1">
//           <h2>Logo</h2>
//           <p className="p1">Enter your credentials to access your account</p>
//           <form onSubmit={handleSubmit}>
//             <input
//               type="text"
//               placeholder="User ID"
//               className="ip1"
//               value={userId}
//               onChange={(e) => setUserId(e.target.value)}
//             />
//             <input
//               type="password"
//               placeholder="Password"
//               className="ip2"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//             {error && <p style={{ color: "red" }}>{error}</p>}
//             <button type="submit" className="bt-1">
//               Sign in
//             </button>
//           </form>
//           <Link to="/signup">
//             <button className="bt-2">Sign up</button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;











// // import React, { useState } from "react";
// // import { useNavigate, Link } from "react-router-dom";
// // import "./Login.css";

// // function Login() {
// //   const [userId, setUserId] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [error, setError] = useState("");
// //   const navigate = useNavigate();

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     if (!userId || !password) {
// //       setError("Please enter both User ID and Password.");
// //       return;
// //     }

// //     try {
// //       const res = await fetch("http://localhost:5000/api/login", {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify({ email: userId.trim(), password }),
// //       });

// //       const data = await res.json();

// //       if (res.ok) {
// //         localStorage.setItem("token", data.token);
// //         localStorage.setItem("email", data.email);
// //         localStorage.setItem("userId", data.userId);
// //         navigate("/web");
// //       } else {
// //         setError(data.message || "Invalid credentials.");
// //       }
// //     } catch (err) {
// //       setError("Server error. Please try again later.");
// //     }
// //   };

// //   return (
// //     <div className="main-container">
// //       <div className="center-box">
// //         <div className="container-1">
// //           <h2>Logo</h2>
// //           <p className="p1">Enter your credentials to access your account</p>
// //           <form onSubmit={handleSubmit}>
// //             <input
// //               type="text"
// //               placeholder="User ID"
// //               className="ip1"
// //               value={userId}
// //               onChange={(e) => setUserId(e.target.value)}
// //             />
// //             <input
// //               type="password"
// //               placeholder="Password"
// //               className="ip2"
// //               value={password}
// //               onChange={(e) => setPassword(e.target.value)}
// //             />
// //             {error && <p style={{ color: "red" }}>{error}</p>}
// //             <button type="submit" className="bt-1">
// //               Sign in
// //             </button>
// //           </form>
// //           <Link to="/signup">
// //             <button className="bt-2">Sign up</button>
// //           </Link>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default Login;

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

function Login() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // 👁 Toggle state

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId || !password) {
      setError("Please enter both User ID and Password.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: userId.trim(), password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("email", data.email);
        localStorage.setItem("userId", data.userId);
        navigate("/web");
      } else {
        setError(data.message || "Invalid credentials.");
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    }
  };

  return (
    <div className="main-container">
      <div className="center-box">
        <div className="container-1">
          <h2>Logo</h2>
          <p className="para1">Enter your credentials to access your account</p>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="User ID"
              className="ip1"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />

            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="ip2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className="eye-icon"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <i className="fa-solid fa-eye"></i>
                ) : (
                  <i className="fa-solid fa-eye-slash"></i>
                )}
              </span>
            </div>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <button type="submit" className="bt-1 sign-bt">
              Sign in
            </button>
          </form>

          <Link to="/signup">
            <button className="bt-2 sign-bt">Sign up</button>
          </Link>
        </div>

        <p className="p2">
          Don't you have an account?{" "}
          <Link to="/signup">
            <span className="loginsp">Sign up</span>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;