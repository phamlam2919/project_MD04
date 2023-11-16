import React, { useEffect, useState } from "react";
import { Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import validator from "validator";
import { useDispatch, useSelector } from "react-redux";
type Props = {};

const PayCheckOut = (props: Props) => {
    const navigate = useNavigate();
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const cart = useSelector((state: any) => state.cart);
    const [provinces, setProvinces] = useState<any[]>([]); // Tỉnh/Thành Phố
    const [activeProvince, setActiveProvince] = useState<string>("");

    const [districts, setDistricts] = useState<any[]>([]); // Quận/Huyện
    const [activeDistrict, setActiveDistrict] = useState<string>("");

    const [wards, setWards] = useState<any[]>([]); // Phường/Xã
    const [activeWard, setActiveWard] = useState<string>("");

    const VIETNAM_BASE_API = "https://provinces.open-api.vn/api/?depth=3";
    const BASE_API = "http://localhost:3000/api/v1";

    const fetchProvinces = async () => {
        try {
            let res = await fetch(VIETNAM_BASE_API);
            let data = await res.json();
            setProvinces([...data]);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchProvinces();
    }, []);

    useEffect(() => {
        let clickProvince = provinces.find((e) => e.name === activeProvince);
        if (clickProvince) {
            setDistricts([...clickProvince.districts]);
            setActiveWard("");
        }
    }, [activeProvince]);

    useEffect(() => {
        let clickDistrict = districts.find((e) => e.name === activeDistrict);
        if (clickDistrict) {
            setWards([...clickDistrict.wards]);
        }
    }, [activeDistrict]);

    const handleActiveProvince = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (!e.target.value) {
            resetAllProvinces();
        } else {
            setActiveProvince(e.target.value);
        }
    };

    const handleActiveDistrict = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (!e.target.value) {
            resetAllProvinces();
        } else {
            setActiveDistrict(e.target.value);
        }
    };

    const handleActiveWard = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (!e.target.value) {
            resetAllProvinces();
        } else {
            setActiveWard(e.target.value);
        }
    };

    function resetAllProvinces() {
        setActiveProvince("");
        setActiveDistrict("");
        setDistricts([]);
        setActiveWard("");
        setWards([]);
    }

    const handleCheckout = async (e: any) => {
        e.preventDefault();
        const isValidEmail = validator.isEmail(email);
        const isValidPhone = validator.isMobilePhone(phone, "vi-VN");

        if (!isValidEmail || !isValidPhone) {
            Swal.fire("Lỗi", "Email hoặc số điện thoại không hợp lệ", "error");
            return;
        }
        try {
            let order = {
                name,
                email,
                phone,
                address,
                province: activeProvince,
                district: activeDistrict,
                ward: activeWard,
                cart,
            };
            let res = await fetch(BASE_API + "/orders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(order),
            });
            let data = await res.json();
            Swal.fire("Thành Công", data.message, "success").then(() => {
                // localStorage.setItem("order")
                // dispatch({ type: "CLEAR_CART" });
                navigate(`/bill?id=${data.orderId}`);
            });
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div>
            {" "}
            <div>
                <div
                    className="p-8 rounded-lg"
                    style={{
                        backgroundColor: "#FFFFFF",
                        width: "100%",
                    }}
                >
                    <h4 className="font-semibold text-2xl">Billing Details</h4>
                    <div className="mt-5">
                        <p>Họ và tên:</p>
                        <Input
                            placeholder="Họ và tên"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="mt-5">
                        <p>Email:</p>
                        <Input
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="mt-5">
                        <p>Số điện thoại:</p>
                        <Input
                            placeholder="Số điện thoại"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                    <div className="">
                        <div className="mt-5">
                            <p>Tỉnh/Thành:</p>
                            <select
                                style={{
                                    borderRadius: "6px",
                                    border: "1px solid #d9d9d9",
                                    width: "100%",
                                    height: "32px",
                                    color: "rgb(0 0 0 / 88%)",
                                }}
                                aria-label="Default select example"
                                onChange={handleActiveProvince}
                                value={activeProvince}
                            >
                                <option value="">Tỉnh/Thành</option>
                                {provinces.length > 0 &&
                                    provinces.map((e: any, i) => (
                                        <option key={i} value={e.name}>
                                            {e.name}
                                        </option>
                                    ))}
                            </select>
                        </div>

                        <div className="mt-5">
                            <p>Quận/Huyện:</p>
                            <select
                                style={{
                                    borderRadius: "6px",
                                    border: "1px solid #d9d9d9",
                                    width: "100%",
                                    height: "32px",
                                }}
                                className=""
                                aria-label="Default select example"
                                onChange={handleActiveDistrict}
                                value={activeDistrict}
                            >
                                <option value="">Quận/Huyện</option>
                                {districts.length > 0 &&
                                    districts.map((e: any, i) => (
                                        <option key={i} value={e.name}>
                                            {e.name}
                                        </option>
                                    ))}
                            </select>
                        </div>

                        <div className="mt-5">
                            <p>Phường/Xã:</p>
                            <select
                                style={{
                                    borderRadius: "6px",
                                    border: "1px solid #d9d9d9",
                                    width: "100%",
                                    height: "32px",
                                }}
                                aria-label="Default select example"
                                onChange={handleActiveWard}
                                value={activeWard}
                            >
                                <option value="">Phường/Xã</option>
                                {wards.length > 0 &&
                                    wards.map((e: any, i) => (
                                        <option key={i} value={e.name}>
                                            {e.name}
                                        </option>
                                    ))}
                            </select>
                        </div>
                    </div>
                    <div className="mt-5">
                        <p>Ghi chú đơn hàng (tuỳ chọn)</p>
                        <textarea
                            style={{
                                borderRadius: "5px",
                                border: "1px solid #d9d9d9",
                                width: "100%",
                                height: "100px",
                                padding: "10px",
                            }}
                            placeholder="Ghi chú về đơn hàng, ví dụ: thời gian hay chỉ dẫn địa điểm giao hàng chi tiết hơn."
                            name=""
                            id=""
                        ></textarea>
                    </div>
                </div>
                <div
                    className="p-8 rounded-lg mt-5"
                    style={{
                        backgroundColor: "#FFFFFF",
                        width: "100%",
                    }}
                >
                    <p className="text-2xl font-semibold">
                        Payment Information
                    </p>
                    <div className="flex items-center gap-2 mb-4 mt-5">
                        <input type="radio" name="aaa" value="" checked />
                        <label>Chuyển khoản ngân hàng </label>
                    </div>

                    <div className="flex items-center gap-2">
                        <input type="radio" name="aaa" value="" checked />
                        <label>Trả tiền mặt khi giao hàng </label>
                    </div>
                    <p
                        style={{
                            backgroundColor: "#F8F8F8",
                            boxShadow: "1px 1px 2px rgba(0,0,0,0.05)",
                            padding: "15px",
                            borderRadius: "10px",
                            color: "#abb8c3",
                            marginTop: "10px",
                            marginBottom: "20px",
                        }}
                    >
                        Trả tiền mặt khi giao hàng
                    </p>
                    <hr />
                    <p className="mt-5">
                        Thông tin cá nhân của bạn sẽ được sử dụng để xử lý đơn
                        hàng, tăng trải nghiệm sử dụng website, và cho các mục
                        đích cụ thể khác đã được mô tả trong{" "}
                        <b>chính sách riêng tư </b> của chúng tôi.
                    </p>

                    <button
                        onClick={handleCheckout}
                        style={{
                            width: "100%",
                            height: "50px",
                            backgroundColor: "black",
                            color: "white",
                            borderRadius: "7px",
                            marginTop: "20px",
                        }}
                    >
                        Đặt hàng
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PayCheckOut;
