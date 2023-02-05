import React from "react";
import { Track } from "../Track/Track";

export class TrackList extends React.Component {
  render() {
    const tracks = this.props.searchResults.map(track => {
      return <Track track={track} key={track.id}/>;
    })

    return (
      <div className="TrackList">
        {tracks}
      </div>
    );
  }
}
