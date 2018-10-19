import React, { Component } from 'react';
import './App.css';
import firebase from 'firebase';
import 'firebase/firestore';

class App extends Component {
  constructor() {
    super();
    
    // ************* STEP 3 ****************
    // Remove hardcoded list.
    // ************* STEP 3 ****************
    this.state = {
      // enemies: ['cat', 'dog', 'baby'],
      enemies: [],
    };
    this.inputRef = React.createRef();
    
    // ************* STEP 3 ****************
    // Insert Firebase config here!
    // ************* STEP 3 ****************
    const config = {};
    
    // ************* STEP 3 ****************
    // Initialize Firebase and Firestore
    // ************* STEP 3 ****************
    firebase.initializeApp(config);
    this.firestore = firebase.firestore();
  }
  addEnemy = () => {
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
      .add({ name: this.inputRef.current.value })
      .then(() => this.inputRef.current.value = '');
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
          Writing but not reading from DB
        </header>
        <div className="add-enemy-form">
          <input ref={this.inputRef} />
          <button onClick={this.addEnemy}>
            add enemy
          </button>
        </div>
        <div className="enemies-list">
          {this.state.enemies.map(enemy => (
            <button onClick={() => this.removeEnemy(enemy)} key={enemy}>
              {enemy}
            </button>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
