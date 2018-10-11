import React, { Component } from 'react';
import './App.css';
import firebase from 'firebase';
import 'firebase/firestore';

class App extends Component {
  constructor() {
    super();
    
    // Initialize Firebase
    const projectId = process.env.REACT_APP_DEMO_PROJECT_ID;
    
    // Pull secrets from env so it doesn't get saved in your repo
    const config = {
      apiKey: process.env.REACT_APP_DEMO_API_KEY,
      authDomain: projectId + ".firebaseapp.com",
      databaseURL: "https://" + projectId + ".firebaseio.com",
      projectId: projectId,
      storageBucket: projectId + ".appspot.com"
    };
    
    firebase.initializeApp(config);
    
    // Initialize Cloud Firestore through Firebase
    this.db = firebase.firestore();
    
    // Disable deprecated features
    this.db.settings({
      timestampsInSnapshots: true
    });
    
    this.state = {
      enemies: [], // still inits empty
      userInput: ''
    }
  }
  componentDidMount = () => {
    // Read enemies/ collection from firebase.
    this.db.collection("enemies")
      // "onSnapshot" sets a listener that will be called when collection
      // changes
      .onSnapshot((querySnapshot) => {
        this.setState({
          enemies: querySnapshot.docs.map(enemySnapshot => enemySnapshot.data().name)
        });
      });
  }
  addEnemy = (enemyToAdd) => {
    this.setState({
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
    // Removal does NOT write to backend - client side only
    this.setState({
      enemies: this.state.enemies.filter(enemy => enemy !== enemyToRemove)
    });
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          reading from db, no auth roles
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
