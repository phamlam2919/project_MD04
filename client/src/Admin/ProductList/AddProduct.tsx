import React, { useEffect, useState } from "react";
import AddMedia from "./AddMedia";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { LoadingOutlined, UploadOutlined } from "@ant-design/icons";
import { Button } from "antd";
type Props = {};
interface Product {
    name: string;
    number: string;
    price: string;
    sale: string;
    category_id: string;
    wattage: any;
    frequency: any;
    size: any;
    weight: any;
}

interface Category {
    category_id: any;
    description: any;
}

const AddProduct = (props: Props) => {
    const [uploadedImages, setUploadedImages] = useState<string[]>([]);

    const navigate = useNavigate();
    const [categories, setCategories] = useState<Category[]>();
    const [productData, setProductData] = useState<Product>({
        name: "",
        number: "",
        price: "",
        sale: "",
        category_id: "",
        wattage: "",
        frequency: "",
        size: "",
        weight: "",
    });

    const onImagesUploaded = (imageList: string[]) => {
        setUploadedImages(imageList);
    };

    const fetchCategories = async () => {
        try {
            const response = await axios.get<Category[]>(
                "http://localhost:3000/api/v1/categories"
            );
            setCategories(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleCreate = (e: any) => {
        const { name, value } = e.target;
        setProductData((input) => ({
            ...input,
            [name]: value,
        }));
    };

    const handleAddProduct = () => {
        const newProduct = {
            ...productData,
            source: uploadedImages,
        };
        console.log("=============", newProduct);

        axios
            .post("http://localhost:3000/api/v1/products", newProduct)
            .then(() => {
                Swal.fire(
                    "Thành Công",
                    "Sản phẩm đã được thêm mới",
                    "success"
                ).then(() => {
                    navigate("/admin/products");
                });
            })
            .catch((error) => {
                console.error("Error adding product:", error);
            });
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const [isUploading, setIsUploading] = useState(false);
    const onchangeImage = async (e: any) => {
        setIsUploading(true);
        const cac = e.target.files;
        const newData = new FormData();
        for (const key of Object.keys(cac)) {
            newData.append("image", cac[key]);
        }

        try {
            const response = await axios.post(
                "http://localhost:3000/api/v1/media",
                newData,
                {
                    headers: { "content-type": "multipart/form-data" },
                }
            );
            console.log("Response", response.data);

            setUploadedImages(response.data.imageList);
        } catch (error) {
            console.error("Error uploading image", error);
        } finally {
            setIsUploading(false);
        }
    };
    return (
        <div className=" flex justify-center">
            <div className="bg-white w-full p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold mb-4">Add Product</h3>
                <div className="flex">
                    <form className=" flex flex-wrap items-center gap-3 w-[35%] ">
                        <div>
                            <label className="block text-gray-600 text-sm font-medium mb-1">
                                Name:
                            </label>
                            <input
                                type="text"
                                name="name"
                                className="w-full p-2 border rounded-md"
                                onChange={handleCreate}
                            />
                        </div>

                        <div>
                            <label className="block text-gray-600 text-sm font-medium mb-1">
                                Number:
                            </label>
                            <input
                                type="text"
                                name="number"
                                className="w-full p-2 border rounded-md"
                                onChange={handleCreate}
                            />
                        </div>

                        <div>
                            <label className="block text-gray-600 text-sm font-medium mb-1">
                                Price:
                            </label>
                            <input
                                type="text"
                                name="price"
                                className="w-full p-2 border rounded-md"
                                onChange={handleCreate}
                            />
                        </div>

                        <div>
                            <label className="block text-gray-600 text-sm font-medium mb-1">
                                Sale:
                            </label>
                            <input
                                type="text"
                                name="sale"
                                className="w-full p-2 border rounded-md"
                                onChange={handleCreate}
                            />
                        </div>

                        <div>
                            <label className="block text-gray-600 text-sm font-medium mb-1">
                                Wattage:
                            </label>
                            <input
                                type="text"
                                name="wattage"
                                className="w-full p-2 border rounded-md"
                                onChange={handleCreate}
                            />
                        </div>

                        <div>
                            <label className="block text-gray-600 text-sm font-medium mb-1">
                                Frequency:
                            </label>
                            <input
                                type="text"
                                name="frequency"
                                className="w-full p-2 border rounded-md"
                                onChange={handleCreate}
                            />
                        </div>

                        <div>
                            <label className="block text-gray-600 text-sm font-medium mb-1">
                                Size:
                            </label>
                            <input
                                type="text"
                                name="size"
                                className="w-full p-2 border rounded-md"
                                onChange={handleCreate}
                            />
                        </div>

                        <div>
                            <label className="block text-gray-600 text-sm font-medium mb-1">
                                Weight:
                            </label>
                            <input
                                type="text"
                                name="weight"
                                className="w-full p-2 border rounded-md"
                                onChange={handleCreate}
                            />
                        </div>

                        <div>
                            <label className="block text-gray-600 text-sm font-medium mb-1">
                                Category:
                            </label>
                            <select
                                name="category_id"
                                onChange={handleCreate}
                                className="w-full p-2 border rounded-md"
                            >
                                <option value="">Filter By Category</option>
                                {categories &&
                                    categories.length > 0 &&
                                    categories.map((e, i) => (
                                        <option key={i} value={e.category_id}>
                                            {e.description}
                                        </option>
                                    ))}
                            </select>
                        </div>
                    </form>
                    <div className="w-[65%]">
                        {/* <AddMedia /> */}
                        <div>
                            <h1>Upload file</h1>
                            <label
                                htmlFor="file"
                                className="cursor-pointer mr-3"
                            >
                                <UploadOutlined />
                            </label>
                            <input
                                type="file"
                                name="file"
                                id="file"
                                multiple
                                hidden
                                onChange={onchangeImage}
                            />
                            <Button disabled={isUploading}> Upload </Button>
                            {isUploading && (
                                <p>
                                    <LoadingOutlined
                                        style={{
                                            fontSize: "50px",
                                            marginBottom: "20px",
                                            marginTop: "20px",
                                        }}
                                    />
                                </p>
                            )}
                        </div>

                        <div>
                            <h2>Uploaded Images:</h2>
                            <div className="flex flex-wrap  items-center justify-around">
                                {uploadedImages.map((image, index) => (
                                    <div className="w-[30%]" key={index}>
                                        <img
                                            className="w-[100%] mb-5 mt-5truất long"
                                            src={image}
                                            alt={`Uploaded Image ${index}`}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex space-x-4">
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-md"
                        onClick={handleAddProduct}
                    >
                        Add Product
                    </button>
                    <button className="bg-red-500 text-white px-4 py-2 rounded-md">
                        <Link
                            to="/admin/products"
                            style={{
                                textDecoration: "none",
                                color: "white",
                            }}
                        >
                            Cancel
                        </Link>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;
