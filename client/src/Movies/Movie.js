import React from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
import { Link } from 'react-router-dom';



export default class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null
    };
  }

  
  

  componentDidMount() {
    this.fetchMovie(this.props.match.params.id);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.fetchMovie(newProps.match.params.id);
    }
  }

  fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => this.setState({ movie: res.data }))
      .catch(err => console.log(err.response));
  };

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie);
  };

  handleDelete = () => {
    axios
    .delete(`http://localhost:5000/api/movies/${this.props.match.params.id}`)
    .then(response => { 
      console.log(response)
      this.props.history.push("/") })
    .catch( err => console.log(err));
  }
  

  render() {
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }
    const buttonStyle={
      marginBottom:'5%',
      color:"blue",
      background:'yellow',
      fontWeight:'bold',
      borderRadius: '8px',
      fontSize:'16px',
      padding: '14px 40px'
  }
  

    return (
      <div className="save-wrapper">
        <MovieCard movie={this.state.movie} />
        <div className="save-button" onClick={this.saveMovie}>
          Save
        </div>
        <Link to={`/update-movie/${this.props.match.params.id}`} >Update Movie</Link>
        <button style={buttonStyle} onClick={this.handleDelete}>Delete Movie</button>
      </div>
    );
  }
}