import React, { Component } from 'react';
import './App.css';
import firebase from 'firebase';
import 'firebase/firestore';
import { config } from './config';

// const enemies = [
//   'cat',
//   'dog',
//   'baby'
//   ];

class App extends Component {
  constructor() {
    super();
    
    firebase.initializeApp(config);
    
    // Initialize Cloud Firestore through Firebase
    this.db = firebase.firestore();
    
    // Disable deprecated features
    this.db.settings({
      timestampsInSnapshots: true
    });
    
    this.state = {
      enemies: [], // init blank
      userInput: ''
    }
  }
  addEnemy = (enemyToAdd) => {
    this.setState({
      // Don't add directly to state anymore.
      // enemies: this.state.enemies.concat(enemyToAdd),
      userInput: ''
    });
    
    // Instead add straight into firebase.
    this.db.collection("enemies")
      .add({ name: enemyToAdd })
      .then(function(docRef) {
          // This is handy if you want to get the ID of created doc
          // and write it somewhere else.
          // Example: when a user submits a new post, save post itself to
          // posts/ and then add an entry to a list of post IDs in the
          // user's profile in /users
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
          writing to db, but not reading
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
