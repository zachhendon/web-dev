import React from "react";
// import { SearchBar } from "../SearchBar/SearchBar";
import { SearchResults } from "../SearchResults/SearchResults";
// import { Playlist } from "../Playlist/Playlist";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [
        { name: "Song1", artist: "Artist1", album: "Album1" },
        { name: "Song2", artist: "Artist2", album: "Album2" },
        { name: "Song3", artist: "Artist3", album: "Album3" },
      ],
    };
  }

  render() {
    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        {/* <SearchBar /> */}
        <div className="App">
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} />
            {/* <Playlist /> */}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
