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
            imageUrl: location.imageUrl,
            showError: false,

        }
    }


    isValid = () => {
        let location = this.state
        return !(location.city === "" || location.country === "" || location.state_provence === "" || location.imageUrl === "")
    }

    handleChange = e => {
        let { value, name } = e.target

        this.setState({
            [name]: value,
            showError: false,
        })
    }


    handleClick = () => {
        const { id } = this.props

        if (!this.isValid()) {
            this.setState({
                showError: true
            }) 

            alert ("Please fill required fields") 
            return false;
        }  
     
        this.props.updateLocation(id, this.state)
    
        this.props.toggleEdit()
    }


    render() { 
        let errorMessage = ""
        if (!this.isValid() && this.state.showError) {
            errorMessage = <div>Please enter a value for all fields</div>;
        }
        return ( 

            <div className='div'>

                {errorMessage}

                <input
                    type="text"
                    name="country"
                    value={this.state.country}
                    placeholder="Country"
                    onChange={this.handleChange} 
                    required/>
                <input
                    type="text"
                    name="state_provence"
                    value={this.state.state_provence}
                    placeholder="State_provence"
                    onChange={this.handleChange} 
                    required/>
                <input
                    type="text"
                    name="city"
                    value={this.state.city}
                    placeholder="City"
                    onChange={this.handleChange} 
                    required/>
                <input
                    type="imgUrl"
                    name="imageUrl"
                    value={this.state.imageUrl}
                    placeholder="imageUrl"
                    onChange={this.handleChange}
                    required />
                <button onClick={this.handleClick}>update location </button>

            </div>
        )
    }
}