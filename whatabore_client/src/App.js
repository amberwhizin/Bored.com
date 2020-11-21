import React, { Component } from 'react'
import Spotify from './components/music-components/Spotify'
import Index from './components/website/Index'

export default class App extends Component {
  render() {
    return (
      <div>
         <Index />
        <Spotify />
      
      </div>
    )
  }
}
