import React from 'react'

const Books = (props) => {
  const { books, totalResults } = props

  return books.slice(0, 5).map((book, index) => {
    return (
      totalResults > 0 &&
        <div className="align-items-center display-flex books" onClick={() => props.onShowBookDetails(book)} key={index}>
          <img className="small-book-cover" src={book.best_book[0].small_image_url[0]} alt="book-cover" />
          <div className="book-details">
            <p>{book.best_book[0].title[0]}</p>
            <div className="inline">
              <p>by</p>
              <h5>{book.best_book[0].author[0].name}</h5>
            </div>
          </div>
        </div>
        )
      });
    }
export default Books;