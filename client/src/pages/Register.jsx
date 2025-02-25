import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRegisterUserMutation } from "@/features/api/authApi";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [registerInput, setRegisterInput] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [registerUser, { data: registerData, error: registerError, isLoading: registerIsLoading, isSuccess: registerIsSuccess }] =
    useRegisterUserMutation();

  const navigate = useNavigate();

  // Handle Input Changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegisterInput({ ...registerInput, [name]: value });
  };

  // Handle Registration
  const handleRegister = async () => {
    if (!registerInput.name || !registerInput.email || !registerInput.password) {
      toast.error("All fields are required!");
      return;
    }
    await registerUser(registerInput);
    console.log(registerInput);
  };

  useEffect(() => {
    if (registerIsSuccess && registerData) {
      console.log("aman");
      toast.success(registerData.message || "Registration successful! Redirecting...");
      setTimeout(() => navigate("/login"), 1500); // Smooth transition to login
    }

    if (registerError) {
      console.log(registerError);
      const errorMessage =
        registerError?.data?.message || "Registration failed. Please try again.";
      toast.error(errorMessage);
    }
  }, [registerIsSuccess, registerData, registerError, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-sm sm:max-w-md p-5 bg-white rounded-2xl shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-gray-800">Create an Account</CardTitle>
          <CardDescription className="text-gray-600 mt-2">
            Join us today and explore the amazing features we have to offer!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-5">
            <div>
              <Label htmlFor="name" className="text-gray-700">Full Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                value={registerInput.name}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                className="mt-1 w-full bg-gray-100 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-gray-700">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={registerInput.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                className="mt-1 w-full bg-gray-100 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>
            <div>
              <Label htmlFor="password" className="text-gray-700">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={registerInput.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                className="mt-1 bg-gray-100 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button
            className="bg-blue-600 w-full hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md"
            disabled={registerIsLoading || !registerInput.name || !registerInput.email || !registerInput.password}
            onClick={handleRegister}
          >
            {registerIsLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Registering...
              </>
            ) : (
              "Sign Up"
            )}
          </Button>
          <p className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 hover:underline">
              Log in
            </a>
          </p>
          <p className="text-center text-xs text-gray-400 mt-4">
            Powered by <span className="font-bold text-gray-700">Sports Portal</span>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;
