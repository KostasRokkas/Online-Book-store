import React, { useState, useEffect, useRef } from "react";
import { useLocation, useParams } from "react-router-dom";
import { createUseStyles } from "react-jss";
import { books } from "../books";
import CustomCarousel from "../components/Carousel";
import Footer from "../components/Footer";
import AddBook from "./AddBook";

const styles = createUseStyles({
  Category: {
    display: "grid",
    gridTemplateRows: "repeat(3, max-content) 1fr",
    padding:"0.8rem",
    gap: "2rem",
  },
  notFound: {
    display: "grid",
    justifyContent: "center",
    color: "red",
  },
  firstRow: {
    display: "grid",
    gridTemplateRows: "1fr max-content",
  },
  path: {
    alignContent: "center",
    justifySelf: "center",
    padding: "0.8rem",
    opacity: "0.4",
  },
  buttonContainer: {
    display: "grid",
    justifyContent: "center",
    paddingRight: "5rem",
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
  bookDetailsContainer: {
    display: "grid",
    gridTemplateRows: "repeat(2, max-content)",
    justifyContent:"center",
    gap: "1rem",
  },
  bookImage: {
    display: "grid",
    justifySelf: "end",
    alignContent: "center",
    textAlign: "center",
    maxWidth: "100%",
  },
  bookDetails: {
    display: "grid",
    justifyItems: "center",
    textAlign: "center",
  },
  authorName: {
    display: "grid",
    justifyContent: "center",
    textAlign: "center",
  },
  otherBooksContainer: {
    display: "grid",
    gridTemplateRows: "repeat(3, max-content)",
  },
  header: {
    display: "grid",
  },
  otherBooksPicturesContainer: {
    display: "grid",
    gridTemplateRows: "repeat(2, max-content)",
    justifyItems: "center",
    gap: "1rem",
  },
  img: {
    width: "100%",
  },
  title: {
    display: "grid",
    textAlign: "center",
    width: "100%",
  },
  [`@media screen and (min-width: 1200px)`]: {
    firstRow: {
      gridTemplateColumns: "1fr max-content",
    },
    path: {
      justifySelf: "start",
      alignContent: "center",
      paddingLeft: "5rem",
      opacity: "0.4",
    },
    bookDetailsContainer: {
      gridTemplateColumns: "repeat(2, 1fr)",
    },
    bookDetails: {
      display: "grid",
      justifyItems: "left",
    },
  },
});

const Category: React.FC = () => {
  const classes = styles();
  const { isbn } = useParams<{ isbn: string }>(); // Extract isbn parameter from URL
  const [showAddModal, setShowAddModal] = useState(false);
  const bookDetailsRef = useRef<HTMLDivElement>(null);

  const location = useLocation(); // Get current location object
  const currentPath = location.pathname.substring(1).toUpperCase();

  // Find the book inside data based on isbn
  const book = books.find((book) => book.isbn === isbn);

  useEffect(() => {
    // Scroll to the top of the book details section
    if (bookDetailsRef.current) {
      bookDetailsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [book]); // Scroll when book changes

  if (!book) {
    return <div className={classes.notFound}><h2>Book not found!</h2></div>;
  }

  return (
    <div className={classes.Category} ref={bookDetailsRef}>
        <div className={classes.path}>
          <strong>{currentPath}</strong>
      </div>
      <div className={classes.bookDetailsContainer} >
        <div className={classes.bookImage}>
          <img className={classes.img} src={`${process.env.PUBLIC_URL}/logo512.png`} alt="Book Cover" />
        </div>
        <div className={classes.bookDetails}>
          <h2>{book.title}</h2>
          <p>Author: {book.author}</p>
          <p>Publisher: {book.publisher}</p>
          <p>Pages: {book.pages}</p>
          <p>Published: {new Date(book.published).toLocaleDateString()}</p>
          <p style={{ width: "20rem", textAlign: "left" }}>Description: {book.description}</p>
          <a href={book.website}>Visit Website</a>
        </div>
      </div>

      <div className={classes.authorName}>
        <h3>{book.author}</h3>
      </div>

      <div className={classes.otherBooksPicturesContainer}>
        <div className={classes.title}>
          <h3>Other books you may like</h3>
        </div>
        <CustomCarousel books={books.map((book) => book)} />
      </div>
      <Footer />
    </div>
  );
};

export default Category;
