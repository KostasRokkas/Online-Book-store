import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { createUseStyles } from "react-jss";
import Navbar from "./components/Navbar";
import Category from "./pages/Category";
import Homepage from "./pages/Homepage";
import Search from "./pages/Search";
import { books } from "./books"; 

const useStyles = createUseStyles({
    App: {
        display: "grid",
        gridTemplateRows: " max-content 1fr",
        height: "100vh",
        overflow: "hidden",
    },
    navbar: { display: "block" },
    addButtonContainer:{
        display:"grid",
        justifyContent:"center",
        padding:"0.8rem",
        height:"2rem"
    },
    addButton:{
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
    mainContainer: {
        display: "grid",
        gridTemplateRows:"max-content 1fr",
        padding: "1rem",
        overflow: "auto",
        position:"relative"
    },
    [`@media screen and (min-width: 700px)`]: {
        addButtonContainer: {
          justifyContent: "end",
        },
        
    }
});

const links = [
    {
        title: "Homepage",
        id: "Homepage",
        path: "/homepage",
        element: <Homepage books={books} />,
    },
    {
        title: "Category",
        id: "Category",
        path: "/category/:isbn", 
        element: <Category />,
    },
    {
        title: "Search",
        id: "Search",
        path: "/search",
        element: <Search books={books} />,
    },
];

const App: React.FC = () => {
    const classes = useStyles();
    const [showAddModal, setShowAddModal] = useState(false)

    

    return (
        <Router>
            <div className={classes.App}>
                <div className={classes.navbar}>
                    <Navbar links={links} />
                </div>
                <div className={classes.mainContainer}>
                    <Routes>
                        {links.map((link, idx) => (
                            <Route key={idx} path={link.path} element={link.element} />
                        ))}
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;
