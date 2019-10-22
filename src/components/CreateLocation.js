import React, { Component } from 'react'
import './CreateLocation.css'
import { thisTypeAnnotation } from '@babel/types';

export default class CreateLocation extends Component {
    constructor(props){
        super(props)


        this.state = {
            mustSee: false,
            mightSee: true,
            country: "",
            state_provence: "",
            city: "",
            imageUrl: "",
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
        let newLocation = this.state

        if (!this.isValid()) {
            this.setState({
                showError: true
            }) 

            alert ("Please fill required fields") 
            return false;
        }   
      
        delete newLocation.isValid

        this.props.createLocation(newLocation) 

        this.setState({
            mustSee: false,
            mightSee: true,
            country: "",
            state_provence: "",
            city: "",
            imageUrl: "",
            showError: false,
            
        })
    }


    handleToggle = () => {

        this.setState({
            mustSee: !this.state.mustSee,
            mightSee: !this.state.mightSee
        })
        console.log(this.state)
    }


  
    render(){
        let errorMessage = ""
        if (!this.isValid() && this.state.showError) {
            errorMessage = <div>Please enter a value for all fields</div>;
        }
        return (

             <div id='Createlocation'>
                 
                    {errorMessage}

                <input className='input'
                    type="text"
                    name="country"
                    value={this.state.country}
                    placeholder="Country"
                    onChange={this.handleChange}
                    required
                         />

                <input className='input'
                    type="text"
                    name="state_provence"
                    value={this.state.state_provence}
                    placeholder="State or Provence"
                    onChange={this.handleChange}
                    required
                         />

                <input className='input'
                   type="text"
                    name="city"
                    value={this.state.city}
                    placeholder="City"
                    onChange={this.handleChange}
                    required/>

                <input className='input'
                    type="text"
                    name="imageUrl"
                    value={this.state.imageUrl}
                    placeholder="imageUrl"
                    onChange={this.handleChange}
                    required
                         />

                <input type='checkbox' className='input'
                    onChange={this.handleToggle} defaultChecked={false} checked={this.state.mustSee} />


                <button className='input' onClick={this.handleClick}>submit</button>

            </div>
         
        )
    }
}


