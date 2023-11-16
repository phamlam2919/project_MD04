import React, { useState } from "react";
import Header from "../../Commons/header/Header";
import Footer from "../../Commons/footer/Footer";
import { Button, Checkbox, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

interface NewUser {
    email: string;
    password: string;
}
const Login = () => {
    const navigate = useNavigate();

    const [newUsers, setNewUser] = useState<NewUser>({
        email: "",
        password: "",
    });

    const [formErrors, setFormErrors] = useState({
        email: "",
        password: "",
    });

    const handleCreat = (e: any) => {
        const { name, value } = e.target;
        setNewUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleCreateUser = (e: any) => {
        e.preventDefault();

        const errors: any = {};

        if (!newUsers.email) {
            errors.email = "Email không được để trống";
        } else if (!/\S+@\S+\.\S+/.test(newUsers.email)) {
            errors.email = "Email không hợp lệ";
        }

        if (!newUsers.password) {
            errors.password = "Mật khẩu không được để trống";
        } else if (newUsers.password.length < 6) {
            errors.password = "Mật khẩu phải có ít nhất 6 ký tự";
        }

        setFormErrors(errors);

        if (Object.keys(errors).length === 0) {
            axios
                .post(`http://localhost:3000/api/v1/auth/signin`, newUsers)
                .then((res: any) => {
                    if (res.data.result.status === 200) {
                        if (res.data.result.info.role === 1) {
                            navigate("/admin");
                            localStorage.setItem(
                                "tokenAdmin",
                                JSON.stringify(res.data.result.info)
                            );
                        } else {
                            Swal.fire({
                                icon: "success",
                                title: "Đăng nhập thành công",
                                showConfirmButton: false,
                                timer: 2000,
                            }).then(() => {
                                navigate("/");
                            });
                            localStorage.setItem(
                                "token",
                                JSON.stringify(res.data.result.info)
                            );
                        }
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "Đăng nhập thất bại...",
                            text: "Tài khoản hoặc mật khẩu không chính xác",
                        });
                    }
                })
                .catch((err) => console.log(err));
        }
    };

    return (
        <div>
            <Header />
            <div
                className="flex w-full gap-5"
                style={{
                    backgroundColor: "rgb(246,246,246)",
                    padding: "50px 250px",
                }}
            >
                <div
                    className="w-1/2"
                    style={{
                        borderRight: "1px solid #7A7A7A",
                        padding: "0 40px",
                    }}
                >
                    <h1
                        style={{
                            textTransform: "uppercase",
                            fontSize: "22px",
                            fontWeight: "600",
                        }}
                    >
                        Đăng nhập
                    </h1>
                    <Form className="mt-5" name="basic" autoComplete="off">
                        <Form.Item<NewUser>>
                            <p>Email:</p>
                            <Input
                                type="text"
                                name="email"
                                onChange={handleCreat}
                            />
                            {formErrors.email && (
                                <span
                                    className="error-message"
                                    style={{ color: "red" }}
                                >
                                    {formErrors.email}
                                </span>
                            )}
                        </Form.Item>

                        <Form.Item<NewUser>>
                            <p>Password:</p>
                            <Input.Password
                                type="password"
                                name="password"
                                onChange={handleCreat}
                            />
                            {formErrors.password && (
                                <span
                                    className="error-message"
                                    style={{ color: "red" }}
                                >
                                    {formErrors.password}
                                </span>
                            )}
                        </Form.Item>

                        <Form.Item>
                            <Button
                                style={{
                                    color: "white",
                                    width: "100%",
                                    height: "40px",
                                    marginTop: "15px",
                                }}
                                className="bg-black border-0"
                                htmlType="submit"
                                onClick={handleCreateUser}
                            >
                                Log In
                            </Button>
                        </Form.Item>
                        <Form.Item<NewUser>>
                            <div className="flex justify-between">
                                <Checkbox>Remember me</Checkbox>
                                <p>Lost your password?</p>
                            </div>
                        </Form.Item>
                    </Form>
                </div>
                <div
                    style={{ padding: "0 20px", textAlign: "center" }}
                    className="w-1/2"
                >
                    <h1
                        style={{
                            textTransform: "uppercase",
                            fontSize: "22px",
                            fontWeight: "600",
                        }}
                    >
                        Register
                    </h1>
                    <p
                        style={{
                            color: "#7A7A7A",
                            marginTop: "20px",
                            marginBottom: "25px",
                        }}
                    >
                        Registering for this site allows you to access your
                        order status and history. Just fill in the fields below,
                        and we'll get a new account set up for you in no time.
                        We will only ask you for information necessary to make
                        the purchase process faster and easier.
                    </p>
                    <Link to="/register">
                        <button
                            style={{
                                width: "130px",
                                height: "40px",
                                backgroundColor: "black",
                                color: "white",
                                borderRadius: "5px",
                            }}
                        >
                            Đăng Ký
                        </button>
                    </Link>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Login;
