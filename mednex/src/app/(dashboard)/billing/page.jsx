/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


const page = () => {
  const [selectedTest, setSelectedTest] = useState("");
  const [amount, setAmount] = useState("");

  const handleSelectChange = (value) => {
    setSelectedTest(value);

    // Assign default amounts based on the selected test
    switch (value) {
      case "CBC":
        setAmount(500);
        break;
      case "Diabetes":
        setAmount(300);
        break;
      case "CT Scan":
        setAmount(1500);
        break;
      case "MRI Scan":
        setAmount(2000);
        break;
      case "Xray":
        setAmount(700);
        break;
      case "Other":
        setAmount("");
        break;
      default:
        setAmount("");
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-green-dark">Billing</h2>
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Billing Information</CardTitle>
            <CardDescription>
              Manage patient billing and payments
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="patient">Patient Name</Label>
              <Input id="patient" placeholder="Enter patient name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="test">Select Test</Label>
              <Select onValueChange={handleSelectChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a test" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Tests</SelectLabel>
                    <SelectItem value="CBC">CBC</SelectItem>
                    <SelectItem value="Diabetes">Diabetes</SelectItem>
                    <SelectItem value="CT Scan">CT Scan</SelectItem>
                    <SelectItem value="MRI Scan">MRI Scan</SelectItem>
                    <SelectItem value="Xray">Xray</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                placeholder="Enter amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            <Button>Process Payment</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default page;
