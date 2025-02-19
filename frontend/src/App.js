// frontend/src/App.js
import React from 'react';
import Search from './components/Search';
import WordList from './components/WordList';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Ma'Kobane: Sotho to English Dictionary</h1>
      </header>
      <main>
        <Search />
        <br />
        <WordList />
      </main>
    </div>
  );
}

export default App;