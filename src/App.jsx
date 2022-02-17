import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ModalPopUp from './components/ModalPopUp';


class App extends React.Component{
  constructor(){
    super()
    this.state = {
      actors: [], 
      popUp: false,
      selectedActor: []
    }
    this.modalHandle = this.modalHandle.bind(this)
  }

  async componentDidMount(){
    const URL = "https://api.themoviedb.org/3/person/popular?api_key=e9ddce2167c1fec8710a77c95a10cf45&language=en";
    try {
      const resp = await fetch(URL)
      const data = await resp.json()
      this.setState({actors: data.results})
    } catch (err){
      console.log(err)            // async/await method
    }
    // fetch(URL)
    // .then((resp) => resp.json())
    // .then((data) => this.setState({actors: data.results}))
    // .catch((err) => console.log(err))
  }

  togglePopUp(id){
    this.setState({popUp: true})
    const selectedActor = this.state.actors.filter((actor) => actor.id === id)
    this.setState({selectedActor})
  }

  modalHandle(status){
    this.setState({popUp: status})
  }

  render(){
    const {actors} = this.state;
    return(
      <>
        <div className='app'>
          <h1 className='heading'>Movie Actors</h1>
          <div className="movies">
            {actors.map((actor) => {
              const {name, profile_path, known_for, id} = actor;
              const details = known_for.map(movie => movie.title);
              return (
                <div className="actor" onClick={() => this.togglePopUp(id)}>
                  <div>
                  <img src={"https://image.tmdb.org/t/p/w500/"+profile_path} className="img" alt="Actor's img" />
                  </div>
                  <div className='title'>
                  <h4>{name}</h4>
                  <p>{details.join(", ")}</p>
                  </div>
                </div>
              )
            })}
          </div>
          {this.state.popUp ? <ModalPopUp modalHandle={this.modalHandle} dataActor={this.state.selectedActor}/> : null}
        </div>
      </>
    )
  }
}

export default App;
