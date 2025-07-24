import { useState, useCallback } from "react";

export default function Searchbar({ onSubmit }) {
  const [input, setInput] = useState("");

  const handleChange = useCallback((e) => {
    setInput(e.target.value);
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (input.trim()) {
        onSubmit(input);
        setInput("");
      }
    },
    [input, onSubmit]
  );

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={handleSubmit}>
        <button type="submit" className="SearchForm-button">
          🔍
        </button>
        <input
          className="SearchForm-input"
          type="text"
          value={input}
          onChange={handleChange}
          autoComplete="off"
          autoFocus
          placeholder="Search images..."
        />
      </form>
    </header>
  );
}
