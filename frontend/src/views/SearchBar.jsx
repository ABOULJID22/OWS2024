import React, { useState } from 'react';

function SearchBar({ setSearchTerm }) {
  const [localSearchTerm, setLocalSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setLocalSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setSearchTerm(localSearchTerm);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-5">
          <form onSubmit={handleSearchSubmit}>
            <div className="input-group mb-3">
              <input
                type="search"
                className="form-control"
                placeholder="Search"
                aria-label="Search"
                onChange={handleSearchChange}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-outline-success"
                  type="submit"
                >
                  Search
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
