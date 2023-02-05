import React from "react";

export class Track extends React.Component {
  renderAction() {
    const buttonContent = this.props.isRemoval ? "-" : "+";
    return <button className="Track-action">{buttonContent}</button>;
  }

  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist} | {this.props.track.album}</p>
        </div>
        {this.renderAction()}
      </div>
    );
  }
}
