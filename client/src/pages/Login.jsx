"use client";
import { useAuth } from "../auth/authContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useUserApi } from "../services/api";
import { useNavigate } from "react-router-dom";
import abstractImage from "../assets/abstract-bg-image.jpg";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// Define form validation schema
const formSchema = z.object({
    email: z.string().email({ message: "Invalid email address." }),
    password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters." }),
});

const Login = () => {
    const { loginUser } = useUserApi();
    const { login } = useAuth();
    const navigate = useNavigate();

    // Initialize form
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    // Handle form submission
    const onSubmit = async (data) => {
        try {
            const response = await loginUser(data);
            login(response.data);
            navigate("/dashboard/home");
        } catch (error) {
            console.error("Error logging in:", error.response.data);
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* Left Side with Image */}
            <div
                className="hidden md:flex flex-1 bg-cover bg-center"
                style={{
                    backgroundImage: `url(${abstractImage})`,
                }}
            ></div>
            <div className="flex-1 flex items-center justify-center bg-slate-50 dark:bg-gray-900 px-6 md:px-12">
                <div className="max-w-md w-full">
                    <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-6">
                        Welcome Back
                    </h2>
                    <p className="text-center text-gray-500 dark:text-gray-400 mb-8">
                        Sign in to your account
                    </p>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-6"
                        >
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="email"
                                                placeholder="Enter your email"
                                                {...field}
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                placeholder="Enter your password"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button type="submit">Login</Button>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default Login;
