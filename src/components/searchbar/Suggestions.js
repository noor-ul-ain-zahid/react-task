import React from 'react'
import Books from '../books/Books'
const Suggestions=(props)=>{
    const { books, totalResults } = props
    return(
        <Books books={books} totalResults={totalResults} onShowBookDetails={props.onShowBookDetails}/>
    )
}
export default Suggestions;