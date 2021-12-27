import React from 'react';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import  {Select } from '../Form/Select.jsx';

export default class AddSkill extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            newS: { 
                skill: "",
                experienceLevel:"",
            },
        }
        this.renderAdd = this.renderAdd.bind(this)
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
        this.props.closeAdd
        this.props.addSkill(data) 
        //console.log(data)      

    }

    render() {
        return (
            this.props.showAdd ? this.renderAdd() : this.renderClose()
        )
    }


    renderAdd() {

        const levelOptions = [
            { key: '1', value: 'Beginner', title: 'Beginner' },
            { key: '2', value: 'Intermediate', title: 'Intermediate' },
            { key: '3', value: 'Expert', title: 'Expert' },
        ]
    

    return(
        <React.Fragment>
            <div className="row">
                <div className="five wide column">
                    <ChildSingleInput
                        inputType="text"
                        name="skill"
                        value="Skill"
                        controlFunc={this.handleChange}
                        maxLength={20}
                        placeholder={"Add skill"}
                        errorMessage="Please enter a valid skill"
                    />
                </div>
                <div className="five wide column">
                    <Select 
                        placeholder="Experience Level"
                        value="experienceLevel"
                        controlFunc={this.handleChange}
                        name="experienceLevel"
                        options= {levelOptions}
                    />
                </div>

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
     