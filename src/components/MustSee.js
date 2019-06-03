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
        return(
            <div className='MustSee'> 
                <img src={location.imageUrl} alt="" width="350px" height="250px"/>
                {this.state.edit ? 
                <EditLocation id={location.id} updateLocationMust={this.props.updateLocationMust} toggleEdit={this.toggleEdit}/>
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

