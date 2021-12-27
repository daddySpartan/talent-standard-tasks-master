import React from 'react';
import { ChildSingleInput,SingleInput } from '../Form/SingleInput.jsx';
import  {Select } from '../Form/Select.jsx';

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
            newXp: editxp
        }
        this.renderEdit = this.renderEdit.bind(this)
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
        const id = this.state.newXp.id
        this.props.closeEdit()
        this.props.updateXp(data,id)       
    }




    render() {
        return (
            this.props.showEdit ? this.renderEdit() : this.renderClose()
        )
    }


    renderEdit() {

        return(
            <React.Fragment>

                <tr className="" >
                    <td className="">
                        <ChildSingleInput
                            inputType="text"                       
                            name="company"
                            value={this.props.currentXp.company}
                            controlFunc={this.handleChange}
                            maxLength={20}
                            placeholder={this.props.currentXp.company}
                            errorMessage="Please enter a valid company"
                        />                        
                    </td>
                    <td className="">
                        <ChildSingleInput
                            inputType="text"                       
                            name="position"
                            value={this.props.currentXp.position}
                            controlFunc={this.handleChange}
                            maxLength={20}
                            placeholder={this.props.currentXp.position}
                            errorMessage="Please enter a valid position"
                        />                        
                        
                    </td>
                </tr>
                <tr className="" >
                    <td className="">
                        <SingleInput
                            inputType="date"                       
                            name="start"
                            value={this.props.currentXp.start}
                            controlFunc={this.handleChange}
                        
                            placeholder={this.props.currentXp.start}
                            errorMessage="Please enter a valid start date"
                        />                        
                    </td>
                    <td className="">
                        <SingleInput
                            inputType="date"                       
                            name="end"
                            value={this.props.currentXp.end}
                            controlFunc={this.handleChange}
                            
                            placeholder={this.props.currentXp.end}
                            errorMessage="Please enter a valid end date"
                        />                        
                        
                    </td>
                </tr>
                <tr className="" >
                    <td className="">
                        <ChildSingleInput
                            inputType="text"                       
                            name="responsibilities"
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
     