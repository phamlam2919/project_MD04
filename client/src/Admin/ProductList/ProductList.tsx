import React, { useEffect, useState } from "react";
import { formatCurrency } from "../../helpers";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Pagination from "../shared/Pagination";
import { Button, Modal } from "antd";
import ProductDetail from "./ProductDetail";

interface Product {
    product_id: number;
    name: string;
    price: number;
    number: number;
    sale: number;
    description: string;
}

type Props = {};

const ProductList = (props: Props) => {
    const navigate = useNavigate();
    const [products, setProducts] = useState<Product[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [categories, setCategories] = useState<any[]>([]);
    const [categoryFilter, setCategoryFilter] = useState<string>("");

    const BASE_API = "http://localhost:3000/api/v1";

    const fetchProducts = async () => {
        try {
            const res = await fetch(
                `${BASE_API}/products?page_index=1&page_number=5`
            );
            const data = await res.json();
            // console.log(data.data);

            setProducts([...data.data]);
            setTotal(data.length);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchCategories = async () => {
        try {
            const res = await fetch(`${BASE_API}/categories`);
            const data = await res.json();
            setCategories([...data]);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    const handleChangePage = async (pageIndex: any) => {
        try {
            const res = await fetch(
                `${BASE_API}/products?${
                    categoryFilter ? `category=${categoryFilter}&` : ""
                }page_index=${pageIndex}&page_number=5`
            );
            const data = await res.json();
            setProducts([...data.data]);
            setCurrentPage(pageIndex);
        } catch (error) {
            console.log(error);
        }
    };

    const handleFilterByCategory = (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setCategoryFilter(e.target.value);
    };

    const fetchProductByCategory = async (filter: string) => {
        try {
            if (filter) {
                const res = await fetch(
                    `${BASE_API}/products?category=${filter}&page_index=1&page_number=5`
                );
                const data = await res.json();
                setProducts([...data.data]);
                setTotal(data.length);
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        setCurrentPage(1);
        if (categoryFilter) {
            fetchProductByCategory(categoryFilter);
        } else {
            fetchProducts();
        }
    }, [categoryFilter]);

    const handleDelete = (id: number) => {
        axios
            .delete(`http://localhost:3000/api/v1/products/${id}`)
            .then((res) => {
                setProducts((prevProducts) =>
                    prevProducts.filter((product) => product.product_id !== id)
                );
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleEdit = (id: number) => {
        navigate("/admin/products/edit/" + id);
    };

    const [selectedProductId, setSelectedProductId] = useState<number | null>(
        null
    );

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = (productId: number) => {
        setSelectedProductId(productId);
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
        setSelectedProductId(null);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <div className="p-4 w-full">
            <h3 className="text-3xl font-bold mb-4">Product List</h3>
            <div className="mb-4">
                <div className="flex items-center space-x-2">
                    <select
                        style={{ height: "45px", width: "50%" }}
                        onChange={handleFilterByCategory}
                        className="border rounded px-2 py-1"
                        aria-label="Filter By Category"
                    >
                        <option value="">Filter By Category</option>
                        {categories.length > 0 &&
                            categories.map((e, i) => (
                                <option key={i} value={e.name}>
                                    {e.description}
                                </option>
                            ))}
                    </select>

                    <button className="bg-red-500 text-white rounded px-4 py-2">
                        <Link to="/admin/products/addproduct">Add Product</Link>
                    </button>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full table-auto text-center">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">#</th>
                            {/* <th className="border px-4 py-2">ID</th> */}
                            <th className="border px-4 py-2">Sản phẩm</th>
                            <th className="border px-4 py-2">Giá</th>
                            <th className="border px-4 py-2">Tồn kho</th>
                            <th className="border px-4 py-2">Sale</th>
                            <th className="border px-4 py-2">Thể loại</th>
                            <th className="border px-4 py-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length > 0 &&
                            products.map((e, i) => (
                                <tr key={i}>
                                    <td className="border px-4 py-2">
                                        {i + 1}
                                    </td>
                                    {/* <td className="border px-4 py-2">
                                        {e.product_id}
                                    </td> */}
                                    <td className="border px-4 py-2">
                                        {e.name}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {formatCurrency(e.price)}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {e.number}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {e.sale}%
                                    </td>
                                    <td className="border px-4 py-2">
                                        {e.description}
                                    </td>
                                    <td className="border px-4 py-2">
                                        <Button
                                            type="primary"
                                            onClick={() =>
                                                showModal(e.product_id)
                                            }
                                            className="bg-blue-500 rounded px-2 py-1"
                                        >
                                            <i className="fa-solid fa-eye"></i>
                                        </Button>

                                        <button
                                            onClick={() =>
                                                handleEdit(e.product_id)
                                            }
                                            className="bg-green-500 text-white rounded px-2 py-1 ml-2"
                                        >
                                            <i className="fa-solid fa-wrench"></i>
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDelete(e.product_id)
                                            }
                                            className="bg-red-500 text-white rounded px-2 py-1 ml-2"
                                        >
                                            <i className="fa-solid fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
            <Pagination
                total={total}
                pageNumber={5}
                handleChangePage={handleChangePage}
                currentPage={currentPage}
            />
            <Modal
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okButtonProps={{ className: "bg-blue-500" }}
            >
                {selectedProductId !== null && (
                    <ProductDetail productId={selectedProductId} />
                )}
            </Modal>
        </div>
    );
};

export default ProductList;
