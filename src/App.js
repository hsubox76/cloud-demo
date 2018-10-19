import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      enemies: ['cat', 'dog', 'baby'],
    };
    // ************* STEP 2 ****************
    // Ref to the input element.
    // ************* STEP 2 ****************
    this.inputRef = React.createRef();
  }
    
  // ************* STEP 2 ****************
  // Handler to add an enemy item.
  // ************* STEP 2 ****************
  addEnemy = (e, enemyToAdd) => {
    // ************* STEP 2 ****************
    // Take whatever's typed into the input
    // and concat to state.enemies.
    // Then clear the input.
    // ************* STEP 2 ****************
    this.setState({
      enemies: this.state.enemies.concat(this.inputRef.current.value),
    });
    this.inputRef.current.value = '';
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
          input but no persistence
        </header>
        {/*************** STEP 2 ****************
            Form for adding the enemy.
            INPUT: pointed to by this.inputRef
            BUTTON: calls this.addEnemy on click
          *************** STEP 2 ****************/}
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
