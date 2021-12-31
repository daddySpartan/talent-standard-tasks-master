import React from 'react';
import { ChildSingleInput} from '../Form/SingleInput.jsx';
import moment from 'moment';

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
            type : 'text'
        }
        this.renderAdd = this.renderAdd.bind(this)
        this.renderClose = this.renderClose.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.saveChange = this.saveChange.bind(this)
        //this.formatDate = this.formatDate.bind(this)
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
        this.props.closeAdd
        this.props.addXp(data) 
        //console.log(data)      
    }

    /*formatDate (_date) {
        var date = new Date(_date);
        var formattedDate = format(date, "dd/MM/yyyy");
        return(formattedDate)           
    }*/
        
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
                        label="Company:"
                        controlFunc={this.handleChange}
                        maxLength={50}
                        placeholder={"Add company"}
                        errorMessage="Please enter a valid company"
                    />
                </div>
                <div className="eight wide column">
                    <ChildSingleInput
                        inputType="text"
                        name="position"
                        value="Position"
                        label="Position:"
                        controlFunc={this.handleChange}
                        maxLength={50}
                        placeholder={"Add position"}
                        errorMessage="Please enter a valid position"
                    />
                </div>
            </div>
            <div className="row">
                <div className="eight wide column">
                    <ChildSingleInput
                        inputType="date"
                        name="start"
                        value="Start"
                        label="Start date:"
                        controlFunc={this.handleChange}
                        placeholder={"Add start date"}
                        errorMessage="Please enter a valid start date"
                    />
                </div>
                <div className="eight wide column">
                    <ChildSingleInput
                        inputType="date"
                        name="end"
                        value="End"
                        label="End date:"
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
                        label="Responsibilities:"
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
     