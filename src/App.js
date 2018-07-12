import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import './style/main.sass'

import Navbar from './components/Navbar'
import Search from './components/Search'
import ImagesResults from './components/ImageResults'

export default class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      images: []
    }
  }
  render(){
    return(
      <MuiThemeProvider>
        <div>
          <Navbar/>
          <div className='container'>
            <Search onSearch={images => this.setState({images})}/>
            <br/>
            {this.state.images.length > 0 ? (<ImagesResults images={this.state.images}/>) : null}
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}
