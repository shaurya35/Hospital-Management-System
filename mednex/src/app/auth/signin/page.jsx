"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

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
        localStorage.setItem("usertype", result.role);

        if (result.role === "doctor") {
          localStorage.setItem("doctorName", result.doctorName);
          localStorage.setItem("speciality", result.speciality);
        } else if (result.role === "staff") {
          localStorage.setItem("staffName", result.name);
          localStorage.setItem("role", result.role);
          localStorage.setItem("department", result.department);
          localStorage.setItem("yearOfJoining", result.yearOfJoining);
          localStorage.setItem("phoneNo", result.phoneNo);
          localStorage.setItem("email", result.email);
        } else if (result.role === "labtech") {
          localStorage.setItem("labtechName", result.name);
          localStorage.setItem("role", result.role);
        } else if (result.role === "pharmacist") {
          localStorage.setItem("pharmacistName", result.name);
          localStorage.setItem("role", result.role);
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
    <>
      <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-r from-teal-200 to-green-main">
        <Card className="w-full max-w-md mx-auto p-4">
          <div className="space-y-4">
            <h2>Sign In</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col space-y-2">
                <Label htmlFor="email">Email or ID</Label>
                <Input
                  id="email"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email or code"
                  required
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>
              <div>
                <Button className="w-full bg-green-main" type="submit">
                  Sign In
                </Button>
              </div>
            </form>

            {message && <p style={{ color: "green" }}>{message}</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
          </div>
        </Card>
      </div>
    </>
  );
}
