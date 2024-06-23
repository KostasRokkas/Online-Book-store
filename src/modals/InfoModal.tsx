import React from "react";
import { createUseStyles } from "react-jss";

/**
 * Props interface for InfoModal component
 */
interface InfoModalProps {
    cardHeader: string;
    text: string;
    onClose: () => void; 
      
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

  InfoModal: {
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
    background:"white",
},
modalCardBody: {
    display: "grid",
    padding: "1.5rem",
    maxWidth: "90vw",
    minWidth: "70vw",
    minHeight: "30vh",
    maxHeight: "70vh",
    overflow: "auto",
    background:"white",
  },
  modalCardActions: {
    display: "grid",
    gridGap: "0.8rem",
    gridTemplateRows: "repeat(2,max-content)",
    justifyContent: "end",
    padding: "0.8rem",
  },
  card:{
    borderBottom: `2px solid #00b0da`,
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
cardBody:{
    display: "grid",
    padding: "1.5rem",
    minHeight: "30vh",
    maxHeight: "70vh",
    overflow: "auto",
},
  button: {
    border: "solid 1px #00b0da",
    backgroundColor: "#00b0da",
    color: "white",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    height:"2rem",
    "&:hover": {
      backgroundColor: "white",
      color: "#0081a7",
    },
  },
  
  
});

/**
 * InfoModal component displays a modal dialog with body text.
 * It provides a close button to handle modal closure.
 * @param cardHeader Header text displayed in the modal card.
 * @param text Content text displayed in the modal body.
 * @param onClose Function to handle modal closure when the close button is clicked.
 */
const InfoModal: React.FC<InfoModalProps> = ({  cardHeader, text, onClose }) => {
  const classes = styles();

  return (
        <div className={classes.InfoModal}>
        <div className={classes.modalCard}>
          <div className={classes.modalCardHeader}>BookStore</div>
          <div className={classes.modalCardBody}>
          <div className={classes.card}>
          <div className={classes.cardHeader}>
            {cardHeader}
          </div>
          <div className={classes.cardBody}>
            {text}
          </div>
          </div>
          </div>
          <div className={classes.modalCardActions}>
            <button onClick={onClose} className={classes.button}>
            <strong>
              Close
              </strong>
            </button>
          </div>
          </div>
        </div>
  );
};

export default InfoModal;
