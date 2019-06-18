import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Card from './Card/Card';
import DrawButton from './Draw/DrawButton';
import firebase from 'firebase/app';
import 'firebase/database';

import { DB_CONFIG } from './Config/Firebase/db_config'

class App extends Component{
  constructor(props){
    super(props);


  //  console.log(firebase.apps.length);
    if (!firebase.apps.length){

    this.app = firebase.initializeApp(DB_CONFIG);
    this.database = this.app.database().ref().child('cards');
    this.updateCard = this.updateCard.bind(this);

    this.state = {
      cards: [],
      currentCard: {}
    }
  }

  }

  componentWillMount(){
     const currentCards = this.state.cards;

     this.database.on('child_added', snap =>{
       currentCards.push({
         id: snap.key,
         eng: snap.val().eng,
         han: snap.val().han,
         pin: snap.val().pin,
       })
       this.setState({
         cards: currentCards,
         currentCard: this.getRandomCard(currentCards)
       })
     })


  }

  getRandomCard(currentCards){
    var a = Math.floor(Math.random()*currentCards.length);

    var card = currentCards[a];
    return(card);
  }

  updateCard(){
    const currentCards=this.state.cards;
    this.setState({
      currentCard: this.getRandomCard(currentCards)
    })
  }

  componentDidMount(){

  }

  render(){
    return (
      <div className="App">
      <div className="cardRow">
      <Card eng={this.state.currentCard.eng} han={this.state.currentCard.han} pin={this.state.currentCard.pin}/>
      </div>
      <div className="buttonRow">
      <DrawButton drawCard = {this.updateCard}/>
      </div>
      </div>
    );
  }
}

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
