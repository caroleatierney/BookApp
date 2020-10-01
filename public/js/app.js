class Input extends React.Component {
  state = {
    book: {}
  }
  findBook = (event) => {
        event.preventDefault();
        event.target.reset()
        axios.get('https://www.googleapis.com/books/v1/volumes?q=' + this.state.name + '&key=AIzaSyB%20AZFHPTcUSvMx_Gx5Cd5tcQLP2c72htwA').then(
            (data) => {
                this.setState(
                    {
                        googleBook: data.data,
                    }
                )
            }
        )
    }

    changeName = (event) => {
        this.setState(
            {
                name: event.target.value
            }
        )
    }
  render = () => {
    console.log(data.data.items)
    return (
      <div>
        <form onSubmit={this.findBook}>
          <input type="text" onKeyUp={this.changeName}/>
          <input type="submit" value="Find Book"/>
        </form>
      </div>
    )
  }
}

class App extends React.Component {
  state = {
    title: '',
    authors: '',
    description: '',
    thumbnail: '',
    averageRating: 0,
    books: []
  }
  handleChange = event => {
    this.setState({ [event.target.id]: event.target.value })
  }
  handleSubmit = event => {
    event.preventDefault()
    console.log(this.state)
    axios
    .post('/books', this.state)
    .then(response =>
      this.setState(
        {
          books: response.data,
          title: '',
          authors: '',
          description: '',
          thumbnail: '',
          averageRating: 0
         }
      )
    )
  }
  componentDidMount = () => {
    axios.get('/books').then(response => {
      this.setState({
        books: response.data
      })
    })
  }
  deleteBook = event => {
    axios.delete('/books/' + event.target.value).then(response => {
      this.setState({
        books: response.data
      })
    })
  }
  updateBook = event => {
    event.preventDefault()
    const id = event.target.id
    axios.put('/books/' + id, this.state).then(response => {
      this.setState({
        books: response.data,
        title: '',
        authors: '',
        description: '',
        thumbnail: '',
        averageRating: 0
      })
    })
  }
  render = () => {
    return (
      <div>
        <form className="book-form" onSubmit={this.handleSubmit}>
          <label htmlFor="title">TITLE:</label>
          <br />
          <input type="text" id="title" onChange={this.handleChange} />
          <br />
          <label htmlFor="authors">AUTHORS:</label>
          <br />
          <input type="text" id="authors" onChange={this.handleChange} />
          <br />
          <label htmlFor="description">DESCRIPTION</label>
          <br />
          <input type="text" id="description" onChange={this.handleChange} />
          <br />
          <label htmlFor="thumbnail">IMAGE LINK:</label>
          <br />
          <input type="text" id="thumbnail" onChange={this.handleChange} />
          <br />
          <label htmlFor="averageRating">RATING:</label>
          <br />
          <input type="text" id="averageRating" onChange={this.handleChange} />
          <br />
          <input type="submit" value="ADD A BOOK" />
        </form>
        <h2>STAFF RECOMMENDATIONS</h2>
        <div className="book-container">
        <div className="row row-cols-2">
          { this.state.books.map( book => { return (
              <div className="col mb-2">
              <div className="card book-card h-100">
              <div className="card-body" key={book._id}>
                <h3>{book.title}</h3> <br />
                <h5>{book.authors}</h5>
                <img src={book.thumbnail} className="card-img book-img"/> <br />
                <h6>{book.description}</h6> <br />
                <h6>{book.averageRating}</h6> <br />
                <details>
                  <summary>EDIT</summary>
                  <form id={book._id} onSubmit={this.updateBook}>
                    <label htmlFor="title">Title</label>
                    <br />
                    <input
                      type="text"
                      id="title"
                      onChange={this.handleChange}
                      value={this.state.title}
                    />
                    <br />
                    <label htmlFor="authors">Authors</label>
                    <br />
                    <input
                      type="text"
                      id="authors"
                      onChange={this.handleChange}
                      value={this.state.authors}
                    />
                    <br />
                    <label htmlFor="thumbnail">Image</label>
                    <br />
                    <input
                      type="text"
                      id="thumbnail"
                      onChange={this.handleChange}
                      value={this.state.thumbnail}
                    />
                    <br />
                    <label htmlFor="description">Description</label>
                    <br />
                    <input
                      type="text"
                      id="description"
                      onChange={this.handleChange}
                      value={this.state.description}
                    />
                    <label htmlFor="averageRating">Rating</label>
                    <br />
                    <input
                      type="text"
                      id="averageRating"
                      onChange={this.handleChange}
                      value={this.state.averageRating}
                    />
                    <input type="submit" value="UPDATE" />
                  </form>
                </details>
                <button value={book._id} onClick={this.deleteBook}>
                  DELETE
                </button>

              </div>
            </div>
        </div>
          ) } ) }
          </div>
          </div>
          <Input book={this.state.data}></Input>
          </div>
    )
  }
}


ReactDOM.render(
    <App></App>,
    document.querySelector('main')
);
