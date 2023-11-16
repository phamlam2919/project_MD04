import React, { useEffect, useState } from "react";
import axios from "axios";

interface User {
    user_id: number;
    name: string;
    email: string;
    password: string;
}
type Props = {};

const Users = (props: Props) => {
    const [users, setUsers] = useState<User[]>([]);

    const listUsers = () => {
        axios
            .get(`http://localhost:3000/api/v1/users`)
            .then((res) => {
                setUsers(res.data.users);
            })
            .catch((err) => console.log(err));
    };

    const handleDelete = (id: number) => {
        console.log(id);
        axios
            .delete(`http://localhost:3000/api/v1/users/${id}`)
            .then((res) => {
                console.log(res.data);
                setUsers(res.data.user);
                listUsers();
            })
            .catch((err) => console.log(err));
    };

    const toggleUserStatus = (id: number, isBlocked: any) => {
        axios
            .put(`http://localhost:3000/api/v1/users/${id}`, {
                isBlocked: !isBlocked,
            })
            .then((res) => {
                // Cập nhật trạng thái người dùng trong danh sách
                const updatedUsers = users.map((user) => {
                    if (user.user_id === id) {
                        return { ...user, isBlocked: !isBlocked };
                    }
                    return user;
                });
                setUsers(updatedUsers);
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        listUsers();
    }, []);
    return (
        <div className="w-5/6 mx-auto p-10">
            <h1 className="text-3xl font-semibold mb-5">USERS</h1>
            <table className="w-full border-collapse border text-center">
                <thead>
                    <tr className="bg-gray-800 text-white">
                        <th className="p-2">No.</th>
                        {/* <th className="p-2">ID</th>  */}
                        <th className="p-2">Name</th>
                        <th className="p-2">Email</th>
                        <th className="p-2">Password</th>
                        <th className="p-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users?.map((user, index) => (
                        <tr
                            key={index}
                            className={
                                index % 2 === 0 ? "bg-gray-100" : "bg-white"
                            }
                        >
                            <td className="p-2">{index + 1}</td>
                            {/* <td className="p-2">{user.user_id}</td> */}
                            <td className="p-2">{user.name}</td>
                            <td className="p-2">{user.email}</td>
                            <td className="p-2">{user.password}</td>
                            <td className="p-2">
                                <button className="px-4 py-2 bg-green-500 text-white rounded-lg mr-2">
                                    Block
                                </button>
                                {/* <button
                                    className="px-4 py-2 bg-red-500 text-white rounded-lg"
                                    onClick={() => handleDelete(user.user_id)}
                                >
                                    Delete
                                </button> */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Users;
