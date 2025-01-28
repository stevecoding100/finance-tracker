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
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// Define form validation schema
const formSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email({ message: "Invalid email address." }),
    password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters." }),
});

const Register = () => {
    const { registerUser } = useUserApi();
    const { login } = useAuth();
    const navigate = useNavigate();

    // Initialize form
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    // Handle form submission
    const onSubmit = async (data) => {
        try {
            const response = await registerUser(data);
            login(response.data);
            navigate("/dashboard");
        } catch (error) {
            console.error("Error registering user:", error.response.data);
        }
    };

    return (
        <div className="flex h-screen">
            {/* Left side with image */}
            <div
                className="hidden md:flex flex-1 bg-cover bg-center"
                style={{ backgroundImage: `url(${abstractImage})` }}
            ></div>

            {/* Right side with form */}
            <div className="flex flex-1 items-center bg-slate-50 justify-center p-8">
                <div className="max-w-md w-full">
                    <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-6">
                        Register
                    </h2>
                    <p className="text-center text-gray-500 dark:text-gray-400 mb-8">
                        Create your account
                    </p>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-6"
                        >
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter your name"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            This is your public display name.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter your email"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            {`We'll never share your email.`}
                                        </FormDescription>
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
                                        <FormDescription>
                                            Choose a strong password.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button type="submit">Register</Button>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default Register;
