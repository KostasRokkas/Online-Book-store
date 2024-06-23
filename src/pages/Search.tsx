import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createUseStyles } from "react-jss";
import CustomCarousel from "../components/Carousel";
import Footer from "../components/Footer";
import AddBook from "./AddBook";

/**
 * Represents a book object with detailed information.
 */
interface Book {
    isbn: string;
    title: string;
    subtitle: string;
    author: string;
    published: string;
    publisher: string;
    pages: number;
    description: string;
    website: string;
}

/**
 * Props interface for the Homepage component.
 * Specifies an array of book objects to display or interact with.
 * @property {Book[]} books - Array of book objects
 */
interface SearchProps {
    books: Book[];
}

const useStyles = createUseStyles({
    Search: {
        display: "grid",
        gridTemplateRows: ({ filters }: { filters: boolean }) =>
            filters ? "repeat(3, max-content) 1fr" : "repeat(2, max-content) 1fr",
    },
    firstRow: {
        display: "grid",
        gridTemplateRows: "1fr max-content",
        alignItems: "center",
    },
    path: {
        alignContent: "center",
        justifySelf: "center",
        padding: "0.8rem",
        opacity: "0.4"
    },
    filterButtonContainer: {
        display: "grid",
        justifyContent: "center",
        paddingRight: "4rem",
        height: "2rem",
    },
    button: {
        border: "solid 1px #00b0da",
        backgroundColor: "#00b0da",
        color: "white",
        borderRadius: "4px",
        cursor: "pointer",
        transition: "background-color 0.3s ease",
        "&:hover": {
            backgroundColor: "white",
            color: "#0081a7",
        },
    },
    filtersContainer: {
        display: "grid",
        gridTemplateRows: "1fr",
    },
    filters: {
        display: "grid",
        gridTemplateColumns: "1fr",
        justifySelf: "center",
        padding: "0.8rem",
        background: "#00b0da",
        width: "100%",
    },
    inputGroup: {
        display: "grid",
        gridGap: "0.4rem",
        padding: "0.6rem",
        "& label": {
            fontWeight: "bold",
        },
        "& input, select": {
            boxSizing: "border-box",
            width: "100%",
            height: "2rem",
            border: "1px solid #ccc",
            borderRadius: "4px",
            padding: "0.4rem",
        },
    },
    [`@media screen and (min-width: 650px)`]: {
        firstRow: {
            gridTemplateColumns: "1fr max-content"
        },
        path: {
            justifySelf: "start",
            alignContent: "center",
            paddingLeft: "5rem",
            opacity: "0.4"
        },
        filters: {
            gridTemplateColumns: "repeat(2, 1fr)",
        },
    }
});

/**
 * Search component for filtering and displaying books.
 * 
 * @param {SearchProps} props - Props for the Search component.
 * @param {Book[]} props.books - Array of book objects to display and filter.
 */
const Search: React.FC<SearchProps> = ({ books }) => {
    const [filters, setFilters] = useState(false);
    const classes = useStyles({ filters });
    const [filteredData, setFilteredData] = useState<Book[]>(books);
    const [showAddModal, setShowAddModal] = useState(false);

    const location = useLocation(); // Get current location object
    const currentPath = location.pathname.substring(1).toUpperCase();


    const formik = useFormik({
      initialValues: {
          title: "",
          publisher: "",
          year: "",
          author: ""
      },
      validationSchema: Yup.object({
          title: Yup.string(),
          publisher: Yup.string(),
          year: Yup.number(),
          author: Yup.string()
      }),
      onSubmit: values => {
          // no onSubmit logic because useEffect handle the searching
      },
  });

    /**
     * @description Filter books based on the filter criteria
     * @param {Book[]} books The list of books to filter
     * @param {object} filterCriteria The criteria to filter books
     * @param {string} filterCriteria.title The title to filter by
     * @param {string} filterCriteria.publisher The publisher to filter by
     * @param {string} filterCriteria.year The year to filter by
     * @param {string} filterCriteria.author The author to filter by
     * @returns {Book[]} The filtered list of books
     */
    useEffect(() => {
        setFilteredData(
            books.filter((book) =>
                (formik.values.title ? book.title.toLowerCase().includes(formik.values.title.toLowerCase()) : true) &&
                (formik.values.publisher ? book.publisher.toLowerCase().includes(formik.values.publisher.toLowerCase()) : true) &&
                (formik.values.year ? book.published.includes(formik.values.year) : true) &&
                (formik.values.author ? book.author.toLowerCase().includes(formik.values.author.toLowerCase()) : true)
            )
        );
    }, [formik.values, books]);

    return (
        <div className={classes.Search}>
            <div className={classes.firstRow}>
                <div className={classes.path}>
                    <strong>{currentPath}</strong>
                </div>
                <div className={classes.filterButtonContainer}>
                    <button
                        className={classes.button}
                        onClick={() => setFilters((p) => !p)}
                    >
                        <strong>{filters ? "Hide Filters" : "Show Filters"}</strong>
                    </button>
                </div>
            </div>
            <div className={classes.filtersContainer}>
                {filters && (
                    <form onSubmit={formik.handleSubmit} className={classes.filters}>
                        <div className={classes.inputGroup}>
                            <label>Title</label>
                            <input
                                type="text"
                                name="title"
                                onChange={formik?.handleChange}
                                value={formik?.values?.title}
                            />
                        </div>
                        <div className={classes.inputGroup}>
                            <label>Publisher</label>
                            <input
                                type="text"
                                name="publisher"
                                onChange={formik?.handleChange}
                                value={formik?.values?.publisher}
                            />
                        </div>
                        <div className={classes.inputGroup}>
                            <label>Year</label>
                            <input
                                type="date"
                                name="year"
                                onChange={formik?.handleChange}
                                value={formik?.values?.year}
                            />
                        </div>
                        <div className={classes.inputGroup}>
                            <label>Author</label>
                            <input
                                type="text"
                                name="author"
                                onChange={formik?.handleChange}
                                value={formik?.values?.author}
                            />
                        </div>
                    </form>
                )}
            </div>
            <CustomCarousel books={filteredData} />
            <Footer />
            {showAddModal && (
                <AddBook onClose={() => setShowAddModal(false)} />
            )}
        </div>
    );
};

export default Search;
