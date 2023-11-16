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

const IndoorSpeakers = (props: Props) => {
    const [selectedLabel, setSelectedLabel] = useState("Mới nhất");

    const [productsLoudspeaker, setProductsLoudspeaker] = useState<any[]>([]);
    const fetchProducts = async () => {
        let responseLoudspeaker = await fetch(
            `http://localhost:3000/api/v1/products?category=marshall-loatrongnha`
        );
        let dataLoudspeaker = await responseLoudspeaker.json();
        setProductsLoudspeaker(dataLoudspeaker.data);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const [sortOrder, setSortOrder] = useState("");
    const sortProducts = (products: any, sortOrder: string) => {
        const sortedProducts = [...products];

        sortedProducts.sort((a, b) => {
            const priceA = a.sale
                ? a.price - a.price * (a.sale / 100)
                : a.price;
            const priceB = b.sale
                ? b.price - b.price * (b.sale / 100)
                : b.price;

            if (sortOrder === "asc") {
                return priceA - priceB;
            } else {
                return priceB - priceA;
            }
        });

        return sortedProducts;
    };

    useEffect(() => {
        const sortedLoudspeakerProducts = sortProducts(
            productsLoudspeaker,
            sortOrder
        );
        setProductsLoudspeaker(sortedLoudspeakerProducts);
    }, [sortOrder]);

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
    return (
        <div>
            {" "}
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
                                <Link
                                    style={{ color: "black" }}
                                    to="/loa-marshall"
                                >
                                    LOA MARSHALL
                                </Link>
                            ),
                        },
                        {
                            title: (
                                <Link style={{ color: "black" }} to="">
                                    LOA NGHE TRONG NHÀ
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
                        <Link to="/loa-marshall/loa-di-dong">
                            <img
                                style={{ width: "100%" }}
                                src="https://marshallstorevietnam.vn/wp-content/uploads/2023/03/Middleton_Category-page_2-column-banner_desktop.png"
                                alt=""
                            />
                            <h3 className="mt-4 font-semibold">LOA DI ĐỘNG </h3>
                        </Link>
                    </div>
                    <div style={{ width: "12%" }} className="text-center">
                        <img
                            style={{ width: "100%" }}
                            src="	https://marshallstorevietnam.vn/wp-content/uploads/2023/03/2-col-home-family-both.png"
                            alt=""
                        />
                        <h3 className="mt-4 font-semibold">
                            LOA NGHE TRONG NHÀ{" "}
                        </h3>
                    </div>
                    <div style={{ width: "12%" }} className="text-center">
                        <img
                            style={{ width: "100%" }}
                            src="https://marshallstorevietnam.vn/wp-content/uploads/2023/03/Untitled-1-a.png"
                            alt=""
                        />
                        <h3 className="mt-4 font-semibold">LIMITED EDITION </h3>
                    </div>
                </div>
                <div className="flex justify-between items-center mt-7 mb-7">
                    <h4 className="text-3xl font-bold">LOA NGHE TRONG NHÀ</h4>
                    <Dropdown
                        className="h-10 "
                        menu={{
                            items: items.map((item: any) => ({
                                key: item.key,
                                label: (
                                    <a
                                        onClick={() => {
                                            setSelectedLabel(item.label);
                                            if (item.key === "2") {
                                                setSortOrder("asc");
                                            } else if (item.key === "3") {
                                                setSortOrder("desc");
                                            }
                                        }}
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
                <div className="flex flex-wrap gap-[26px] mt-2">
                    {productsLoudspeaker.map((e, i) => (
                        <div key={i} className=" mb-8">
                            <Card
                                hoverable
                                style={{ width: 320, position: "relative" }}
                                cover={
                                    <img
                                        style={{ height: "327px" }}
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
                                    <h3 className="font-bold mb-3">{e.name}</h3>
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
                                                textDecoration: "line-through",
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

export default IndoorSpeakers;
