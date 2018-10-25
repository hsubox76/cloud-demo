import React, { Component } from 'react';
import './App.css';
import firebase from 'firebase';
import 'firebase/firestore';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';


class App extends Component {
  constructor() {
    super();
    this.state = {
      enemies: [],
      user: null
    };
    this.inputRef = React.createRef();
    
    // ************* STEP 6 ****************
    // Pull secrets from env so it doesn't get saved in your repo
    // ************* STEP 6 ****************
    const projectId = process.env.REACT_APP_DEMO_PROJECT_ID;
    const config = {
      apiKey: process.env.REACT_APP_DEMO_API_KEY,
      authDomain: projectId + ".firebaseapp.com",
      databaseURL: "https://" + projectId + ".firebaseio.com",
      projectId: projectId,
      storageBucket: projectId + ".appspot.com"
    };
    
    firebase.initializeApp(config);
    this.firestore = firebase.firestore();
  }
  componentDidMount = () => {
    this.firestore.collection("enemies")
      .onSnapshot((querySnapshot) => {
        this.setState({
          enemies: querySnapshot.docs.map(enemySnapshot => enemySnapshot.data().name)
        });
      });
    firebase.auth().onAuthStateChanged(
      (user) => this.setState({ user })
    );
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
    const uiConfig = {
      signInFlow: 'popup',
      signInSuccessUrl: '/signedIn',
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ]
    };
    return (
      <div className="App">
        <header className="App-header">
          {!this.state.user &&
            <StyledFirebaseAuth
              uiConfig={uiConfig}
              firebaseAuth={firebase.auth()}
            />}
          {this.state.user &&
            <a onClick={() => firebase.auth().signOut()}>
              Logout
            </a>}
        </header>
        {this.state.user && this.state.user.uid === 'DlNd3axtDrSeBFMYTlldVcwBw7l1' && (
          <div className="add-enemy-form">
            <input ref={this.inputRef} />
            <button onClick={this.addEnemy}>
              add enemy
            </button>
          </div>
        )}
        <div className="enemies-list">
          <div>Enemies List</div>
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
