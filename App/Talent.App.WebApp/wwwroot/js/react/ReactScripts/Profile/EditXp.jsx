import React from 'react';
import { ChildSingleInput,SingleInput } from '../Form/SingleInput.jsx';
import {format } from 'date-fns';

export default class EditXp extends React.Component {
    constructor(props) {
        super(props);
        const editxp = props.currentXp ?
        Object.assign({},props.currentXp) : 
        {
            id: "",
            company: "",
            position: "",
            responsibilities: "",
            start: "",
            end: "",
        }

        this.state = {       
            newXp: editxp,
            type : 'text'
        }
        this.renderEdit = this.renderEdit.bind(this)
        this.renderClose = this.renderClose.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.saveChange = this.saveChange.bind(this)        
        this.formatDate = this.formatDate.bind(this)
        this.onFocus = this.onFocus.bind(this)
        this.onBlur = this.onBlur.bind(this)

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
        const id = this.state.newXp.id
        this.props.closeEdit()
        this.props.updateXp(data,id)       
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
        return (
            this.props.showEdit ? this.renderEdit() : this.renderClose()
        )
    }


    renderEdit() {

        return(
            <React.Fragment>

                <tr className="">
                    <td className="" colSpan="3">
                        <ChildSingleInput
                            inputType="text"                       
                            name="company"
                            label="Company:"
                            value={this.props.currentXp.company}
                            controlFunc={this.handleChange}
                            maxLength={20}
                            placeholder={this.props.currentXp.company}
                            errorMessage="Please enter a valid company"
                        />                        
                    </td>
                    <td className="" colSpan="3">
                        <ChildSingleInput
                            inputType="text"                       
                            name="position"
                            label="Position:"
                            value={this.props.currentXp.position}
                            controlFunc={this.handleChange}
                            maxLength={20}
                            placeholder={this.props.currentXp.position}
                            errorMessage="Please enter a valid position"
                        />                        
                        
                    </td>
                </tr>
                <tr className="">
                    <td className="" colSpan="3">
                        {/*<ChildSingleInput
                            inputType="date"                       
                            name="start"
                            label="Start date:"
                            value={this.props.currentXp.start}
                            controlFunc={this.handleChange}                       
                            placeholder={this.props.currentXp.start}
                            errorMessage="Please enter a valid start date"
                        />    */}
                        <label>Start Date:</label><br></br>
                        <input
                            type={this.state.type}
                            onFocus={this.onFocus}
                            onBlur={this.onBlur}
                            label="Start Date"
                            name="start"                                      
                            placeholder={this.props.currentXp.start ? this.formatDate(this.props.currentXp.start) : "Start date"}                  
                            onChange={this.handleDate}
                        />
                  
                    </td>
                    <td className="" colSpan="3">

                        {/*<ChildSingleInput
                            inputType="date"                       
                            name="end"
                            label="End date:"
                            value={this.props.currentXp.end}
                            controlFunc={this.handleChange}
                            
                            placeholder={this.props.currentXp.end}
                            errorMessage="Please enter a valid end date"
                        />      */}       
                         <label>End Date:</label><br></br>          
                         <input
                            type={this.state.type}
                            onFocus={this.onFocus}
                            onBlur={this.onBlur}
                            label="End date:"
                            name="end"                                      
                            placeholder={this.props.currentXp.end ? this.formatDate(this.props.currentXp.end) : "End date"}                  
                            onChange={this.handleDate}
                        />
                       
                    </td>
                </tr>
                <tr className="" >
                    <td className="" colSpan="6">
                        <ChildSingleInput
                            inputType="text"                       
                            name="responsibilities"
                            label="Responsibilities:"
                            value={this.props.currentXp.responsibilities}
                            controlFunc={this.handleChange}
                            maxLength={100}
                            placeholder={this.props.currentXp.responsibilities}
                            errorMessage="Please enter a valid responsibility"
                        />                        
                    </td>
                </tr>
                <tr className="" >
                    <td className="">
                        <button type="button" className="ui basic blue button" onClick={this.saveChange}>Update</button>
                        <button type="button" className="ui basic red button" onClick={() => this.props.closeEdit()}>Cancel</button>
                                     
                    </td>                   
                </tr>    


             </React.Fragment>       
        )
    }

    renderClose() {
        this.props.closeEdit()
        return (null)
    }


}
     