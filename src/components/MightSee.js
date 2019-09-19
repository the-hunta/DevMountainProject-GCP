import React, { Component } from 'react'
import EditLocation from './EditLocation';

import './MightSee.css'

export default class MightSee extends Component {
    constructor(props){
    super(props)

    this.state = {
        edit: false,
        mightSee: false,

        }
    }

    toggleEdit = () => {
        this.setState({
            edit: !this.state.edit,
            mightSee: true,

        })
    }

    render() {
        let { location } = this.props 
        return(
            <div className='Mightsee'>
                <img src={location.imageUrl} alt="" width="350px" height="250px"/>
                {this.state.edit ? 
                <EditLocation id={location.id} location={location} mightSee={this.state.mightSee} updateLocationMight={this.props.updateLocationMight}  toggleEdit={this.toggleEdit}/>
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
                <button onClick={() => this.props.deleteLocationMight(location.id)}>delete</button>

            </div>
        )

    }
}