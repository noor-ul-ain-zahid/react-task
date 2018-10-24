import React from 'react'

//Just rendering the data that's received as props
const BookDetails = (props) => {
  const book = props.book

  return (
    <div className="books-content">
      <p className="link blue-text" onClick={props.showHomePage}> Home </p>
      <div className="selected-book display-flex align-items-center">
        <img className="selected-book-cover" src={book.best_book[0].image_url[0]} alt="book-cover"/>
        <div className="selected-book-details">
          <h2> {book.best_book[0].title[0]} </h2>
          <p>Author: {book.best_book[0].author[0].name}</p>
          <p>Publication Year: {book.original_publication_year[0]._}</p>
          <p>Average Rating: {book.average_rating}</p>
          <p>Ratings/Reviews: {book.ratings_count[0]._}/{book.text_reviews_count[0]._}</p>
        </div>
      </div>
    </div>
  )

}
export default BookDetails;