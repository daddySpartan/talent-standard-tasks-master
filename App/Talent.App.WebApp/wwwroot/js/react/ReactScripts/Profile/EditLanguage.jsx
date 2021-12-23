import React from 'react';
import Cookies from 'js-cookie';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import  {Select } from '../Form/Select.jsx';

export default class EditLanguage extends React.Component {
    constructor(props) {
        super(props);
        const editlanguage = props.currentLanguage

        this.state = {
            newL: { 
                language: editlanguage.language,
                languageLevel:editlanguage.languageLevel,
            },
        }
        this.renderEdit = this.renderEdit.bind(this)
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
        this.props.closeEdit

    }




    render() {
        return (
            this.props.showEdit ? this.renderEdit() : this.renderClose()
        )
    }


    renderEdit() {

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
                        name="language"
                        value={this.state.newL.language}
                        controlFunc={this.handleChange}
                        maxLength={20}
                        placeholder={this.state.newL.language}
                        errorMessage="Please enter a valid language"
                    />
                </div>
                <div className="five wide column">
                    <Select                         
                        placeholder={this.state.newL.languageLevel}
                        value={this.state.newL.languageLevel}
                        controlFunc={this.handleChange}
                        name="languageLevel"
                        options= {levelOptions}
                    />
                </div>

                <div className = "six wide column" >       
                    <button type="button" className="ui basic blue button" onClick={this.saveChange}>Update</button>
                    <button type="button" className="ui basic red button" onClick={this.props.closeEdit}>Cancel</button>
                </div>  
            </div>
        </React.Fragment>
        
    )}

    renderClose() {

    return(null)}


}
     