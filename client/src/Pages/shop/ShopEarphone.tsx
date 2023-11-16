import React, { useEffect, useState } from "react";
import Header from "../../Commons/header/Header";
import Footer from "../../Commons/footer/Footer";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import type { MenuProps } from "antd";
import { Button, Dropdown, Space } from "antd";
import { Card } from "antd";
import { Rate } from "antd";
import { formatCurrency } from "../../helpers";
type Props = {};
const items: MenuProps["items"] = [
    {
        key: "1",
        label: "Mới nhất",
    },
    {
        key: "2",
        label: "Thứ tự theo giá: thấp đến cao",
    },
    {
        key: "3",
        label: "Thứ tự theo giá: cao xuống thấp",
    },
];

const ShopEarphone = (props: Props) => {
    const [selectedLabel, setSelectedLabel] = useState("Mới nhất");

    const [displayedProducts, setDisplayedProducts] = useState<any[]>([]);
    const fetchProducts = async () => {
        await fetch(
            `http://localhost:3000/api/v1/products?category=marshall-tainghe`
        )
            .then((data) => {
                // console.log(data);
                return data.json();
            })
            .then((res) => {
                setDisplayedProducts(res.data);
            });
    };

    useEffect(() => {
        fetchProducts();
    }, []);
    return (
        <div>
            <Header />
            <div
                style={{
                    padding: "20px 80px",
                    backgroundColor: "rgb(246,246,246)",
                }}
            >
                <Breadcrumb
                    className="text-lg font-semibold"
                    items={[
                        {
                            title: <Link to="/">Trang chủ </Link>,
                        },
                        {
                            title: (
                                <Link style={{ color: "black" }} to="">
                                    TAI NGHE MARSHALL
                                </Link>
                            ),
                        },
                    ]}
                />
                <div
                    className="flex gap-8 p-3 mt-5"
                    style={{ backgroundColor: "#FFFFFF", borderRadius: "10px" }}
                >
                    <div style={{ width: "12%" }} className="text-center">
                        <img
                            style={{ width: "100%" }}
                            src="https://marshallstorevietnam.vn/wp-content/uploads/2023/03/all-02a-in-ear_1.png"
                            alt=""
                        />
                        <h3 className="mt-4 font-semibold">IN-EAR</h3>
                    </div>
                    <div style={{ width: "12%" }} className="text-center">
                        <img
                            style={{ width: "100%" }}
                            src="	https://marshallstorevietnam.vn/wp-content/uploads/2023/03/all-02b-on-ear_1.png"
                            alt=""
                        />
                        <h3 className="mt-4 font-semibold">ON-EAR</h3>
                    </div>
                    <div style={{ width: "12%" }} className="text-center">
                        <img
                            style={{ width: "100%" }}
                            src="https://marshallstorevietnam.vn/wp-content/uploads/2023/03/all-02b-over-ear-_1_.png"
                            alt=""
                        />
                        <h3 className="mt-4 font-semibold">OVER-EAR </h3>
                    </div>
                    <div style={{ width: "12%" }} className="text-center">
                        <img
                            style={{ width: "100%" }}
                            src="	https://marshallstorevietnam.vn/wp-content/uploads/2023/03/all-02b-over-ear-_1_-1.png"
                            alt=""
                        />
                        <h3 className="mt-4 font-semibold">TRUE WIRELESS</h3>
                    </div>
                </div>
                <div className="flex justify-between items-center mt-7">
                    <h4 className="text-3xl font-bold">TAI NGHE MARSHALL </h4>
                    <Dropdown
                        className="h-10 "
                        menu={{
                            items: items.map((item: any) => ({
                                key: item.key,
                                label: (
                                    <a
                                        onClick={() =>
                                            setSelectedLabel(item.label)
                                        }
                                    >
                                        {item.label}
                                    </a>
                                ),
                            })),
                        }}
                        placement="bottomLeft"
                    >
                        <Button>
                            {selectedLabel}
                            <i className="fa-solid fa-chevron-down text-sm ml-3"></i>
                        </Button>
                    </Dropdown>
                </div>
                <div className="flex flex-wrap gap-[26px] mt-7">
                    {displayedProducts &&
                        displayedProducts.map((e, i) => (
                            <div key={i} className=" mb-8">
                                <Card
                                    hoverable
                                    style={{ width: 320, position: "relative" }}
                                    cover={
                                        <img
                                            alt="example"
                                            src={
                                                e.media_source &&
                                                e.media_source.split(",")[0]
                                            }
                                        />
                                    }
                                >
                                    <p
                                        style={{
                                            position: "absolute",
                                            top: "4%",
                                            backgroundColor: "rgb(15,0,0)",
                                            color: "#fff",
                                            width: "50px",
                                            borderRadius: "12px",
                                            textAlign: "center",
                                            fontWeight: 600,
                                            fontSize: "13px",
                                        }}
                                    >
                                        -{e.sale}%
                                    </p>
                                    <div>
                                        <h3 className="font-bold mb-3">
                                            {e.name}
                                        </h3>
                                        <p
                                            style={{
                                                color: "#a5a5a5",
                                                marginBottom: "8px",
                                            }}
                                        >
                                            LOA MARSHALL, LOA NGHE TRONG NHÀ
                                        </p>
                                        <Rate
                                            className="mb-3"
                                            disabled
                                            defaultValue={5}
                                        />
                                        <div className="flex gap-2 mb-5">
                                            <span
                                                style={{
                                                    color: "#bbb",
                                                    textDecoration:
                                                        "line-through",
                                                }}
                                            >
                                                {formatCurrency(e.price)}
                                            </span>
                                            <span
                                                style={{
                                                    color: "rgb(15,0,0)",
                                                    fontWeight: "600",
                                                }}
                                            >
                                                {formatCurrency(
                                                    e.sale
                                                        ? e.price -
                                                              e.price *
                                                                  (e.sale / 100)
                                                        : e.price
                                                )}
                                            </span>
                                        </div>
                                        <Link to={`/detail/${e.product_id}`}>
                                            <button className="w-full h-10 bg-zinc-900 text-white rounded-md">
                                                Lựa chọn các tùy chọn
                                            </button>
                                        </Link>
                                    </div>
                                </Card>
                            </div>
                        ))}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ShopEarphone;
