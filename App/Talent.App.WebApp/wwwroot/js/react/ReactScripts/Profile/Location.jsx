import React from 'react'
import Cookies from 'js-cookie'
import { default as Countries } from '../../../../util/jsonFiles/countries.json';
import { ChildSingleInput } from '../Form/SingleInput.jsx';

export class Address extends React.Component {
    constructor(props) {
        super(props)
        const details = props.details ?
            Object.assign({}, props.details)
            : {
                number: "",
                street: "",
                suburb: "",
                postCode: 0,
                city: "",
                country: "",

            }

        this.state = {
            showEditSection: false,
            newAddress: details
        }
        this.openEdit = this.openEdit.bind(this)
        this.closeEdit = this.closeEdit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.saveAddress = this.saveAddress.bind(this)
        this.renderEdit = this.renderEdit.bind(this)
        this.renderDisplay = this.renderDisplay.bind(this)

    }

    openEdit() {
        const details = Object.assign({}, this.props.details)
        this.setState({
            showEditSection: true,
            newAddress: details
        })
    }

    closeEdit(){
        this.setState({
            showEditSection: false
        })
    }

    handleChange(event) {
        const data = Object.assign({}, this.state.newAddress)
        data[event.target.name] = event.target.value
        if (event.target.name == "country")
        { data["city"] = "";}
       
        this.setState({
            newAddress: data
        })
    }
 


    saveAddress() {
        //console.log(this.props.componentId)
        console.log(this.state.newAddress)
        const data = Object.assign({}, this.state.newAddress)
        this.props.controlFunc(this.props.componentId, data)
        console.log(data)
        this.closeEdit()
    }


    render() {
        return (
            this.state.showEditSection ? this.renderEdit() : this.renderDisplay()
        )
    }
  
    renderEdit() {
        let countriesOptions = [];
        let citiesOptions = [];
        const selectedCountry = this.state.newAddress.country;
        const selectedCity = this.state.newAddress.city;
        
        countriesOptions = Object.keys(Countries).map((x) => <option key={x} value={x}>{x}</option>);

        if (selectedCountry != "" && selectedCountry != null ) {
           
            var popCities = Countries[selectedCountry].map(x => <option key={x} value={x}> {x}</option>);

            citiesOptions = <span><select
                label = "City"
                className="five wide column"
                placeholder="City"
                value={selectedCity}
                onChange={this.handleChange}
                name="city">
                <option value=""> Select a town or city</option>
                {popCities}
            </select></span>
        }




        return (
            <React.Fragment>
                <div className="row">
                    <div className="two wide column">
                        <ChildSingleInput
                            inputType="text"
                            label="Number"
                            name="number"
                            value={this.state.newAddress.number}
                            controlFunc={this.handleChange}
                            maxLength={5}
                            placeholder={this.state.newAddress.number ? this.state.newAddress.number :"Enter your address house number"}
                            errorMessage="Please enter a valid house number"
                        />
                    </div>
                    <div className="ten wide column">
                        <ChildSingleInput
                            inputType="text"
                            label="Street"
                            name="street"
                            value={this.state.newAddress.street}
                            controlFunc={this.handleChange}
                            maxLength={80}
                            placeholder={this.state.newAddress.street ? this.state.newAddress.street : "Enter your address street name"}
                            errorMessage="Please enter a valid street name"
                        />
                    </div>
                    <div className="four wide column">
                        <ChildSingleInput
                            inputType="text"
                            label="Suburb"
                            name="suburb"
                            value={this.state.newAddress.suburb}
                            controlFunc={this.handleChange}
                            maxLength={80}
                            placeholder={this.state.newAddress.suburb ? this.state.newAddress.suburb : "Enter your address suburb name"}
                            errorMessage="Please enter a valid suburb name"
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="six wide column">
                         Country
                        <select className="ui dropdown"
                                label = "Country"
                                placeholder="Country"
                                value={selectedCountry}
                                onChange={this.handleChange}
                                name="country">

                        <option value="">Select a country</option>
                        {countriesOptions}
                        </select>
                    </div>
                    <div className="six wide column">
                        City
                        {citiesOptions}
                    </div>
                   
                    <div className="four wide column">
                        <ChildSingleInput
                            inputType="number"
                            label="Postal Code"
                            name="postCode"
                            value={this.state.newAddress.postCode}
                            controlFunc={this.handleChange}
                            maxLength={10}
                            placeholder={this.state.newAddress.postCode ? this.state.newAddress.postCode : "Enter your address postal code"}
                            errorMessage="Please enter a valid postal code number"
                        />
 
 
                    </div>
                
                </div>

                <div className="sixteen wide column">
                <button type="button" className="ui teal button" onClick={this.saveAddress}>Save</button>
                <button type="button" className="ui button" onClick={this.closeEdit}>Cancel</button>
                </div>
            </React.Fragment>
        )
    }

    renderDisplay()
    {

        let fullAddress = this.props.details ? `${this.props.details.number} ${this.props.details.street} ${this.props.details.suburb} ${this.props.details.postCode}` : ""
        let city = this.props.details ? this.props.details.city : ""
        let country = this.props.details ? this.props.details.country : ""
        
        return (
            <div className='row'>
                <div className="ui sixteen wide column">
                    <React.Fragment>
                        <p>Address: {fullAddress}</p>
                        <p>City: {city}</p>
                        <p>Country: {country}</p>
                    </React.Fragment>
                    <button type="button" className="ui right floated teal button" onClick={this.openEdit}>Edit</button>
                </div>
            </div>
        )

    }


}

export class Nationality extends React.Component {
    constructor(props) {
        super(props)
        const nationality = props.nationalityData ?
            props.nationalityData : ""              
        this.state = {
            newNationality : nationality,
        }
        this.handleChange = this.handleChange.bind(this)
      
    }



    handleChange(event) {
        var data = Object.assign({}, this.state.newNationality)
        const name = event.target.name;
        let value = event.target.value;

        data[name] = value
       
        this.setState({
            newNationality: value
        })
        console.log(data)
        console.log(this.state.newNationality)
        this.props.saveProfileData(data)
    }

 
    
    render() {
        let nationalityOptions = [];
        let country = this.state.newNationality ? this.state.newNationality : this.props.nationalityData
        const selectedNationality = this.state.newNationality;
        nationalityOptions = Object.keys(Countries).map((x) => <option key={x} value={x}>{x}</option>);


        return (
            <React.Fragment>
                    <div className="six wide column">
                        <select className="ui dropdown"
                                //label="Nationality"
                                //placeholder="Nationality"
                                value={selectedNationality}
                                onChange={this.handleChange}
                                name="nationality"
                        >

                        <option value="">{country ? country: "Select your nationality"}</option>
                        {nationalityOptions}
                        </select>
                    </div>
            </React.Fragment>
        )
 
        
    }
}