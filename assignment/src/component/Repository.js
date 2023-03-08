import React, { useState } from "react";
import "../App.css"
const apiUrl = "https://api.github.com/search/repositories";

const Repository = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOpts, setSortOpts] = useState("stars");
  const [repos, setRepos] = useState([]);

  //set the searching value
  const handleSearchBar = event => {
    setSearchTerm(event.target.value);
  };

  //set the sorting value
  const handleSortinng = event => {
    setSortOpts(event.target.value);
  };

  // Fetch data providing query
  const handleSearch = event => {
    event.preventDefault();
    fetch(`${apiUrl}?q=${searchTerm}&sort=${sortOpts}`)
      .then(response => response.json())
      .then(data => setRepos(data.items))
      .catch(error => console.error(error));
    console.log("response", repos);
  };

  return (
    <div className="main-container">
      <form className="searchBar" onSubmit={handleSearch}>
        <input className="serach-input-field" type="text" placeholder="Search here..." value={searchTerm} onChange={handleSearchBar} />
        <label>Filter -</label>
        <select className="filter-dropdown" value={sortOpts} onChange={handleSortinng}>
          <option value="stars">Stars</option>
          <option value="watchers">Watchers count</option>
          <option value="score">Score</option>
          <option value="name">Name</option>
          <option value="created">Created</option>
          <option value="updated">Updated</option>
        </select>
        <button className="searchButton" type="submit">Search</button>
      </form>
      <div className="card">
        {repos && repos.map(repo => (
          <div className="repo-card" key={repo.id}>
            <img src={repo.owner.avatar_url} alt={repo.owner.login} />
            <div>
              <h3>{repo.name}</h3>
              <p>{repo.stargazers_count} stars</p>
              <p>{repo.description}</p>
              <p>{repo.language}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Repository;