import React, { useContext, useEffect, useState } from "react";
import { BiLinkExternal } from "react-icons/bi";
import defaultBook from "../img/defaultBook.png";
import "../style/book.css";
import { motion } from "framer-motion";
import DescriptionModal from "./descriptionModal";
import Context from "./app_context";
import axios from "axios";
import MainBtn from "./mainBtn";
import CommentsModal from "./commentsModal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'

const Book = ({ id, volumeInfo }) => {

  const ctx = useContext(Context);


  const [descriptionModal, setDescriptionModal] = useState({ status: false, title: '', description: '' });

  const [commentsModal, setCommentsModal] = useState(false);

  const [bookStatusToogle, setBookStatusToggle] = useState(0);

  const [bookStatus, setBookStatus] = useState(ctx.userBooks.find(book => book.bookId === id));

  const [isLoading, setIsLoading] = useState(false);


  const bookStatusToogleHandler = async () => {
    setIsLoading(true);
    const statusList = ['Unread', 'Done', 'Reading ...'];
    setBookStatusToggle(statusList.indexOf(bookStatus.bookStatus));
    const status = statusList[bookStatusToogle === 2 ? 0 : bookStatusToogle + 1];
    console.log(status);

    const res = await axios(
      {
        method: 'POST',
        data: {
          username: ctx.name,
          bookId: id,
          bookStatus: status
        },
        withCredentials: true,
        url: 'https://stacked-shelves-hh7u2ufv7-kessas-youssef.vercel.app/changeStatus'
      }
    );
    if (res.data.status) {
      ctx.userBooks.map(book => book.bookId === id ? book.bookStatus = status : book)
      setBookStatus({ ...bookStatus, bookStatus: status });
    }
    setIsLoading(false);
  };

  const favouriteHandler = async (action) => {
    if (action !== 'add' && action !== 'remove')
      return;
    setIsLoading(true);
    console.log(action);
    const res = await axios(
      {
        method: 'POST',
        data: {
          username: ctx.name,
          bookId: id
        },
        withCredentials: true,
        url: `https://stacked-shelves-hh7u2ufv7-kessas-youssef.vercel.app/${action}Favourite`
      }
    );
    if (res.data.status) {
      if (action === 'add')
        ctx.setUserBooksHandler([...ctx.userBooks, { bookId: id, bookStatus: 'Unread' }]);
      else
        ctx.setUserBooksHandler(ctx.userBooks.filter(book => book.bookId !== id));
      setBookStatus(ctx.userBooks.find(book => book.bookId === id))
    }
    else
      console.log(res.data.message);

    setIsLoading(false);

  }

  useEffect(() => {
    setBookStatus(ctx.userBooks.find(book => book.bookId === id));
  }, [ctx.userBooks, id])

  useEffect(() => {
    ctx.setIsModalHandler(descriptionModal.status || commentsModal);
    },[commentsModal, ctx, descriptionModal.status])

  const imageVariants = {
    hover: {
      scale: 1.7,
      boxShadow: "0px 0px 8px #000",
      transition: {
        duration: 0.5,
        type: "spring",
        delay: 0.15
      },
    },
  };
  let { title, authors, publisher, previewLink, imageLinks, averageRating, description, publishedDate } = volumeInfo;

  //setting up default values for volume info data
  title = title || "Title is not available";
  authors = authors || "Author(s) name not available";
  publisher = publisher || "Publisher company not available";
  previewLink = previewLink || "https://books.google.co.in/";
  averageRating = averageRating || "-"
  description = description || "Unavailble"
  publishedDate = publishedDate || '- / - / -'

  return (
    <>
      <section key={id}
        className="loading-card"
        style={bookStatus ? { backgroundColor: '#e0e0d0' } : {}}
      >
        <div>
          <div>
            <motion.img
              src={imageLinks ? imageLinks.thumbnail : defaultBook}
              width='auto'
              height='150px'
              alt="Book-cover"
              variants={imageVariants}
              whileHover="hover"
            />
          </div>
          <div>
            {title && (
              <div>
                <h3 className="inline" style={{ fontStyle: "italic", fontSize: `${title.length>40?'.7rem':'1rem'}` }}>{title}</h3>
              </div>
            )}
          </div>

          <hr className="loadingCard__hr" />

          <div>
            {authors && (
              <h4>
                {" "}
                Author:{" "}
                <span>
                  {" "}
                  {
                    authors.length > 1
                      ?
                      authors.toString().substring(0, authors.toString().length - 2)
                      :
                      authors
                  }{" "}
                </span>
              </h4>
            )}
          </div>

          <div>
            {publisher && (
              <h4>
                {" "}
                Published by:{" "}
                <span>
                  {" "}
                  {publisher}{" "}
                </span>
              </h4>
            )}
          </div>

          <div>
            {averageRating && (
              <h4>
                {" "}
                Rating:{" "}
                <span>
                  {" "}
                  {averageRating}/5{" "}&#11088;

                </span>
              </h4>
            )}
          </div>
          <div>
            {averageRating && (
              <h4>
                {" "}
                Date of Publishing:{" "}
                <span>
                  {" "}
                  {
                    publishedDate.toString().length > 10
                      ?
                      publishedDate.toString().substring(0, 10)
                      :
                      publishedDate
                  }{" "}<i className="fa fa-calendar"></i>
                </span>
              </h4>
            )}
          </div>

          <div>
            {previewLink && (
              <h4>
                Read more :{" "}
                <a href={previewLink} target="_blank" rel="noreferrer">
                  {" "}
                  Google Books <BiLinkExternal></BiLinkExternal>{" "}
                </a>
              </h4>
            )}
          </div>
        </div>

        <div>
          {description && (
            <button onClick={() => setDescriptionModal({ status: true, title: title, description: description })}>
              Click for Description <FontAwesomeIcon icon={icon({ name: 'align-left' })} />
            </button>
          )}


          {
            ctx.isLogin
            &&
            <button onClick={() => setCommentsModal(true)}>
              Click for Comments <FontAwesomeIcon icon={icon({ name: 'comments' })} />
            </button>
          }

          {
            bookStatus
            &&
            <h4 className="changeStatus" style={{ marginBottom: '20px' }}>
              {" "}
              Status:{" "}
              <button className="changeStatus__btn" onClick={isLoading ? () => { } : bookStatusToogleHandler}>
                {" "}
                {
                  isLoading ? <FontAwesomeIcon icon={icon({ name: 'spinner' })} /> : bookStatus.bookStatus
                }{" "}
              </button>
            </h4>
          }

          {
            ctx.isLogin
            &&
            (
              !bookStatus
                ?
                <MainBtn className="favouriteBtn" disabled={isLoading} onClick={() => favouriteHandler('add')}>Add to favourites &#10084;</MainBtn>
                :
                <MainBtn className="favouriteBtn" disabled={isLoading} onClick={() => favouriteHandler('remove')}>Remove from favourites &#10084;</MainBtn>
            )
          }
        </div>

      </section>
      {descriptionModal.status
        &&
        !commentsModal
        &&
        <DescriptionModal status={descriptionModal.status} description={descriptionModal.description} title={descriptionModal.title} setDescriptionModal={setDescriptionModal} />
      }
      {
        commentsModal
        &&
        !descriptionModal.status
        &&
        ctx.isLogin
        &&
        <CommentsModal bookTitle={title} commentsModal={commentsModal} setCommentsModal={setCommentsModal} bookId={id} />
      }

    </>

  );
};

export default Book;
