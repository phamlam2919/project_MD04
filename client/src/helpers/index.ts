export const formatCurrency = (price: number): string => {
    const formattedPrice = price.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
    });
    return formattedPrice;
};
