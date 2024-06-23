import React from "react";
import { useNavigate } from "react-router-dom";
import { createUseStyles } from "react-jss";

/**
 * @description Props interface for CustomCarousel component
 */
interface CustomCarouselProps {
    books: {
        isbn: string;
        title: string;
        subtitle: string;
        author: string;
        published: string;
        publisher: string;
        pages: number;
        description: string;
        website: string;
    }[];
}

const styles = createUseStyles({
    carouselContainer: {
        display: "grid",
        justifyItems:"center",
        gap: "1rem",
        padding: "1rem",
        width:"100%",
        "@media screen and (min-width: 600px)": {
            gridTemplateColumns: "repeat(2, 1fr)",
        },
        "@media screen and (min-width: 1024px)": {
            gridTemplateColumns: "repeat(3, 1fr)",
        },
        "@media screen and (min-width: 1200px)": {
            gridTemplateColumns: "repeat(4, 1fr)",
        },
    },
    carouselItem: {
        display: "grid",
        alignItems: "center",
        justifyItems: "center",
        maxWidth:"15rem",
        textAlign: "center",
        padding: "1rem",
        borderRadius: "8px",
        boxSizing: "border-box",
        cursor: "pointer",
    },
    carouselImage: {
        maxWidth: "100%",
        height: "auto",
        borderRadius: "8px",
    },
    carouselDetailsInfo: {
        marginTop: "1rem",
    },
    carouselTitle: {
        fontSize: "1rem",
        fontWeight: "bold",
        margin: "0.5rem 0",
    },
});

/**
 * @description CustomCarousel component displays a grid of books with clickable items.
 *              Each item shows the book title and redirects to its details page upon click.
 * @param books Array of books to be displayed in the carousel.
 */
const CustomCarousel: React.FC<CustomCarouselProps> = ({ books }) => {
    const classes = styles();
    const navigate = useNavigate();

    /**
     * Handles click event on a book item in the carousel.
     * Navigates to the details page of the selected book.
     * @param book The book object representing the clicked carousel item.
     */
    const handleClick = (book: CustomCarouselProps["books"][0]) => {
        navigate(`/category/${book.isbn}`, { state: { book } });
    };

    return (
        <div className={classes.carouselContainer}>
            {books.map((book, index) => (
                <div className={classes.carouselItem} key={index} onClick={() => handleClick(book)}>
                    <img className={classes.carouselImage} src={`${process.env.PUBLIC_URL}/logo512.png`} alt="Book Cover" />
                    <div className={classes.carouselDetailsInfo}>
                        <h3 className={classes.carouselTitle}>{book.title}</h3>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default CustomCarousel;
