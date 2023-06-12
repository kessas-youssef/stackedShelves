import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from "../img/Book.svg";
import Searchform from "./searchform";
import Book from "./book";
import LoadingCard from "./loadingCard";
import "../style/books.css"

const BookDetails = () => {
  const [details, setDetails] = useState([]);

  const [term, setTerm] = useState("");

  const [isLoading, setIsLoading] = useState(true);

  const [isFilterField, setIsFilterField] = useState(false);

  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [bookTitle, setBookTitle] = useState('');
  const [publisher, setPublisher] = useState('');


  let url = `https://www.googleapis.com/books/v1/volumes?q=${term}`;
  if (author.length) url += `+inauthor:${author}`;
  if (genre.length) url += `+subject:${genre}`;
  if (bookTitle.length) url += `+intitle:${bookTitle}`;
  if (publisher.length) url += `+inpublisher:${publisher}`;

  const filterFieldHandler = () => {
    setAuthor('');
    setGenre('');
    setBookTitle('');
    setPublisher('');
    isFilterField ? setIsFilterField(false) : setIsFilterField(true);
  }

  useEffect(() => {
    const fetchDetails = async () => {

      setIsLoading(true);
      const resources = await axios.get(
        `${url}&maxResults=11`
      );
      setDetails(resources.data.items);
      setIsLoading(false);
    };
    if (term.length) fetchDetails();
  }, [term, url]);

  const loadMore = async () => {
    setIsLoading(true);
    const resources = await axios.get(
      `${url}&maxResults=8&startIndex=${details.length}`
    );
    if (resources.data.items)
      setDetails((oldDetails) => [...oldDetails, ...resources.data.items]);
    setIsLoading(false);
    console.log(details.length);
  };

  return (
    <>
      <div className="searchArea">
        <h2 className="searchValue">
          {term.length ? `"${term}"` : <br />}
        </h2>
        <Searchform searchText={(text) => setTerm(text)} />
      </div>

      <button className="filterArea__btn" onClick={filterFieldHandler}>Filter</button>
      {
        isFilterField
        &&
        term.length > 0
        &&
        <div className="filterArea">
          <div>
            <label className="filterArea__label" value="genre">Genre</label>
            <Searchform searchText={text => setGenre(text)} />
          </div>
          <div>
            <label className="filterArea__label" value="book title">Book Title</label>
            <Searchform searchText={text => setBookTitle(text)} />
          </div>
          <div>
            <label className="filterArea__label" value="author">Author</label>
            <Searchform searchText={text => setAuthor(text)} />
          </div>
          <div>
            <label className="filterArea__label" value="publisher">Publisher</label>
            <Searchform searchText={text => setPublisher(text)} />
          </div>
        </div>
      }
      {
        !term.length ?
          <h1 className="loading-name">
            Please type a keyword in the Search box 😀
          </h1>
          : isLoading ? (
            <section className="container" style={{ padding: "2rem 0rem" }}>
              <LoadingCard />
              <LoadingCard />
              <LoadingCard />
              <LoadingCard />
            </section>
          )
            : !details ? (
              <h1 className="loading-name">
                😞 Couldn't find books about {term}
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
                      in the search box!!
                    </h3>
                  </div>
                </section>
                <div className="load-more">
                  <button onClick={() => loadMore()}>Load More!</button>
                </div>
              </section>
            )}
    </>
  );
};

export default BookDetails;
