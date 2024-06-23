import React, { useState } from "react";
import { createUseStyles } from "react-jss";
import { useNavigate } from "react-router-dom";
import AddBook from "../pages/AddBook";

/**
 * @description Props interface for Link component
 */
interface LinkProps {
    link: {
      title: string;
      id: string;
      path: string;
      element: JSX.Element;
    };
    onClick: () => void;
  }
  
  const LinkStyle = () => ({
      display: "grid",
      justifyContent:"center",
    padding: "0.7rem",
    cursor: "pointer",
    background: "none",
    color: "white",
    textDecoration:"none",
    "&:hover": {
      borderTop: "solid 2px white",
      backgroundColor: "#6CB4EE",
      color: "white",
    },
  });
  
  const linkStyles = createUseStyles({
    Link: LinkStyle,
    linkBody: { display: "none" },
    active: {
      color: "#00b0da", 
      fontWeight: "bold", 
    },
    
  });
  
  /**
 * @description Link component renders a clickable anchor element.
 * @param link The link object containing title, id, path, and element to render.
 * @param onClick Function to execute when the link is clicked.
 */
  const Link: React.FC<LinkProps> = ({ link, onClick }) => {
    const classes = linkStyles();
  
    return (
      <React.Fragment>
        <a
          href={link.path}
          className={`${classes.Link} `}
          onClick={(e) => {
            e.preventDefault();
            onClick();
          }}
        >
          <strong>{link.title}</strong>
        </a>
      </React.Fragment>
    );
  };
  
  /**
 * @description Props interface for Navbar component
 */
  interface NavbarProps {
    links: {
      title: string;
      id: string;
      path: string;
      element: JSX.Element;
    }[];
  }
  
  const navbarStyles = createUseStyles({
    Navbar: {
      display: "grid",
    gridTemplateRows: "repeat(2, max-content)",
      backgroundColor: "#6CB4EE",
      padding: "1.5rem",
      boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.12)",
      boxSizing: "border-box",
      
    },
    header: {
      display:"grid",
      justifyContent:"center",
      textAlign: "left",
      color: "black",
    },
    links: {
        display: "grid",
        gridTemplateRows:"repeat(3, max-content)",
        justifyContent:"center",
      overflow: "auto",
      borderBottom: `2px solid white`,
    },
    addButtonContainer:{
      display: "grid",
      justifyContent: "end",
      padding: "0.8rem",
      height: "2rem",
    },
    button: {
      border: "solid 1px #6CB4EE",
      backgroundColor: "white",
      color: "#6CB4EE",
      borderRadius: "4px",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
      "&:hover": {
        border: "solid 1px white",
        backgroundColor: "#6CB4EE",
        color: "white",
      },
    },
    rightSection:{
      display:"grid",

    },
    [`@media screen and (min-width: 550px)`]: {
      Navbar: {
       
      gridTemplateColumns: "1fr max-content",
      },
      header: {
        justifyContent:"left",
        alignContent:"center",
        paddingLeft:"1rem",
      },
      links: {
      gridTemplateColumns:"repeat(3, max-content)",
      justifyContent:"center",
      },
    }
  });
  

/**
 * @description Navbar component renders a navigation bar with links.
 *              It manages active link state and navigates using react-router-dom.
 * @param links Array of link objects containing title, id, path, and element to render in the navbar.
 */
  const Navbar: React.FC<NavbarProps> = ({ links }) => {
    const [activeId, setActiveId] = useState<string | null>(null);
    const [showAddModal, setShowAddModal] = useState<boolean>(false);
    const navigate = useNavigate();
    const classes = navbarStyles();

  /**
   * Handles click event on a link in the navbar.
   * Sets the active link and navigates to the corresponding path.
   * @param linkId The ID of the clicked link.
   * @param path The path associated with the clicked link.
   */
    const handleLinkClick = (linkId: string, path: string) => {
      setActiveId(linkId);
      navigate(path);
    };
  
    return (
      <div className={classes.Navbar}>
        <React.Fragment>
          <div className={classes.header} >
            <h2 style={{color:"white"}}
            onClick={() => navigate("/")}
            >Book Store</h2>
          </div>
          <div className={classes.rightSection}>
            
          <div className={classes.links}>
            {links
            .filter(link => link.id !== "Category")
            .map((link, idx) => (
              <React.Fragment key={idx}>
                <Link
                  link={link}
                  onClick={() => handleLinkClick(link.id, link.path)}
                />
              </React.Fragment>
            ))}
          </div>
                <div className={classes.addButtonContainer}>
                  <button onClick={()=> setShowAddModal(true)} className={classes.button}>
                    <strong>
                      Add new book
                      </strong>
                  </button>
                </div>
                </div>
        </React.Fragment>
        {showAddModal && (
          <AddBook 
          onClose = {()=> setShowAddModal(false)
          }
          />
                )}
      </div>
    );
  };
  
  export default Navbar;
