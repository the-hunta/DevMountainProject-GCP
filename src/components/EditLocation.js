import React, { Component } from 'react'

export default class EditLocation extends Component {
    constructor(props) {
        super(props)
        const {location} = this.props

        this.state = {

            mustSee: location.mustSee,
            mightSee: location.mightSee,
            country:  location.country,
            state_provence: location.state_provence,
            city: location.city,
            imageUrl: location.imageUrl

        }
    }

    handleChange = e => {
        let { name, value } = e.target
        this.setState({
            [name]: value
        })

    }

    handleClick = () => {
        const { id } = this.props
        
        if(this.props.mightSee) {
        this.props.updateLocationMight(id, this.state)
        }else{
        this.props.updateLocationMust(id, this.state)
        }
        this.props.toggleEdit()
    }

    




    render() { 
        console.log(this.props)
        return (
            <div className='div'>
                <input
                    type="text"
                    name="country"
                    value={this.state.country}
                    placeholder="Country"
                    onChange={this.handleChange} />
                <input
                    type="text"
                    name="state_provence"
                    value={this.state.state_provence}
                    placeholder="State_provence"
                    onChange={this.handleChange} />
                <input
                    type="text"
                    name="city"
                    value={this.state.city}
                    placeholder="City"
                    onChange={this.handleChange} />
                <input
                    type="imgUrl"
                    name="imageUrl"
                    value={this.state.imageUrl}
                    placeholder="imageUrl"
                    onChange={this.handleChange} />
                <button onClick={this.handleClick}>update location </button>

            </div>
        )
    }
}