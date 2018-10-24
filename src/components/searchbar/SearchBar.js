import React from 'react'
import Suggestions from './Suggestions'
import Notifications from './Notifications'

const SearchBar = (props) => {

  // Reading Data from props
  const { isLoading, books, totalResults, query } = props.values
  
  return (
    <div className="search-bar books-content">
      <p className="read-heading">Should I Read <br/> this Book?</p>
      <div className="search-bar-content">

        {/* Input Text Box */}
        <input type="text" value={query} onChange={props.onTextBoxChange} placeholder="Enter Author/Book name..." />

        {/* Button for Navigating to BookList(to show all results) */}
        <button className="btn-right" disabled={query === ''} onClick={props.showAllResults}> Search </button>
        
        {
          query !== '' &&
          <div className="display-flex direction-column">

            {/*To show Suggestions if any results found */}
            <Suggestions books={books} totalResults={totalResults} onShowBookDetails={props.onShowBookDetails} />

            {/* To show notification if user is typing or no books found or to view all results */}
            <Notifications totalResults={totalResults} isLoading={isLoading} length={books.length}
              showAllResults={props.showAllResults} />

          </div>
        }
      </div>
    </div>
  )
}
export default SearchBar;