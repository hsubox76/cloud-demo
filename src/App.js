import React, { Component } from 'react';
import './App.css';
import firebase from 'firebase';
import 'firebase/firestore';

class App extends Component {
  constructor() {
    super();
    this.state = {
      enemies: [],
    };
    this.inputRef = React.createRef();
    
    // ************* STEP 4 ****************
    // Insert Firebase config here!
    // ************* STEP 4 ****************
    const config = {};
    
    firebase.initializeApp(config);
    this.firestore = firebase.firestore();
  }
  componentDidMount = () => {
    // ************* STEP 4 ****************
    // Read enemies collection from Firebase
    // ************* STEP 4 ****************
    this.firestore.collection("enemies")
      // ************* STEP 4 ****************
      // "onSnapshot" sets a listener that is
      // called whenever collection changes
      // ************* STEP 4 ****************
      .onSnapshot((querySnapshot) => {
        this.setState({
          enemies: querySnapshot.docs.map(enemySnapshot => enemySnapshot.data().name)
        });
      });
  }
  addEnemy = (enemyToAdd) => {
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
          Writing to AND reading from DB
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
