import React, { Component } from 'react';
import './App.css';
import firebase from 'firebase';
import 'firebase/firestore';

class App extends Component {
  constructor() {
    super();
    
    // ************* STEP 3 ****************
    // Insert Firebase config here!
    // ************* STEP 3 ****************
    const config = {};
    
    firebase.initializeApp(config);
    
    // Initialize Cloud Firestore through Firebase
    this.firestore = firebase.firestore();
    
    this.state = {
      // enemies: ['cat', 'dog', 'baby'],
      enemies: []
    }
  }
  addEnemy = (enemyToAdd) => {
    // ************* STEP 3 ****************
    // Don't add directly to state anymore.
    // ************* STEP 3 ****************
    // this.setState({
      // enemies: this.state.enemies.concat(enemyToAdd)
    // });
    
    // ************* STEP 3 ****************
    // Instead add straight into firebase.
    // ************* STEP 3 ****************
    this.firestore.collection("enemies")
      .add({ name: enemyToAdd });
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
          <input
            value={this.state.userInput}
            onChange={(e) => this.setState({ userInput: e.target.value })}
          />
          <button onClick={() => this.addEnemy(this.state.userInput)}>
            add enemy
          </button>
        </div>
        <div className="enemies-list">
          {this.state.enemies.map(enemy => (
            <div
              key={enemy}
              onClick={() => this.removeEnemy(enemy)}
            >
              {enemy}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
