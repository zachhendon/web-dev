import React from "react";
// import { SearchBar } from "../SearchBar/SearchBar";
import { SearchResults } from "../SearchResults/SearchResults";
import { Playlist } from "../Playlist/Playlist";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [
        { name: "Song1", artist: "Artist1", album: "Album1", id: 1 },
        { name: "Song2", artist: "Artist2", album: "Album2", id: 2 },
        { name: "Song3", artist: "Artist3", album: "Album3", id: 3 },
      ],
      playlistName: "My Playlist",
      playlistTracks: [
        { name: "Song4", artist: "Artist4", album: "Album4", id: 4 },
        { name: "Song5", artist: "Artist5", album: "Album5", id: 5 },
      ],
    };

    // this.addTrack({ name: "Song1", artist: "Artist1", album: "Album1", id: 1 })

    this.removeTrack = this.removeTrack.bind(this);
    this.addTrack = this.addTrack.bind(this);
  }

  addTrack(track) {
    const inPlaylistTracks = this.state.playlistTracks.some((playlistTrack) => {
      return playlistTrack.id === track.id;
    });

    if (!inPlaylistTracks) {
      this.setState({
        playlistTracks: [track, ...this.state.playlistTracks],
      });
    }
  }

  removeTrack(track) {
    this.setState({
      playlistTracks: this.state.playlistTracks.filter((playlistTrack) => {
        return playlistTrack.id !== track.id;
      }),
    });
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
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}
            />
            <Playlist playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
