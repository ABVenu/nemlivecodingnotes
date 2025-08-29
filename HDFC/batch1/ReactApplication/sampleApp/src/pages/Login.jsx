import React from 'react'// src/pages/Signup.jsx
import { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useDispatch, useSelector } from "react-redux"
import { getUsers, signupUser } from "@/features/users/users.slice"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal } from 'lucide-react'



const Login = () => {
    const { data } = useSelector((state) => state.users)
    const [alertStatus, setAlertStatus] = useState(false)
    const [alertMessage, setAlertMessage] = useState("")

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        /// check whether user is alreday existing 
        let filtredUser = data?.filter((user) => user.email == formData.email);
        if (filtredUser.length == 0) {
            // alert("User Not Present, Please Signup....")
            setAlertStatus(true)
            setAlertMessage("User Not Present, Please Signup....")

          //  navigate("/signup")
        } else {
            /// user is present
            /// check the password
            if (filtredUser[0].password == formData.password) {
                //   alert("Login successful 🎉")
                setAlertStatus(true)
                setAlertMessage("Login successful 🎉")
                navigate("/todos")
            } else {
                // alert("Wrong Password.....")
                setAlertStatus(true)
                setAlertMessage("Wrong Password.....")
            }
            // dispatch(signupUser(formData))
            // // TODO: replace with API call
            // setTimeout(() => {
            //     alert("Signup successful 🎉")
            //     navigate("/login")
            // }, 500)
        }

    }


    useEffect(() => {
        dispatch(getUsers())
    }, [dispatch])
    return (
        <>
            {alertStatus && (
                <div className="fixed top-6 left-1/2 transform -translate-x-1/2 w-full max-w-md z-50">
                    <Alert
                        className={`
        rounded-2xl shadow-lg text-white font-medium
        ${alertMessage.includes("successful") ? "bg-green-500" : ""}
        ${alertMessage.includes("Wrong") ? "bg-red-500" : ""}
        ${alertMessage.includes("Not Present") ? "bg-yellow-500" : ""}
      `}
                    >
                        <AlertTitle className="text-lg flex items-center gap-2">
                            <Terminal className="h-5 w-5" />
                            {alertMessage.includes("successful")
                                ? "Success"
                                : alertMessage.includes("Wrong")
                                    ? "Error"
                                    : "Warning"}
                        </AlertTitle>
                        <AlertDescription className="text-base">
                            {alertMessage}
                        </AlertDescription>
                    </Alert>
                </div>
            )}

            <div className="flex justify-center items-center min-h-[80vh] px-4">
                <Card className="w-full max-w-md shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-2xl">Login to Account</CardTitle>
                        <CardDescription>
                            Get started with TodosApp — it’s free and easy.
                        </CardDescription>
                    </CardHeader>

                    <form onSubmit={handleSubmit}>
                        <CardContent className="space-y-4">
                            {/* Email */}
                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            {/* Password */}
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="********"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </CardContent>

                        <CardFooter className="flex flex-col gap-3">
                            <Button type="submit" className="w-full mt-2.5">
                                Login
                            </Button>
                            <p className="text-sm text-gray-600 text-center">
                                New to website?{" "}
                                <Link to="/signup" className="text-blue-600 hover:underline">
                                    Signup
                                </Link>
                            </p>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </>

    )
}

export default Login