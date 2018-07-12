import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

import axios from 'axios'

export default class Search extends Component {
    constructor(props){
        super(props)
        this.state = {
            searchText: '',
            amount: 15,
            apiUrl: 'https://pixabay.com/api',
            apiK: 'anything'/// PIXABAY API GO HERE
            images: []
        }
        this.onTextChange = (e) => {
            let searchText = e.target.value
            this.setState({searchText}, ()=>{
                if(searchText === '')
                    return this.props.onSearch([])
                axios.get(`${this.state.apiUrl}/?key=${this.state.apiK}&q=${this.state.searchText}&image_type=photo&per_page=${this.state.amount}&safesearch=true`)
                    .then(res=> this.props.onSearch(res.data.hits))
                    .catch(err => console.error(err))
            })
        }
    }
    render() {
        return (
            <div>
                <TextField
                    name="searchText"
                    value={this.state.searchText}
                    onChange={this.onTextChange}
                    floatingLabelText="Search for Images"
                    fullWidth={true}
                />
                <br/>
                <SelectField
                    name="amount"
                    floatingLabelText="Amount"
                    value={this.state.amount}
                    onChange={(e, i, v)=> this.setState({amount: v})}
                >    
                    <MenuItem value={5} primaryText="5"/>
                    <MenuItem value={10} primaryText="10"/>
                    <MenuItem value={15} primaryText="15"/>
                    <MenuItem value={30} primaryText="30"/>
                    <MenuItem value={50} primaryText="50"/>
                </SelectField>
            </div>
        )
    }
}
