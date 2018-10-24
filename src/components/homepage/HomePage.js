import React from 'react'
import { parseString } from 'xml2js'
import Switch, { Case } from 'react-switch-case';
import SearchBar from '../searchbar/SearchBar'
import BookDetails from '../bookdetails/BookDetails'
import BookList from '../booklist/BookList'

let typingTimer;

export default class HomePage extends React.Component {

  state = {
    query: '',
    isLoading: false,
    books: [],
    selectedBook: [],
    show: "SearchBar",
    pageSize: 5,
    currentPage: 1,
    pageEndIndex: 5,
    pageStartIndex: 0,
    currentPageDetails: []
  }

  // When user is typing
  onTextBoxChange = e => {

    clearTimeout(typingTimer);

    const query = e.target.value
    this.setState({
      query,
      isLoading: true,
    })

    typingTimer = setTimeout(async () => {
      await this.getBooks(query)
    }, 400);
  }

  //Setting state for previous or next page details
  setPageDetails = (books, currentPage, pageStartIndex, pageEndIndex) =>
    this.setState({
      currentPage,
      pageEndIndex,
      pageStartIndex,
      currentPageDetails: books.slice(pageStartIndex, pageEndIndex)
    })

  //To go back required pageSize i.e. total number of results to be shown on a page
  previousPage = () => {
    const { pageStartIndex, pageEndIndex, pageSize, currentPage, books } = this.state,
      start = pageStartIndex - pageSize,
      end = pageEndIndex - pageSize,
      page = currentPage - 1
    this.setPageDetails(books, page, start, end);
  }

  //To show next results
  nextPage = () => {
    const { pageStartIndex, pageSize, currentPage, books } = this.state,
      start = pageStartIndex + pageSize,
      end = start + pageSize,
      page = currentPage + 1
    this.setPageDetails(books, page, start, end);
  }

  //Getting data from GoodReads
  getBooks = (query) => {
    const url = 'https://www.goodreads.com/search/index.xml',
      key = '2K4u2rZ8zI19gplAthufA'

    fetch(`${url}?key=${key}&q=${query}`)
      .then(resp => resp.text())
      .then(data => {
        parseString(data, (err, convertedResult) => {
          const totalResults = convertedResult.GoodreadsResponse.search[0]['total-results'][0]
          if (totalResults !== "0") {
            const books = convertedResult.GoodreadsResponse.search[0].results[0].work
            this.setState({
              books,
              isLoading: false,
              totalResults
            })
          }
          else {
            this.setState({
              books: [],
              isLoading: false,
              totalResults
            })
          }
        })
      })
      .catch(err => {
        this.setState({
          isLoading: false,
          books: []
        })
        console.log(err)
      })
  }

  //To show All Results
  showAllResults = () => {
    this.setState({
      show: "BookList",
      currentPageDetails: this.state.books.slice(0, this.state.pageSize)
    })
  }

  //To navigate back to this component
  showHomePage = () => {
    this.setState({
      show: "SearchBar",
      query: '',
      currentPage: 1,
      pageEndIndex: 5,
      pageStartIndex: 0
    })
  }

  //To Show Book Details
  onShowBookDetails = book => {
    this.setState({
      show: "BookDetails",
      selectedBook: book
    });
  };

  render() {
    //Getting all Data required
    const { show, selectedBook } = this.state;

    return (
      <Switch condition={show}>

        <Case value='SearchBar'>
          <SearchBar values={this.state} onShowBookDetails={this.onShowBookDetails} showAllResults={this.showAllResults}
            onTextBoxChange={this.onTextBoxChange} />
        </Case>

        <Case value='BookDetails'>
          <BookDetails showHomePage={this.showHomePage} book={selectedBook} />
        </Case>

        <Case value='BookList'>
          <BookList values={this.state} onShowBookDetails={this.onShowBookDetails} previousPage={this.previousPage}
            nextPage={this.nextPage} showHomePage={this.showHomePage} />
        </Case>

      </Switch>
    );
  }
}