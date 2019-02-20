import React, { Component } from 'react';
import './App.css';
import Movie from './Movie';

class App extends Component {

  // 리액트 렌더링 라이프 사이클
  // componentWillMount() -> render() -> componentDidMount()

  //Update 
  // componentWillReceiveProps() -> shouldComponentUpdate() -> componentWillUpdate() -> render() 
  // componentWillMount(){
  //   //api 요청
  //   console.log("first")
  // }
  // componentDidMount(){
  //   console.log("third")
  // }

  state = {
  }

  componentDidMount() {
    this._getMovies();
  }

  _renderMovies = () => {
    const movies = this.state.movies.map((movie) => {
      return <Movie title={movie.title} poster={movie.medium_cover_image} key={movie.index} />
    })
    return movies;
  }
  
 _getMovies =  async() => {
    const movies = await this._callApi();
    this.setState({
      movies
    })
  }

  _callApi = () => {
    return fetch('https://yts.am/api/v2/list_movies.json?sort_by=rating')
    .then(response => response.json())
    .then(json => json.data.movies)
    .catch(err => console.log(err))
  }

  render() {
    return (
      <div className="App">
        {this.state.movies ? this._renderMovies() : 'Loading'}
      </div>
    );
  }
}

export default App;
