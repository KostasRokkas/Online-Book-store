import React, { useState } from "react";
import { createUseStyles } from "react-jss";
import { FaPhone, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
import InfoModal from "../modals/InfoModal";

const styles = createUseStyles({
  Footer: {
    display: "grid",
    gridTemplateRows: "repeat(3, 1fr)",
    backgroundColor: "black",
    padding: "1.5rem",
    gap: "1.5rem",
  },
  companyName: {
      display: "grid",
      justifyContent:"center",
    color: "#00b0da",
    fontSize: "x-large",
  },
  InfoModals: {
    display: "grid",
    gridTemplateRows: "max-content repeat(2, 1fr)",
    justifyItems:"center",
  },
  title: {
    display: "grid",
    justifyContent:"center",
    padding:"0.8rem",
    fontSize: "x-large",
    color: "#00b0da",
  },
  company: {
    display: "grid",
    padding:"0.4rem"
  },
  termsOfUse: {
    display: "grid",
    padding:"0.4rem"
  },
  paymentMethods: {
    display: "grid",
    padding:"0.4rem"
  },
  shippingMethods: {
    display: "grid",
    padding:"0.4rem"
  },
  contactDetails: {
    display: "grid",
    gridTemplateRows: "max-content repeat(2, 1fr)",
    color: "#00b0da",
  },
  contact: {
    display: "grid",
    gridTemplateColumns:"max-content 1fr",
    justifySelf:"center",
    textAlign:"center",
    alignItems: "center",
    gap: "1rem",
    padding:"0.4rem",
  },
  button: {
    border: "none",
    backgroundColor: "black",
    width: "max-content",
        color: "white",
        borderRadius: "4px",
        cursor: "pointer",
        transition: "background-color 0.3s ease",
        textDecoration: "none",
        fontSize:"large",
        "&:hover": {
          color: "#0081a7",
          textDecoration: "underline",
      },
  },
  [`@media screen and (min-width: 550px)`]: {
    Footer: {
        gridTemplateColumns: "repeat(3, 1fr)",
        gridTemplateRows: "1fr",
        justifyItems:"center",
    },
  },
});

const Footer: React.FC = () => {
  const classes = styles();

  const [showCompany, setShowCompany] = useState<boolean>(false);
  const [showTermsOfUse, setShowTermsOfUse] = useState<boolean>(false);
  const [showPaymentMethods, setShowPaymentMethods] = useState<boolean>(false);
  const [showShippingMethods, setShowShippingMethods] = useState<boolean>(false);

  return (
    <div className={classes.Footer}>
      <div className={classes.companyName}>
        <strong>Bookstore</strong>
      </div>
      <div className={classes.InfoModals}>
        <div className={classes.title}>
          <strong>Links</strong>
        </div>
        <div className={classes.company}>
          <button className={classes.button} onClick={() => setShowCompany(true)}>
            <strong>About Company</strong>
          </button>
        </div>
        <div className={classes.termsOfUse}>
          <button className={classes.button} onClick={() => setShowTermsOfUse(true)}>
            <strong>Terms of Use</strong>
          </button>
        </div>
        <div className={classes.paymentMethods}>
          <button className={classes.button} onClick={() => setShowPaymentMethods(true)}>
            <strong>Payment Methods</strong>
          </button>
        </div>
        <div className={classes.shippingMethods}>
          <button className={classes.button} onClick={() => setShowShippingMethods(true)}>
            <strong>Shipping Methods</strong>
          </button>
        </div>
      </div>
      <div className={classes.contactDetails}>
        <div className={classes.title}>
          <strong>Contact Details</strong>
        </div>
        <div className={classes.contact}>
          <FaPhone />
          <strong style={{ color: "white" }}>2710000000</strong>
        </div>
       <div className={classes.contact}>
          <FaMapMarkerAlt />
          <a
            href="https://www.google.com/maps/search/?api=1&query=Tripoli+Avenue+70"
            target="_blank"
            rel="noopener noreferrer"
            className={classes.button}
          >
            <strong>Tripoli Avenue 70</strong>
          </a>
        </div>
        <div className={classes.contact}>
          <FaEnvelope />
          <a href="mailto:this@isnotemail.com" className={classes.button}>
            <strong>this@isnotemail.com</strong>
          </a>
        </div>
      </div>
      {showCompany && (
        <InfoModal
          cardHeader="About Company"
          text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim autem esse tenetur exercitationem dolorem quae sint repellat, id sed in ea maiores explicabo harum cum deleniti magnam recusandae perferendis inventore? Explicabo animi incidunt sapiente unde eveniet, optio nam obcaecati quam placeat numquam molestias provident velit aliquid voluptatum eos, nisi at molestiae."
          onClose={() => setShowCompany(false)}
        />
      )}
      {showTermsOfUse && (
        <InfoModal
          cardHeader="Terms of Use"
          text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim autem esse tenetur exercitationem dolorem quae sint repellat, id sed in ea maiores explicabo harum cum deleniti magnam recusandae perferendis inventore? Explicabo animi incidunt sapiente unde eveniet, optio nam obcaecati quam placeat numquam molestias provident velit aliquid voluptatum eos, nisi at molestiae."
          onClose={() => setShowTermsOfUse(false)}
        />
      )}
      {showPaymentMethods && (
        <InfoModal
          cardHeader="Payment Methods"
          text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim autem esse tenetur exercitationem dolorem quae sint repellat, id sed in ea maiores explicabo harum cum deleniti magnam recusandae perferendis inventore? Explicabo animi incidunt sapiente unde eveniet, optio nam obcaecati quam placeat numquam molestias provident velit aliquid voluptatum eos, nisi at molestiae."
          onClose={() => setShowPaymentMethods(false)}
        />
      )}
      {showShippingMethods && (
        <InfoModal
          cardHeader="Shipping Methods"
          text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim autem esse tenetur exercitationem dolorem quae sint repellat, id sed in ea maiores explicabo harum cum deleniti magnam recusandae perferendis inventore? Explicabo animi incidunt sapiente unde eveniet, optio nam obcaecati quam placeat numquam molestias provident velit aliquid voluptatum eos, nisi at molestiae."
          onClose={() => setShowShippingMethods(false)}
        />
      )}
    </div>
  );
};

export default Footer;
