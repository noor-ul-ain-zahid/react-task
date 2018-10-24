import React from 'react'

const Notifications = (props) => {
    const{ isLoading, totalResults, length }=props
    return (
        <div className="link blue-text" >
            {
                isLoading // for typing timer
                ?
                <p>Loading......</p>
                :
                totalResults === "0"// If no results were found for the term entered by user
                    ?
                    <p>No books Found</p>
                    :
                    (totalResults >= 1 && totalResults <= 5)
                        ?
                        <p > No More Results Found</p>
                        :
                        <p onClick={props.showAllResults}> View {length - 5} more results >></p>
            }
        </div>
    )
}
export default Notifications;
