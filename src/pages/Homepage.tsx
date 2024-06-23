import React from "react"
import { createUseStyles } from "react-jss";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import CustomCarousel from "../components/Carousel";
import { useLocation } from "react-router-dom";
import Footer from "../components/Footer";

/**
 * @description Define props interface for Homepage component
 * @property {Book[]} books - Array of book objects
 */
interface HomepageProps {
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
    Homepage: {
        display: "grid",
        gridTemplateRows: "repeat(2, max-content) 1fr  max-content",
        justifyContent: "center",
        gap:"1rem",
        backgroundColor: "#fff",
    },
    path:{
        alignContent:"center",
        justifySelf:"center",
        padding:"0.8rem",
        opacity:"0.4"
      },
    carouselContainer:{
        display:"grid",
        justifyContent:"center",
        overflow:"auto",
        padding:"0.8rem",
        "& div": {
            "& div": {
                "& ul":{
                    textAlign:"center"
                },
                "& p": {
                top: "5px"
                }
            }
          },
          background:"#00b0da",
          color:"white",
          fontWeight:"bold",
    },
        carouselDetails:{
        display:"grid",
        gridTemplateColumns:"repeat(2, 1fr)",
        justifySelf:"center",
        alignItems:"center",
        gap:"1rem",
    },
    img: {
        width:"100%"
    },
    bookImg:{
        display:"grid",
        justifyContent:"center",
    },
    bookDetail:{
        display:"grid",
    },
    publicCompany: {
        display: "grid",
        gridTemplateRows:"repeat(2, max-content)",
        textAlign: "center",
        padding:"1rem",
    },
    newArrivalsContainer: {
        display: "grid",
        padding:"1rem",
        gap: "1rem",
    },
    newArrivalstitle: {
        textAlign: "center",
        fontSize: "1.5rem",
        fontWeight: "bold",
    },
    [`@media screen and (min-width: 1024px)`]: {
        carouselContainer:{
            display:"grid",
            gridTemplateRows:"max-content 1fr",
        },
        path:{
            justifySelf:"start",
            alignContent:"center",
            paddingLeft:"5rem",
            opacity:"0.4"
          },
        newArrivalsContainer: {
            display: "grid",
            gap: "2rem",
        },
    }
})

/**
 * @description Homepage component that displays a carousel and new arrivals section
 * @param {HomepageProps} props - Component props containing an array of books
 * @returns {JSX.Element} The rendered component
 */
    const Homepage: React.FC<HomepageProps> = ({ books }) => {
    const classes =styles()

    const location = useLocation(); // Get current location object
    const currentPath = location.pathname.substring(1).toUpperCase(); 

        const bookOverview = books.map((bk) => bk.description)

    return (
        <div className={classes.Homepage}>
        <div className={classes.carouselContainer}> 
            <Carousel autoPlay autoFocus showThumbs infiniteLoop useKeyboardArrows showArrows={false} >
        <div className={classes.carouselDetails}>
        <div className={classes.bookImg}>
        <img className={classes.img} src={`${process.env.PUBLIC_URL}/logo512.png`} alt="Book Cover"/>
            </div>
        <div className={classes.bookDetail}>
            {bookOverview[0]}
        </div>
        </div>
        <div className={classes.carouselDetails}>
        <div className={classes.bookImg}>
            <img className={classes.img} src={`${process.env.PUBLIC_URL}/logo512.png`} alt="Book Cover"/>
            </div>
        <div className={classes.bookDetail}>
            {bookOverview[1]}
        </div>
        </div>
        <div className={classes.carouselDetails}>
        <div className={classes.bookImg}>
        <img className={classes.img}
         src={`${process.env.PUBLIC_URL}/logo512.png`} alt="Book Cover"/>
            </div>
        <div className={classes.bookDetail}>
            {bookOverview[2]}
        </div>
        </div>
                    </Carousel>  
       </div>
       <div className={classes.publicCompany}>
           <h2>Bookstore Publications</h2>
           Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Enim autem esse tenetur exercitationem dolorem quae sint repellat, 
            id sed in ea maiores explicabo harum cum deleniti magnam recusandae perferendis inventore? 
            Explicabo animi incidunt sapiente unde eveniet, 
            optio nam obcaecati quam placeat numquam molestias provident velit aliquid voluptatum eos,
             nisi at molestiae, a labore dolore! Odio vero voluptatum, corrupti, nesciunt laudantium perferendis consequuntur,
              ad minus earum libero suscipit! Obcaecati magnam incidunt dolores natus, aliquid quisquam consectetur
               laudantium culpa tempore voluptatum! Commodi autem nisi ratione eum accusamus doloremque fugit minus, 
           ipsa dolores omnis possimus eaque distinctio corrupti. Aspernatur eius accusamus perspiciatis. Sapiente.
       </div>
       <div className={classes.newArrivalsContainer}>
           <div className={classes.newArrivalstitle}>
           New Arrivals
           </div>
           <CustomCarousel
       books={books.map((book)=> book)}
       />
       </div>
           <Footer/>
       </div>
    )
}

export default Homepage