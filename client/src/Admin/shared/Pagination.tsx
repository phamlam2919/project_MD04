import React from "react";

interface PaginationProps {
    total: number;
    pageNumber: number;
    handleChangePage: (pageIndex: number) => void;
    currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({
    total,
    pageNumber,
    handleChangePage,
    currentPage,
}) => {
    const toArray = (number: number) => {
        let arr = [];
        for (let i = 0; i < number; i++) {
            arr.push("");
        }
        return arr;
    };

    return (
        <div className="mt-4 flex justify-end">
            <nav aria-label="">
                <ul className="flex">
                    <li
                        className={`page-item ${
                            currentPage === 1 ? "disabled" : ""
                        }`}
                    >
                        <button
                            className="page-link px-4 py-2 rounded-l"
                            onClick={() => handleChangePage(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            <i className="fa-solid fa-arrow-left"></i>
                        </button>
                    </li>
                    {toArray(Math.ceil(total / pageNumber)).map((_, i) => (
                        <li
                            className={`page-item ${
                                currentPage === i + 1 ? "active" : ""
                            }`}
                            key={i}
                        >
                            <button
                                className={`page-link px-4 py-2 ${
                                    currentPage === i + 1
                                        ? "bg-blue-500 text-white"
                                        : "hover:bg-blue-200"
                                }`}
                                onClick={() => handleChangePage(i + 1)}
                            >
                                {i + 1}
                            </button>
                        </li>
                    ))}

                    <li
                        className={`page-item ${
                            currentPage === Math.ceil(total / pageNumber)
                                ? "disabled"
                                : ""
                        }`}
                    >
                        <button
                            className="page-link px-4 py-2 rounded-r"
                            onClick={() => handleChangePage(currentPage + 1)}
                            disabled={
                                currentPage === Math.ceil(total / pageNumber)
                            }
                        >
                            <i className="fa-solid fa-arrow-right"></i>
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Pagination;
