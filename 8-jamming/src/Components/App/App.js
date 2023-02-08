import React from "react";
import { SearchBar } from "../SearchBar/SearchBar";
import { SearchResults } from "../SearchResults/SearchResults";
import { Playlist } from "../Playlist/Playlist";
import { Spotify } from "../../util/Spotify";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: "New Playlist",
      playlistTracks: [],
    };

    this.removeTrack = this.removeTrack.bind(this);
    this.addTrack = this.addTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
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

  updatePlaylistName(name) {
    this.setState({ playlistName: name });
  }

  savePlaylist() {
    const trackURIs = this.state.playlistTracks.map((track) => track.uri);

    Spotify.savePlaylist(this.state.playlistName, trackURIs)
    .then(() => {
      this.setState({
        playlistName: "New Playlist",
        playlistTracks: [],
      });
    });
  }

  search(searchValue) {
    Spotify.search(searchValue).then((searchResults) => {
      this.setState({
        searchResults: searchResults,
      });
    });
  }

  render() {
    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}
            />
            <Playlist
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
