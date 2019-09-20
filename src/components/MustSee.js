import React, { Component } from 'react'
import EditLocation from './EditLocation';

import './MustSee.css'

export default class MustSee extends Component {
    constructor(props){
    super(props)

    this.state = {
        edit: false
        }
    }

    toggleEdit = () => {
        this.setState({
            edit: !this.state.edit
        })
    }

    render() {
        let { location } = this.props 
        let imageUrl = 'https://png.pngtree.com/png-vector/20190120/ourlarge/pngtree-gallery-vector-icon-png-image_470660.jpg'
        if (location.imageUrl) {
            imageUrl = location.imageUrl 
        }

        return(
            <div className='MustSee'> 
                <img src={imageUrl} alt="Location Image" width="350px" height="250px" />
                {this.state.edit ? 
                <EditLocation id={location.id} location={location} updateLocationMust={this.props.updateLocationMust} toggleEdit={this.toggleEdit}/>
                :
                 <div>
                    <p>Country: {location.country}</p>
                    <p>State or Provence: {location.state_provence}</p>
                    <p>City: {location.city}</p>

                </div>
                }
                {this.state.edit ?
                    <button onClick={this.toggleEdit}>cancel</button>
                    :
                    <button onClick={this.toggleEdit}>edit</button>
                    }
                <button onClick={() => this.props.deleteLocationMust(location.id)}>delete</button>

            </div>
        )

    }
}

