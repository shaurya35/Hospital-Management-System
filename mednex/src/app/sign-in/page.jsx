// SignInForm.js
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { setRole } from "./role.js";

export default function SignInForm() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  // Hardcoded users data
  const users = [
    { email: "admin@example.com", role: "admin" },
    { email: "doctor@example.com", role: "doctors" },
    { email: "staff@example.com", role: "staff" },
    { email: "patient@example.com", role: "patient" },
    { email: "lab@example.com", role: "lab" },
    { email: "pharmacy@example.com", role: "pharmacy" },
  ];

  const handleSignIn = () => {
    const user = users.find((user) => user.email === email);

    if (user) {
      // Set the role dynamically based on the email
      setRole(user.role);

      // Redirect based on role
      router.push(`/dashboard`);
    } else {
      alert("Invalid email");
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-r from-teal-200 to-green-main">
      <div className="max-w-md mx-auto mt-10 bg-white p-4 rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Sign In</h1>
        <input
          type="email"
          className="w-full p-2 border rounded mb-4"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          className="w-full bg-green-main text-white p-2 rounded"
          onClick={handleSignIn}
        >
          Sign In
        </button>
      </div>
    </div>
  );
}
