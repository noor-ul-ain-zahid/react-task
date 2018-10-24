import React from 'react'

const BookListStats = (props) => {
    const {query,totalPages,totalResults,currentPage}=props
    return (
        <div> <h1 className="blue-text center-text"> {query} ({totalResults})</h1>
            {
                totalResults === "0"
                    ?
                    <p className="center-text">No Results Found</p>
                    :
                    <p className="center-text">Page: {currentPage}/{totalPages}</p>
            }
        </div>
    )
}
export default BookListStats;