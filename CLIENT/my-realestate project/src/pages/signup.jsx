// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./signup.css";

// function Signup() {
//   const [data, setData] = useState({
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handler = (e) => {
//     setError(""); // clear error on typing
//     setData({
//       ...data,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const click = async () => {
//     const { email, password, confirmPassword } = data;

//     // Basic validations
//     if (!email || !password || !confirmPassword) {
//       setError("All fields are required.");
//       return;
//     }

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       setError("Please enter a valid email address.");
//       return;
//     }

//     if (password.length < 6) {
//       setError("Password must be at least 6 characters.");
//       return;
//     }

//     if (password !== confirmPassword) {
//       setError("Passwords do not match.");
//       return;
//     }

//     // Submit data to backend
//     try {
//       const res = await fetch("http://localhost:5000/api/signup", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       const dataResponse = await res.json();

//       if (res.ok) {
//         alert(`Signup successful! Your User ID is ${dataResponse.userId}`);
//         navigate("/");
//       } else {
//         setError(dataResponse.message || "Signup failed.");
//       }
//     } catch (err) {
//       setError("Server error during signup." );
//       console.log(err);
//     }
//   };

//   return (
//     <div className="main-container">
//       <div className="center-box">
//         <div className="container-1">
//           <h2>Logo</h2>
//           <p className="p1">Create New Account</p>
//           <input
//             type="email"
//             placeholder="Email"
//             className="ip1"
//             name="email"
//             value={data.email}
//             onChange={handler}
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             name="password"
//             className="ip2"
//             value={data.password}
//             onChange={handler}
//           />
//           <input
//             type="password"
//             placeholder="Confirm Password"
//             name="confirmPassword"
//             className="ip2"
//             value={data.confirmPassword}
//             onChange={handler}
//           />
//           {error && <p style={{ color: "red" }}>{error}</p>}
//           <button onClick={click} className="bt-1">
//             Sign up
//           </button>
//         </div>
//         <p className="p2">
//           Already have an account?{" "}
//           <span className="loginsp" onClick={() => navigate("/")}>
//             Sign in
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Signup;
















// // import React, { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import "./signup.css";

// // function Signup() {
// //   const [data, setData] = useState({
// //     email: "",
// //     password: "",
// //     confirmPassword: "",
// //   });

// //   const [error, setError] = useState("");
// //   const navigate = useNavigate();

// //   const handler = (e) => {
// //     setError(""); // clear error on typing
// //     setData({
// //       ...data,
// //       [e.target.name]: e.target.value,
// //     });
// //   };

// //   const click = async () => {
// //     const { email, password, confirmPassword } = data;

// //     // Basic validations
// //     if (!email || !password || !confirmPassword) {
// //       setError("All fields are required.");
// //       return;
// //     }

// //     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// //     if (!emailRegex.test(email)) {
// //       setError("Please enter a valid email address.");
// //       return;
// //     }

// //     if (password.length < 6) {
// //       setError("Password must be at least 6 characters.");
// //       return;
// //     }

// //     if (password !== confirmPassword) {
// //       setError("Passwords do not match.");
// //       return;
// //     }

// //     // Submit data to backend
// //     try {
// //       const res = await fetch("http://localhost:5000/api/signup", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ email, password }),
// //       });

// //       const dataResponse = await res.json();

// //       if (res.ok) {
// //         alert(`Signup successful! Your User ID is ${dataResponse.userId}`);
// //         navigate("/");
// //       } else {
// //         setError(dataResponse.message || "Signup failed.");
// //       }
// //     } catch (err) {
// //       setError("Server error during signup." );
// //       console.log(err);
// //     }
// //   };

// //   return (
// //     <div className="main-container">
// //       <div className="center-box">
// //         <div className="container-1">
// //           <h2>Logo</h2>
// //           <p className="p1">Create New Account</p>
// //           <input
// //             type="email"
// //             placeholder="Email"
// //             className="ip1"
// //             name="email"
// //             value={data.email}
// //             onChange={handler}
// //           />
// //           <input
// //             type="password"
// //             placeholder="Password"
// //             name="password"
// //             className="ip2"
// //             value={data.password}
// //             onChange={handler}
// //           />
// //           <input
// //             type="password"
// //             placeholder="Confirm Password"
// //             name="confirmPassword"
// //             className="ip2"
// //             value={data.confirmPassword}
// //             onChange={handler}
// //           />
// //           {error && <p style={{ color: "red" }}>{error}</p>}
// //           <button onClick={click} className="bt-1">
// //             Sign up
// //           </button>
// //         </div>
// //         <p className="p2">
// //           Already have an account?{" "}
// //           <span className="loginsp" onClick={() => navigate("/")}>
// //             Sign in
// //           </span>
// //         </p>
// //       </div>
// //     </div>
// //   );
// // }

// // export default Signup;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signup.css";

function Signup() {
  const [data, setData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handler = (e) => {
    setError(""); // clear error on typing
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const click = async () => {
    const { email, password, confirmPassword } = data;

    // Basic validations
    if (!email || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Submit data to backend
    try {
      const res = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const dataResponse = await res.json();

      if (res.ok) {
        alert(`Signup successful! Your User ID is ${dataResponse.userId}`);
        navigate("/");
      } else {
        setError(dataResponse.message || "Signup failed.");
      }
    } catch (err) {
      setError("Server error during signup." );
      console.log(err);
    }
  };

  return (
    <div className="main-container1">
      <div className="center-box1">
        <div className="container-11">
          <h2>Logo</h2>
          <p className="create">Create New Account</p>
          <input
            type="email"
            placeholder="Email"
            className="ip11"
            name="email"
            value={data.email}
            onChange={handler}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            className="ip21"
            value={data.password}
            onChange={handler}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            className="ip21"
            value={data.confirmPassword}
            onChange={handler}
          />
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button onClick={click} className="bt-11">
            Sign up
          </button>
        </div>
        <p className="p21">
          <span className="loginsp1" onClick={() => navigate("/")}>
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
}

export default Signup;