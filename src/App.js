import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import firebase from 'firebase';
import 'firebase/firestore';

const enemies = [
  'cat',
  'dog',
  'baby'
  ];

class App extends Component {
  constructor() {
    super();
    
    // Initialize Firebase
    var config = {
      // ***********************************
      // *********** REPLACE ***************
      // ***********************************
      // apiKey: "AIzaSyBsyFvxigPX-W5XebG99dZ0_J0UR7--x2w",
      // authDomain: "test1-d075b.firebaseapp.com",
      // databaseURL: "https://test1-d075b.firebaseio.com",
      // projectId: "test1-d075b",
      // storageBucket: "test1-d075b.appspot.com",
      // messagingSenderId: "766394707590"
    };
    
    firebase.initializeApp(config);
    
    // Initialize Cloud Firestore through Firebase
    this.db = firebase.firestore();
    
    // Disable deprecated features
    this.db.settings({
      timestampsInSnapshots: true
    });
    
    this.state = {
      enemies: [],
      userInput: ''
    }
  }
  addEnemy = (enemyToAdd) => {
    this.setState({
      // enemies: this.state.enemies.concat(enemyToAdd),
      userInput: ''
    });
    
    this.db.collection("enemies")
      .add({ name: enemyToAdd })
      .then(function(docRef) {
          console.log("Document written with ID: ", docRef.id);
      })
      .catch(function(error) {
          console.error("Error adding document: ", error);
      });
  }
  removeEnemy = (enemyToRemove) => {
    this.setState({
      enemies: this.state.enemies.filter(enemy => enemy !== enemyToRemove)
    });
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="add-enemy-form">
          <input value={this.state.userInput} onChange={(e) => this.setState({ userInput: e.target.value })} />
          <button onClick={() => this.addEnemy(this.state.userInput)}>add enemy</button>
        </div>
        <div className="enemies-list">
          {this.state.enemies.map(enemy => (
            <div key={enemy}>
              <input type="checkbox" onClick={() => this.removeEnemy(enemy)} />
              <label>{enemy}</label>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
