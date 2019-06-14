import React, { Component } from 'react';
import "./styles/RadioSet.css";

import Playlist from './Playlist';

class RadioSet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tracks: this.props.tracks,
    }
  }

  removeTrack(list, song) {
    return list.filter(element => element !== song)
  }

  findSong(list, id) {
    return list.find(song => song.id === id)
  }

  updateFavorite = (id) => {
    let trackList = this.state.tracks;
    let song = this.findSong(trackList, id);
    for (const track in trackList) {
       if (trackList[track].id === song.id) {
          trackList[track].favorite = !trackList[track].favorite;
          break;
       }
    }
    this.setState({tracks: trackList});
  };

  updateTrackOrder = (id) => {
    let trackList = this.state.tracks;
    const song = this.findSong(trackList, id);
    let updatedTracklist = this.removeTrack(trackList, song);

    if(song.id < this.state.tracks.length / 2){
      updatedTracklist.unshift(song);
      this.setState({tracks: updatedTracklist});
    } else {
      updatedTracklist.splice(this.state.tracks.length / 2, 0, song)
      this.setState({tracks: updatedTracklist});
    };
  };

  switchTrack = (id) => {
    let trackList = this.state.tracks;
    const song = this.findSong(trackList, id);
    const index = trackList.findIndex(song => song.id === id);
    let updatedTracklist = this.removeTrack(trackList, song);

    if (index < this.state.tracks.length / 2){
      updatedTracklist.splice(this.state.tracks.length / 2, 0, song)
      this.setState({tracks: updatedTracklist});
    } else {
      updatedTracklist.unshift(song);
      this.setState({tracks: updatedTracklist});
    };
  };

  // calculateHalfTime = () => {
  //   let minutes = 0;
  //   let seconds = 0;
  //   this.state.tracks.forEach((track) => {
  //     const times = track.playtime.split(':');
  //     minutes += parseInt(times[0]);
  //     seconds += parseInt(times[1]);
  //   });
  //
  //   seconds += minutes * 60;
  //   return Math.floor(seconds / 2);
  // }
  //
  // halfwaySongIndex = () => {
  //   const midway = this.calculateHalfTime();
  //   let runningSum = 0;
  //   let i = 0;
  //   while (runningSum <= midway) {
  //     const times = this.state.tracks[i].playtime.split(':');
  //     const minutes = parseInt(times[0]);
  //     const seconds = parseInt(times[1]);
  //     runningSum += Math.floor(seconds + minutes * 60);
  //     i += 1;
  //   };
  //
  //   return (i - 1);
  // }

  render() {
    const playlists = {
      morningTracks: this.state.tracks.slice(0, this.state.tracks.length / 2),
      eveningTracks: this.state.tracks.slice(this.state.tracks.length / 2, this.state.tracks.length)
    };

    return (
      <div className="radio-set">
        <section className="radio-set--playlist-container">
          <Playlist
            side="Morning"
            tracks={playlists.morningTracks}
            updateTrackOrderCallback={ this.updateTrackOrder }
            updateFavoriteCallback={ this.updateFavorite }
            switchTrackCallback={ this.switchTrack }
          />
          <Playlist
            side="Evening"
            tracks={playlists.eveningTracks}
            updateTrackOrderCallback={ this.updateTrackOrder }
            updateFavoriteCallback={ this.updateFavorite }
            switchTrackCallback={ this.switchTrack }
          />
        </section>
      </div>
    );
  }
};

export default RadioSet;
