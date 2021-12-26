import React from 'react';
import Cookies from 'js-cookie';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import  {Select } from '../Form/Select.jsx';

export default class EditLanguage extends React.Component {
    constructor(props) {
        super(props);
        const editlanguage = props.currentLanguage ?
        Object.assign({},props.currentLanguage) : 
        {
            id: "",
            userId: "",
            language: "",
            languageLevel: "",
        }


        this.state = {       
            newL: editlanguage
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
        const id = this.state.newL.id
        this.props.closeEdit()
        this.props.updateLanguage(data,id)       
    }




    render() {
        //console.log(this.props.showEdit)
        //console.log(this.props.keyId)
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

                <tr className="" >
                    <td className="">
                        <ChildSingleInput
                            inputType="text"                       
                            name="language"
                            value={this.props.currentLanguage.language}
                            controlFunc={this.handleChange}
                            maxLength={20}
                            placeholder={this.props.currentLanguage.language}
                            errorMessage="Please enter a valid language"
                        />                        
                    </td>
                    <td className="">
                        <Select                         
                            placeholder={this.props.currentLanguage.languageLevel}
                            value={this.props.currentLanguage.languageLevel}
                            controlFunc={this.handleChange}
                            name="languageLevel"
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
        //console.log(this.props.showEdit)
        //console.log(this.props.currentId)
        this.props.closeEdit()
        return (null)
    }


}
     