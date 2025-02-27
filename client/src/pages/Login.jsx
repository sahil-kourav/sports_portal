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
import { useLoginUserMutation } from "@/features/api/authApi";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [loginInput, setLoginInput] = useState({ email: "", password: "" });
  const [loginUser, { data: loginData, error: loginError, isLoading: loginIsLoading, isSuccess: loginIsSuccess }] =
    useLoginUserMutation();

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginInput({ ...loginInput, [name]: value });
  };

  const handleLogin = async () => {
    await loginUser(loginInput);
  };

  useEffect(() => {
    if (loginIsSuccess && loginData) {
      toast.success(loginData.message || "Login successful! Redirecting...");
      navigate("/");
    }
    if (loginError) {
      toast.error(loginError.message || "Login failed. Please try again.");
    }
  }, [loginIsSuccess, loginData, loginError, navigate]);

  return (
<div className="flex items-center justify-center min-h-screen">
<Card className="w-full max-w-md p-5 bg-white rounded-2xl shadow-lg ">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl mb-2 text-gray-700">Welcome Back!</CardTitle>
          <CardDescription className="text-gray-600 mt-2">
          We’re happy to see you again. Please log in to your account and continue where you left off.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-6 mt-2">
            <div>
              <Label htmlFor="email" className="text-gray-700">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={loginInput.email}
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
                value={loginInput.password}
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
            disabled={loginIsLoading || !loginInput.email || !loginInput.password}
            onClick={handleLogin}
          >
            {loginIsLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Logging In...
              </>
            ) : (
              "Log In"
            )}
          </Button>
          <p className="text-center text-sm text-gray-500">
            Don’t have an account?{" "}
            <a href="/register" className="text-blue-600 hover:underline">
            Signup
            </a>
          </p>
          <p className="text-center text-xs text-gray-400 mt-4">
            Powered by <span className="font-bold text-gray-700">SportXpert</span>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
