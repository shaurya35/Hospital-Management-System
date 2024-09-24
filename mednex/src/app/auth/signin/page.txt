"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emailOrCode: email, password }),
      });

      const result = await response.json();

      if (response.ok) {
        localStorage.setItem("authToken", result.token);

        switch (result.role) {
          case "patient":
            localStorage.setItem("usertype", "patient");
            break;
          case "doctor":
            localStorage.setItem("usertype", "doctors");
            break;
          case "staff":
            localStorage.setItem("usertype", "staff");
            break;
          case "lab":
            localStorage.setItem("usertype", "lab");
            break;
          case "pharmacy":
            localStorage.setItem("usertype", "pharmacy");
            break;
          default:
            console.error("Unknown user role:", result.role);
        }

        setMessage(result.message);
        setError("");

        router.push(result.redirectUrl);
      } else {
        setError(result.error);
        setMessage("");
      }
    } catch (err) {
      setError("An error occurred while logging in.");
      setMessage("");
    }
  };

  return (
    <div>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email or Code:</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email or code"
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <div>
          <button type="submit">Sign In</button>
        </div>
      </form>

      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
