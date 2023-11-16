import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
    return (
        <div className="bg-gray-900 text-white w-64 h-screen">
            <div className="p-4">
                <h1 className="text-3xl font-semibold">Marshall Store</h1>
            </div>
            <ul className="py-4">
                <li className="px-4 py-2 text-xl">
                    <Link
                        to="/admin/user"
                        className="block text-gray-300 hover:text-white transition duration-300"
                    >
                        <i className="fa-solid fa-user mr-3"></i>
                        Users
                    </Link>
                </li>
                <li className="px-4 py-2 text-lg">
                    <Link
                        to="/admin/products"
                        className="block text-gray-300 hover:text-white transition duration-300"
                    >
                        <i className="fa-solid fa-store mr-3"></i>
                        Products
                    </Link>
                </li>
                <li className="px-4 py-2 text-lg">
                    <Link
                        to=""
                        className="block text-gray-300 hover:text-white transition duration-300"
                    >
                        <i className="fa-solid fa-cart-shopping mr-3"></i>
                        Orders
                    </Link>
                </li>
                {/* <li className="px-4 py-2 text-lg">
                    <Link
                        to=""
                        className="block text-gray-300 hover:text-white transition duration-300"
                    >
                        Dashboard
                    </Link>
                </li> */}
            </ul>
        </div>
    );
};

export default Sidebar;
