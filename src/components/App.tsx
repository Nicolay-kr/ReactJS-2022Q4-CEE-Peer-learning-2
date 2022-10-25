import React, { Component } from 'react';

class App extends Component {
  render() : JSX.Element {
    return (
      <div>
        <h1>Task20 {process.env.MODE}</h1>
      </div>
    );
  }
}

export default App;
