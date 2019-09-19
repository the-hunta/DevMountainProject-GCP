import React, { Component } from 'react'
import axios from 'axios'
import './Dash.css'

import MustSee from './MustSee'
import MightSee from './MightSee'
import CreateLocation from './CreateLocation';

// import EditLocation from './EditLocation'
// import CreateLocation from './CreateLocation'

export default class Dash extends Component {
    constructor() {
        super()

        this.state = {
            MightSeeLocations: [],
            MustSeeLocations: [],
            locations: [],
        }
    }

    componentDidMount() {
        this.getMightSee()
        this.getMustSee()

    }

    getMightSee() {
        axios.get('/api/MightSeeLocations').then((res) => {
            this.setState({
                MightSeeLocations: res.data
            })
        }).catch(err => console.log('Can\'t get Location', err))
    }

    getMustSee() {
        axios.get('/api/MustSeeLocations').then((res) => {
            this.setState({
                MustSeeLocations: res.data
            })
        }).catch(err => console.log('Cannot get Location', err))

    }

    //MIGHT MIGHT

    createLocationMight = newLocation => {
        axios.post('/api/MightSeeLocations', newLocation).then(res => {
            console.log(res.data)
            this.getMightSee()
            // this.setState({
            //     MightSeeLocations: res.data
            // })
        }).catch(err => console.log(err))

    }

    updateLocationMight = (id, updatedLocation) => {
        console.log(updatedLocation, id)
        axios.put(`/api/MightSeeLocations/${id}`, updatedLocation)
            .then(res => this.getMightSee())
            .catch(err => console.log(err))
    
    }

    deleteLocationMight = id => {
        console.log(id)
        axios.delete(`/api/MightSeeLocations/${id}`)
            .then(res =>{console.log(res.data); this.getMightSee()})
            .catch(err => console.log(err))
    }

    //MUST LIST

    createLocationMust = newLocation => {
        console.log(newLocation)
        axios.post('/api/MustSeeLocations', newLocation).then(res => {
            console.log(res.data)
            this.getMustSee()
           
        }).catch(err => console.log(err))

    }

    updateLocationMust = (id, updatedLocation) => {
        console.log(updatedLocation, id)
        axios.put(`/api/MustSeeLocations/${id}`, updatedLocation)
            .then(res => this.getMustSee())
            .catch(err => console.log(err))
    }

    deleteLocationMust = id => {
        console.log(id)
        axios.delete(`/api/MustSeeLocations/${id}`)
            .then(res => {console.log(res.data); this.getMustSee()})
            .catch(err => console.log(err))
    }

    render() {
        return (
            <div  className='DashCont' >

                <div className='mustSeeCont'> 
                <CreateLocation createLocationMust={this.createLocationMust} createLocationMight={this.createLocationMight} />
                <h1 className='header_must'>Might See</h1>
                {this.state.MightSeeLocations.map(location => {
                    return <MightSee key={location.id} location={location} updateLocationMight={this.updateLocationMight} deleteLocationMight={this.deleteLocationMight} />
                })}

            </div>  

            <div className='mightSeeCont'>
            <h1 className='header_might'>Must See</h1>
                {this.state.MustSeeLocations.map(location => {
                    return <MustSee key={location.id} location={location} updateLocationMust={this.updateLocationMust} deleteLocationMust={this.deleteLocationMust} />
                })}

            </div>



            </div>
        )
    }
}
