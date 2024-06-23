import React, { useState, useRef, ChangeEvent } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createUseStyles } from "react-jss";

// Define the Book interface
interface Book {
  isbn: string;
  title: string;
  author: string;
  published: string;
  publisher: string;
  pages: number;
  description: string;
  website: string;
  image?: File; // Allow image to be File or undefined
}

const styles = createUseStyles({
  "@keyframes slidein": {
    from: {
      background: "rgba(0,0,0,0)",
      backdropFilter: "blur(0px)",
    },
    to: {
      background: "rgba(0,0,0,0.3)",
      backdropFilter: "blur(5px)",
    },
  },

  AddBook: {
    display: "grid",
    position: "fixed",
    width: "100vw",
    height: "100vh",
    top: 0,
    left: 0,
    zIndex: 5,
    placeContent: "center",
    background: "rgba(0,0,0,0.3)",
    backdropFilter: "blur(5px)",
    animationDuration: ".5s",
    animationName: "$slidein",
  },
  modalCard: {
    position: "relative",
    display: "grid",
    gridTemplateRows: "max-content 1fr max-content",
    background: "white",
    boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.12)",
    width: "100%",
    height: "100%",
    borderRadius: "5px",
    maxHeight: "80vh",
    minWidth: "70vw",
    maxWidth: "90vw",
  },
  modalCardHeader: {
    borderBottom: `2px solid #00b0da`,
    display: "grid",
    gridTemplateColumns: "1fr auto",
    alignItems: "center",
    padding: "0.8rem",
    gridGap: "0.8rem",
    fontSize: "x-large",
    color: "#00b0da",
    background: "white",
  },
  modalCardBody: {
    display: "grid",
    padding: "1.5rem",
    maxWidth: "90vw",
    minWidth: "70vw",
    minHeight: "30vh",
    maxHeight: "70vh",
    overflow: "auto",
    background: "white",
  },
  card: {
    display: "grid",
    gridTemplateRows: "1fr auto",
    alignItems: "center",
    padding: "0.8rem",
    gridGap: "0.8rem",
    fontSize: "x-large",
    color: "#00b0da",
  },
  cardHeader: {
    borderBottom: `2px solid #00b0da`,
    display: "grid",
    gridTemplateColumns: "1fr auto",
    alignItems: "center",
    padding: "0.8rem",
    gridGap: "0.8rem",
    fontSize: "x-large",
    color: "#00b0da",
  },
  cardBody: {
    display: "grid",
    padding: "1.5rem",
    minHeight: "30vh",
    maxHeight: "70vh",
  },
  modalCardActions: {
    display: "grid",
    gridGap: "0.8rem",
    gridTemplateRows: "repeat(2,max-content)",
    justifyContent: "start",
    padding: "0.8rem",
  },
  form: {
    display: "grid",
    gridTemplateRows: "1fr max-content",
  },
  body: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: "1rem",
  },
  inputGroup: {
    display: "grid",
    gridColumn: "2 span",
    gridGap: "0.4rem",
    padding: "0.6rem",
    "& label": {
      fontWeight: "bold",
    },
    "& input, textarea, select": {
      boxSizing: "border-box",
      width: "100%",
      height: "2rem",
      border: "1px solid #ccc",
      borderRadius: "4px",
      padding: "0.4rem",
    },
  },
  inputGroupOneLine: {
    extend: "inputGroup",
    gridColumn: "2 span",
  },
  actions: {
    display: "grid",
    gridTemplateColumns: "repeat(2, max-content)",
    gap: "1rem",
  },
  submitButton: {
    display: "grid",
    gridTemplateColumns: "repeat(2,max-content)",
    justifyContent: "right",
    gap: "1rem",
    marginTop: "1rem",
  },
  button: {
    justifySelf: "start",
    border: "solid 1px #00b0da",
    backgroundColor: "#00b0da",
    color: "white",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    height: "2rem",
    "&:hover": {
      backgroundColor: "white",
      color: "#0081a7",
    },
  },
  addedImg: {
    width: "100%",
    height: "auto",
    marginTop: "0.5rem",
    "& img": {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
  },
  buttonContainer: {
    display: "grid",
  },
  deleteButton: {
    extend: "button",
    border: "solid 1px red",
    backgroundColor: "red",
    "&:hover": {
      backgroundColor: "white",
      color: "red",
    },
  },
  bookList: {
    display: "grid",
    gridTemplateRows: "max-content 1fr",
  },
  book:{
    display:"grid",
    gridAutoFlow:"column",
    width:"max-content",
    gap:"2rem",
  },
  addButton: {
    justifySelf: "start",
    padding: "0.8rem",
  },
  [`@media screen and (min-width: 550px)`]: {
    body: {
      gridTemplateColumns: "1fr 1fr",
    },
    inputGroup: {
      gridColumn: "1 span",
    },
  },
  validationError: {
    color:"red",
  },
  [`@media screen and (min-width: 300px)`]: {
    addButton: {
      justifySelf: "end",
    },
    modalCardActions: {
      gridTemplateColumns: "repeat(2,max-content)",
      justifyContent: "end",
    },
    button: {
      justifySelf: "end",
    },
  },
});

// Props interface for AddBook component
interface AddBookProps {
  onClose: () => void;
}

// Validation schema using Yup
const validationSchema = Yup.object({
  isbn: Yup.string().matches(/^\d{10}$/, {
    message: "Must be exactly 10 digits",
    excludeEmptyString: true,
  }),
  title: Yup.string()
    .min(10, "Must be at least 10 characters")
    .max(120, "Must be at most 120 characters")
    .required("Title is required"),
  author: Yup.string().required("Author is required"),
  published: Yup.date().required("Published date is required"),
  publisher: Yup.string()
    .min(5, "Must be at least 5 characters")
    .max(60, "Must be at most 60 characters")
    .required("Publisher is required"),
  pages: Yup.number()
    .required("Pages are required")
    .positive("Must be a positive number")
    .integer("Must be an integer")
    .max(9999, "Must be at most 9999 pages"),
  description: Yup.string()
    .required("Description is required")
    .matches(/^[A-Z].*/, "Description must start with an uppercase letter")
    .max(512, "Must be at most 512 characters"),
  website: Yup.string()
    .url("Must be a valid URL")
    .required("Website is required"),
});

const AddBook: React.FC<AddBookProps> = ({ onClose }) => {
  const classes = styles();
  const [newBooks, setNewBooks] = useState<Book[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formik = useFormik({
    initialValues: {
      isbn: "",
      title: "",
      author: "",
      published: "",
      publisher: "",
      pages: 0,
      description: "",
      website: "",
      image: undefined,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const newBook: Book = {
        ...values,
        image: values.image,
      };

      setNewBooks((p) => [...p, newBook]);
      formik.resetForm();

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    },
  });

  const handleImageSelection = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedImage = e.target.files[0];
      formik.setFieldValue("image", selectedImage);
    }
  };

  const handleRemoveImage = () => {
    formik.setFieldValue("image", undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleFinalSubmit = () => {
    if (newBooks.length > 0) {
      console.log("Submitting all books:", [...newBooks, formik.values]);
      // Perform actual submission logic (e.g., API call)
      setNewBooks([]);
    } else {
      console.log("Submitting only the current book:", [formik.values]);
    }

    formik.resetForm();
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDeleteBook = (index: number) => {
    setNewBooks((p) => {
      const updatedBooks = [...p];
      updatedBooks.splice(index, 1);
      return updatedBooks;
    });
  };

  return (
    <div className={classes.AddBook}>
      <div className={classes.modalCard}>
        <div className={classes.modalCardHeader}>Add a New Book</div>
        <div className={classes.modalCardBody}>
          <div className={classes.card}>
            <div className={classes.cardBody}>
              <form className={classes.form} onSubmit={formik.handleSubmit}>
                <div className={classes.body}>
                  <div className={classes.inputGroup}>
                    <label htmlFor="isbn">ISBN</label>
                    <input
                      type="text"
                      id="isbn"
                      name="isbn"
                      value={formik.values.isbn}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      required
                    />
                    {formik.touched.isbn && formik.errors.isbn ? (
                      <div className={classes.validationError}>{formik.errors.isbn}</div>
                    ) : null}
                  </div>
                  <div className={classes.inputGroup}>
                    <label htmlFor="title">Title</label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formik.values.title}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      required
                    />
                    {formik.touched.title && formik.errors.title ? (
                      <div className={classes.validationError}>{formik.errors.title}</div>
                    ) : null}
                  </div>
                  <div className={classes.inputGroup}>
                    <label htmlFor="author">Author</label>
                    <input
                      type="text"
                      id="author"
                      name="author"
                      value={formik.values.author}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      required
                    />
                    {formik.touched.author && formik.errors.author ? (
                      <div className={classes.validationError}>{formik.errors.author}</div>
                    ) : null}
                  </div>
                  <div className={classes.inputGroup}>
                    <label htmlFor="published">Published</label>
                    <input
                      type="date"
                      id="published"
                      name="published"
                      value={formik.values.published}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      required
                    />
                    {formik.touched.published && formik.errors.published ? (
                      <div className={classes.validationError}>{formik.errors.published}</div>
                    ) : null}
                  </div>
                  <div className={classes.inputGroup}>
                    <label htmlFor="publisher">Publisher</label>
                    <input
                      type="text"
                      id="publisher"
                      name="publisher"
                      value={formik.values.publisher}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      required
                    />
                    {formik.touched.publisher && formik.errors.publisher ? (
                      <div className={classes.validationError}>{formik.errors.publisher}</div>
                    ) : null}
                  </div>
                  <div className={classes.inputGroup}>
                    <label htmlFor="pages">Pages</label>
                    <input
                      type="number"
                      id="pages"
                      name="pages"
                      value={formik.values.pages}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      required
                    />
                    {formik.touched.pages && formik.errors.pages ? (
                      <div className={classes.validationError}>{formik.errors.pages}</div>
                    ) : null}
                  </div>
                  <div className={classes.inputGroupOneLine}>
                    <label htmlFor="description">Description</label>
                    <textarea
                      id="description"
                      name="description"
                      value={formik.values.description}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      required
                    />
                    {formik.touched.description && formik.errors.description ? (
                      <div className={classes.validationError}>{formik.errors.description}</div>
                    ) : null}
                  </div>
                  <div className={classes.inputGroupOneLine}>
                    <label>Select Image</label>
                    <input
                      type="file"
                      accept="image/jpeg, image/png, image/jpg"
                      onChange={handleImageSelection}
                      ref={fileInputRef}
                    />
                    {formik.values.image && (
                      <div className={classes.addedImg}>
                        <img src={URL.createObjectURL(formik.values.image)} alt="Book" />
                        <div className={classes.buttonContainer}>
                          <button
                            type="button"
                            className={classes.deleteButton}
                            onClick={handleRemoveImage}
                          >
                            <strong>Remove Image</strong>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className={classes.inputGroup}>
                    <label htmlFor="website">Website</label>
                    <input
                      type="text"
                      id="website"
                      name="website"
                      value={formik.values.website}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      required
                    />
                    {formik.touched.website && formik.errors.website ? (
                      <div className={classes.validationError}>{formik.errors.website}</div>
                    ) : null}
                  </div>
                </div>
                <div className={classes.addButton}>
                  <button className={classes.button} type="submit">
                    <strong>Add Book</strong>
                  </button>
                  </div>
                {newBooks.length > 0 && (
                      <div className={classes.bookList}>
                        <h3>Added Books:</h3>
                        <div className={classes.book}>
                          {newBooks.map((book, index) => (
                            <div key={index}>
                              {book.title}{" "}
                              <button
                                type="button"
                                className={classes.deleteButton}
                                onClick={() => handleDeleteBook(index)}
                              >
                                <strong>X</strong>
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                <div className={classes.modalCardActions}>
                  <button
                    type="button"
                    className={classes.button}
                    onClick={onClose}
                  >
                    <strong>Close</strong>
                  </button>
                  <button
                          type="button"
                          className={classes.button}
                          onClick={handleFinalSubmit}
                        >
                          <strong>Submit All</strong>
                        </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBook;
