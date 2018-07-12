import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { GridList, GridTile } from 'material-ui/GridList'
import IconButton from 'material-ui/IconButton'
import ZoomIn from 'material-ui/svg-icons/action/zoom-in'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

class ImageResults extends Component {
    constructor(props){
        super(props)
        this.state = {
            open: false,
            currentImg: ''
        }
    }
    render() {
        let imageListContent
        const { images } = this.props
        if(images){
            imageListContent = (
                <GridList>
                    {
                        images.map(img=>(
                            <GridTile
                                title={img.tags}
                                key={img.id}
                                subtitle={<span>by <strong>{img.user}</strong></span>}
                                actionIcon={
                                    <IconButton onClick={()=> this.setState({open: true, currentImg: img.largeImageURL})}>
                                        <ZoomIn color="#fff"/>
                                    </IconButton>
                                }
                            >
                                <img src={img.largeImageURL}/>
                            </GridTile>
                        ))
                    }   
                </GridList>
            )
        }
        const actions = [
            <FlatButton label="Close" primary={true} onClick={()=>this.setState({open: false})}/>
        ]
        return (
            <div>
                {imageListContent}
                <Dialog
                    modal={false}
                    actions={actions}
                    open={this.state.open}
                    onRequestClose={()=>this.setState({open: false, currentImg: ''})}
                >
                    <img src={this.state.currentImg} style={{width: '100%', height: 'auto'}}/>
                </Dialog>
            </div>
        )
    }
}

ImageResults.propTypes = {
    images: PropTypes.array.isRequired
}

export default ImageResults