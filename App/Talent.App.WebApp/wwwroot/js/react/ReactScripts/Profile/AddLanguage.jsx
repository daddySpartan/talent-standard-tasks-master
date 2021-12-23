
import React from 'react';
import Cookies from 'js-cookie';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import  {Select } from '../Form/Select.jsx';

export default class AddLanguage extends React.Component {
    constructor(props) {
        super(props);
        //const addlanguage = props.currentLanguage

        this.state = {
            newL: { 
                language: "",
                languageLevel:"",
            },
        }
        this.renderAdd = this.renderAdd.bind(this)
        this.renderClose = this.renderClose.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.saveChange = this.saveChange.bind(this)
        

    }

    handleChange(event) {
        const data = Object.assign({}, this.state.newL)
        data[event.target.name] = event.target.value
        this.setState({
            newL: data
        })
    }

    saveChange() {
        const data = this.state.newL
        this.props.updateLanguage(data)
        this.props.closeAdd

    }




    render() {
        return (
            this.props.showAdd ? this.renderAdd() : this.renderClose()
        )
    }


    renderAdd() {

        const levelOptions = [
            { key: '1', value: 'Basic', title: 'Basic' },
            { key: '2', value: 'Conversational', title: 'Conversational' },
            { key: '3', value: 'Fluent', title: 'Fluent' },
            { key: '4', value: 'Native/Bilingual', title: 'Native/Bilingual' },
        ]
    

    return(
        <React.Fragment>
            <div className="row">
                <div className="five wide column">
                    <ChildSingleInput
                        inputType="text"
                        //label="Language"
                        name="language"
                        value="Language"
                        controlFunc={this.handleChange}
                        maxLength={20}
                        placeholder={"Add language"}
                        errorMessage="Please enter a valid language"
                    />
                </div>
                <div className="five wide column">
                    <Select 
                        //label = "Country"
                        placeholder="Language Level"
                        value="languageLevel"
                        controlFunc={this.handleChange}
                        name="languageLevel"
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
     