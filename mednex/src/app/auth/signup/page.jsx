"use client";
import { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [address, setAddress] = useState("");
  const [hospitalId, setHospitalId] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("/api/auth/signup", {
        email,
        password,
        name,
        phoneNumber,
        dateOfBirth,
        address,
        hospitalId,
      });

      const { authToken, usertype } = response.data;

      if (authToken) {
        localStorage.setItem("authToken", authToken);
        localStorage.setItem("usertype", usertype);

        // Redirect to /dashboard
        window.location.href = "/dashboard";
      } else {
        setError("Failed to retrieve authToken.");
      }
    } catch (err) {
      setError(`Sign up failed: ${err.response?.data?.error || err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-r from-teal-200 to-green-main">
      <Card className="w-full max-w-md mx-auto p-4">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Sign Up</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter your phone number"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your address"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="hospitalId">Hospital ID</Label>
              <Input
                id="hospitalId"
                type="text"
                value={hospitalId}
                onChange={(e) => setHospitalId(e.target.value)}
                placeholder="Enter your hospital ID"
              />
            </div>
            <Button
              className="w-full bg-green-main"
              type="submit"
              disabled={loading}
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </Button>
          </form>

          {error && <p className="text-red-500">{error}</p>}
        </div>
      </Card>
    </div>
  );
}
