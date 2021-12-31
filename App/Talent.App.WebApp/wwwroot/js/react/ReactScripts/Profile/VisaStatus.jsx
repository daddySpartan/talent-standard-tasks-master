import React from 'react'
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import  {Select } from '../Form/Select.jsx';
import {format } from 'date-fns';

export class VisaStatus extends React.Component {
    constructor(props) {
        super(props)
        const visastatus = props.visaStatus ?
            props.visaStatus : ""              
        const visaexpiry = props.visaExpiryDate ?
            props.visaExpiryDate : null              
        this.state = {
            newVisaStatus : visastatus,
            newVisaExpiry : visaexpiry,
            type : 'text'
            
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleDate = this.handleDate.bind(this)
        this.saveChange = this.saveChange.bind(this)
        this.renderVisaDate = this.renderVisaDate.bind(this)
        this.checkVisa = this.checkVisa.bind(this)
        this.formatDate = this.formatDate.bind(this)
        this.onFocus = this.onFocus.bind(this)
        this.onBlur = this.onBlur.bind(this)
          
    }   
    
    handleChange(event) {
        var data = Object.assign({}, this.state.newVisaStatus)
        const name = event.target.name;
        let value = event.target.value;  

        data[name] = value           
        this.setState({
            newVisaStatus: data
        })

        if (!this.checkVisa(value)) {
            var resetDate = Object.assign({}, this.state.newVisaExpiry)
            resetDate['visaExpiryDate'] = null
            data = Object.assign(data,resetDate)
            this.setState({
                newVisaExpiry: null
            })
        }
        this.props.saveProfileData(data)
    }    

    handleDate(event) {
        const data = Object.assign({}, this.state.newVisaExpiry)
        data[event.target.name] = event.target.value
        this.setState({
            newVisaExpiry: data
        })
    }

    saveChange() {
        const data = Object.assign({}, this.state.newVisaExpiry)
        this.props.saveProfileData(data)
        console.log(data)
    }

    checkVisa(val) {
        if (val === 'Work Visa') return true
        if (val === 'Student Visa') return true
        if (val === 'Citizen') return false
        if (val === 'Permanent Resident') return false
        if (val === null) return false

        console.log(this.state.newVisaStatus)
        console.log(this.state.newVisaExpiry)
    }

    formatDate (_date) {
        var date = new Date(_date);
        var formattedDate = format(date, "dd/MM/yyyy");
        return(formattedDate)           
    }
        
    onFocus() {
        this.setState({
          type: 'date'
        });
      }
    onBlur() {
    
        this.setState({
          type: 'text'
        });
      }

    render() {
        const {newVisaStatus} = this.state
        const visaOptions = [
            { key: '1', value: 'Citizen', title: 'Citizen' },
            { key: '2', value: 'Permanent Resident', title: 'Permanent Resident' },
            { key: '3', value: 'Work Visa', title: 'Work Visa' },
            { key: '4', value: 'Student Visa', title: 'Student Visa' },
        ]    

        return (
            <React.Fragment>
                <div className="row">
                    <div className="five wide column">
                        Visa Type
                        <Select 
                            placeholder={this.props.visaStatus ? this.props.visaStatus : "Visa Type"}
                            
                            value={newVisaStatus ? newVisaStatus : ""}
                            controlFunc={this.handleChange}
                            name="visaStatus"
                            options= {visaOptions}
                        />
                    </div>   
                    {this.checkVisa(this.props.visaStatus) ? this.renderVisaDate() : null} 
                </div>
            </React.Fragment>
        )            
    }

    renderVisaDate() {
        
        return (
        <React.Fragment>
            <div className="five wide column">
                Visa expiry date
                {/*<ChildSingleInput
                    inputType="date"
                    name="visaExpiryDate"
                    value={this.props.visaExpiryDate ? this.formatDate(this.props.visaExpiryDate) : ""}
                    data={this.props.visaExpiryDate ? this.formatDate(this.props.visaExpiryDate) : ""}
                    //label="Visa expiry date"
                    controlFunc={this.handleDate}
                    placeholder={this.props.visaExpiryDate ? this.formatDate(this.props.visaExpiryDate) : "Expiry date"}
                    errorMessage="Please enter a valid expiry date"
                />               
                <label>{this.props.label}</label>*/}
                <input
                    type={this.state.type}
                    onFocus={this.onFocus}
                    onBlur={this.onBlur}
                    name="visaExpiryDate"
                    //value={this.state.newVisaExpiry ? this.formatDate(this.state.newVisaExpiry) : ""}                    
                    placeholder={this.props.visaExpiryDate ? this.formatDate(this.props.visaExpiryDate) : "Expiry date"}                  
                    onChange={this.handleDate}
                />
               
    
            </div>
            <div className="six wide column">
                <br></br>
            <button type="button" className="ui teal button" onClick={this.saveChange}>Save</button> 
            </div>
        </React.Fragment>
        )

    }
}