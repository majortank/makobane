// frontend/src/components/Search.js
import React, { useState, useEffect, useCallback } from 'react';
import { getWords } from '../services/firebase';

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [words, setWords] = useState([]); // Store all words

  // Fetch all words when the component mounts
  useEffect(() => {
    const fetchWords = async () => {
      const wordsData = await getWords();
      setWords(wordsData);
    };
    fetchWords();
  }, []);

  // Handle search logic
  const handleSearch = useCallback(() => {
    const filteredWords = words.filter(word =>
      word.word.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filteredWords);
  }, [query, words]);

  // Trigger search whenever the query changes
  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a word"
      />
      <ul>
        {results.length > 0 ? (
          results.map((word, index) => (
            <li key={index}>{word.word}: {word.definition}</li>
          ))
        ) : (
          <p>No results found.</p>
        )}
      </ul>
    </div>
  );
};

export default Search;