import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import logo from "../img/Book.svg";
import Book from "./book";
import LoadingCard from "./loadingCard";
import "../style/books.css"
import Context from "./app_context";

const UserBooks = () => {
    const [details, setDetails] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    const [count, setCount] = useState(11)

    const ctx = useContext(Context);

    useEffect(() => {
        const fetchDetails = async () => {
            setIsLoading(true);
            try {
                const requests = ctx.userBooks.map(book => axios.get(`https://www.googleapis.com/books/v1/volumes/${book.bookId}`));
                const responses = await Promise.all(requests);

                // Extracting book data from the API responses
                const books = responses.map(response => response.data).slice(0, count);
                setDetails(books);
            } catch (error) {
                console.error('Error fetching books:', error);
                throw error;
            }
            setIsLoading(false);
        };
        fetchDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const loadMore = async () => {
        try {
            const requests = ctx.userBooks.map(book => axios.get(`https://www.googleapis.com/books/v1/volumes/${book.bookId}`));
            const responses = await Promise.all(requests);

            // Extracting book data from the API responses
            const books = responses.map(response => response.data).slice(count + 1, count + 11);
            setCount(prev => prev + 11);
            setDetails((oldDetails) => [...oldDetails, ...books]);
        } catch (error) {
            console.error('Error fetching books:', error);
            throw error;
        }
    };

    return (
        <>
            {isLoading ? (
                <section className="container" style={{ padding: "2rem 0rem" }}>
                    <LoadingCard />
                    <LoadingCard />
                    <LoadingCard />
                    <LoadingCard />
                </section>
            ) : !details.length ? (
                <h1
                    className="loading-name"
                    style={{
                        background: "white",
                        borderRadius: "1rem",
                        color: "#DB4437",
                        padding: "1rem",
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        fontSize: 33,
                        fontFamily: "Inria Serif",
                        transform: "translate(-50%,-50%)",
                        textTransform: "capitalize",
                    }}
                >
                    😞 No books yet
                </h1>
            ) : (
                <section>
                    <section className="container" style={{ padding: "2rem 0rem" }}>
                        {details.map((book, index) => (
                            <Book {...book} key={index} />
                        ))}
                        <div className="custom-card">
                            <h3 style={{ fontSize: "1.32rem", color: "white" }}>
                                Didn't find the book you love?
                            </h3>
                            <br />

                            <img
                                style={{ width: "100%" }}
                                src={logo}
                                alt="A man reading a book"
                                srcSet=""
                            />

                            <h3 style={{ fontSize: "1.21rem", color: "white" }}>
                                Search for your favourite{" "}
                                <span style={{ fontWeight: "bold", color: "black" }}>
                                    Genre{" "}
                                </span>
                                or{" "}
                                <span style={{ fontWeight: "bold", color: "black" }}>
                                    Author{" "}
                                </span>
                                in the Books page!!
                            </h3>
                        </div>
                    </section>
                    {
                        ctx.userBooks.length>11
                        &&
                        <div className="load-more">
                            <button onClick={() => loadMore()}>Load More!</button>
                        </div>
                    }
                </section>
            )}
        </>
    );
};

export default UserBooks;
