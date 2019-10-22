import React, { Component } from 'react'
import axios from 'axios'
import './Dash.css'

import LocationsMapped from './LocationsMapped'
import MustSee from './MustSee'
import MightSee from './MightSee'
import CreateLocation from './CreateLocation';

// import EditLocation from './EditLocation'
// import CreateLocation from './CreateLocation'

export default class Dash extends Component {
    constructor() {
        super()

        this.state = {
            locations: [],
        }
    }

    componentDidMount() {
        this.getLocations()

    }

    getLocations() {
        axios.get('/api/Locations').then((res) => {
            this.setState({
                locations: res.data
            })
        }).catch(err => console.log('Can\'t get Location', err))
    }
    
    createLocation = newLocation => {
        axios.post('/api/Locations', newLocation).then(res => {
            console.log(res.data)
            this.getLocations()
           
        }).catch(err => console.log(err))

    }

    updateLocation = (id, updatedLocation) => {
        console.log(updatedLocation, id)
        axios.put(`/api/Locations/${id}`, updatedLocation)
            .then(res => this.getLocations())
            .catch(err => console.log(err))
    
    }

    deleteLocation = id => {
        console.log(id)
        axios.delete(`/api/Locations/${id}`)
            .then(res =>{console.log(res.data); this.getLocations()})
            .catch(err => console.log(err))
    }



    render() {
        return (
            <div  className='DashCont' >

                <div className='mustSeeCont'> 
                    <CreateLocation createLocation={this.createLocation} createLocation={this.createLocation} />
                
                    <h1 className='header_must'>Might See</h1>
                    {this.state.locations.filter(location => location.mightSee).map(location => {
                        return <LocationsMapped key={location.id} location={location} updateLocation={this.updateLocation} deleteLocation={this.deleteLocation} />
                    })}
                </div>
            
                <div className='mightSeeCont'>
                    <h1 className='header_might'>Must See</h1>
                    {this.state.locations.filter(location => location.mustSee).map(location => {
                        return <LocationsMapped key={location.id} location={location} updateLocation={this.updateLocation} deleteLocation={this.deleteLocation} />
                    })}
                </div>
            </div>
        )
    }
}
