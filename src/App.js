import { useState, useEffect } from "react";

import CardList from "./components/card-list/card-list.component";
import SearchBox from "./components/search-box/search-box.component";
import "./App.css";

const App = () => {
  const [monsters, setMonsters] = useState([]);
  const [searchField, setSearchField] = useState("");
  const [filteredMonsters, setFilteredMonsters] = useState(monsters);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => setMonsters(data))
      .catch((error) => console.log("Some error occurred"));
  }, []);

  useEffect(() => {
    const newMonsters = monsters.filter((monster) =>
      monster.name.toLowerCase().includes(searchField)
    );
    setFilteredMonsters(newMonsters);
  }, [monsters, searchField]);

  const onSearchChange = (event) => {
    const inputValue = event.target.value.toLowerCase();
    setSearchField(inputValue);
  };

  return (
    <div className="App">
      <h1 className="app-title">Monsters Rolodex</h1>
      <SearchBox
        onChangeHandler={onSearchChange}
        placeholder="search monsters"
        className="search-box"
      />
      <CardList monsters={filteredMonsters} />
    </div>
  );
};

export default App;
