import React from 'react';
import { ChildSingleInput,SingleInput } from '../Form/SingleInput.jsx';
import  {Select } from '../Form/Select.jsx';

export default class AddXp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            newXp: { 
      
                company: "",
                position: "",
                responsibilities: "",
                start: "",
                end: ""
            },
        }
        this.renderAdd = this.renderAdd.bind(this)
        this.renderClose = this.renderClose.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.saveChange = this.saveChange.bind(this)
        

    }

    handleChange(event) {
        const data = Object.assign({}, this.state.newXp)
        data[event.target.name] = event.target.value
        this.setState({
            newXp: data
        })
    }

    saveChange() {
        const data = this.state.newXp
        this.props.closeAdd
        this.props.addXp(data) 
        //console.log(data)      

    }

    render() {
        return (
            this.props.showAdd ? this.renderAdd() : this.renderClose()
        )
    }


    renderAdd() {

   

    return(
        <React.Fragment>
            <div className="row">
                <div className="eight wide column">
                    <ChildSingleInput
                        inputType="text"
                        name="company"
                        value="Company"
                        controlFunc={this.handleChange}
                        maxLength={20}
                        placeholder={"Add company"}
                        errorMessage="Please enter a valid company"
                    />
                </div>
                <div className="eight wide column">
                    <ChildSingleInput
                        inputType="text"
                        name="position"
                        value="Position"
                        controlFunc={this.handleChange}
                        maxLength={20}
                        placeholder={"Add position"}
                        errorMessage="Please enter a valid position"
                    />
                </div>
            </div>
            <div className="row">
                <div className="eight wide column">
                    <SingleInput
                        inputType="date"
                        name="start"
                        value="Start"
                        controlFunc={this.handleChange}
                        placeholder={"Add start date"}
                        errorMessage="Please enter a valid start date"
                    />
                </div>
                <div className="eight wide column">
                    <SingleInput
                        inputType="date"
                        name="end"
                        value="End"
                        controlFunc={this.handleChange}
                        placeholder={"Add end date"}
                        errorMessage="Please enter a valid end date"
                    />
                </div>
            </div>
            <div className="row">
                <div className="sixteen wide column">
                    <ChildSingleInput
                        inputType="text"
                        name="responsibilities"
                        value="Responsibilities"
                        controlFunc={this.handleChange}
                        maxLength={100}
                        placeholder={"Add responsibilities"}
                        errorMessage="Please enter a valid responsibility"
                    />
                </div>
            </div>
            <div className="row">
                <div className = "six wide column" >       
                    <button type="button" className="ui teal button" onClick={this.saveChange}>Add</button>
                    <button type="button" className="ui button" onClick={this.props.closeAdd}>Cancel</button>
                </div>  
            </div>
        </React.Fragment>
        
    )}

    renderClose() {

    return(null)}


}
     