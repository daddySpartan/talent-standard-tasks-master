import React from 'react';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import  {Select } from '../Form/Select.jsx';

export default class EditSkill extends React.Component {
    constructor(props) {
        super(props);
        const editskill = props.currentSkill ?
        Object.assign({},props.currentSkill) : 
        {
            id: "",
            userId: "",
            skill: "",
            experienceLevel: "",
        }


        this.state = {       
            newS: editskill
        }
        this.renderEdit = this.renderEdit.bind(this)
        this.renderClose = this.renderClose.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.saveChange = this.saveChange.bind(this)        
    }

    handleChange(event) {
        const data = Object.assign({}, this.state.newS)
        data[event.target.name] = event.target.value
        this.setState({
            newS: data
        })
    }

    saveChange() {
        const data = this.state.newS
        const id = this.state.newS.id
        this.props.closeEdit()
        this.props.updateSkill(data,id)       
    }




    render() {
        return (
            this.props.showEdit ? this.renderEdit() : this.renderClose()
        )
    }


    renderEdit() {

        const levelOptions = [
            { key: '1', value: 'Beginner', title: 'Beginner' },
            { key: '2', value: 'Intermediate', title: 'Intermediate' },
            { key: '3', value: 'Expert', title: 'Expert' },
        ]
    

        return(
            <React.Fragment>

                <tr className="" >
                    <td className="">
                        <ChildSingleInput
                            inputType="text"                       
                            name="skill"
                            value={this.props.currentSkill.skill}
                            controlFunc={this.handleChange}
                            maxLength={20}
                            placeholder={this.props.currentSkill.skill}
                            errorMessage="Please enter a valid skill"
                        />                        
                    </td>
                    <td className="">
                        <Select                         
                            placeholder={this.props.currentSkill.experienceLevel}
                            value={this.props.currentSkill.experienceLevel}
                            controlFunc={this.handleChange}
                            name="experienceLevel"
                            options= {levelOptions}
                        />
                        
                    </td>
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
     