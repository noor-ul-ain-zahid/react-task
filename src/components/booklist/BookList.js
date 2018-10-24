import React from 'react'
import Books from '../books/Books';
import BookListStats from './BookListStats';

const BookList = (props) => {

  //Getting data from props
  const { books, currentPage, totalResults, pageSize, query, currentPageDetails } = props.values,
  
    //Countng the number of pages we need to use to show books 
    totalPages = Math.ceil(books.length / pageSize);

  return (
    <div className="books-content">
      <p className="link blue-text" onClick={props.showHomePage}> Home </p>

      {/*Displaying stats on top of book list */}
      <BookListStats totalResults={totalResults} currentPage={currentPage} query={query} totalPages={totalPages}/>

      {/* To render Books */}
      <div className="books-list">
        <Books books={currentPageDetails} totalResults={totalResults} onShowBookDetails={props.onShowBookDetails}/>
      </div>

      {/*Options for Pagination*/}
      <button style={currentPage !== 1 ? {} : { visibility: 'hidden' }} onClick={props.previousPage}>
        Previous
      </button>

      <button className="btn-right" style={!(totalResults < pageSize || currentPage >= totalPages) ? {} :
        { visibility: 'hidden' }} onClick={props.nextPage}>
        Next
			</button>

    </div>
  )
}
export default BookList;