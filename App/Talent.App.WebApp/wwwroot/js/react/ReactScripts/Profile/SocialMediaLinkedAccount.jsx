/* Social media JSX */
import React, { Component } from "react";
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import { Popup, Label, Icon } from 'semantic-ui-react';


export default class SocialMediaLinkedAccount extends Component {
    constructor(props) {
        super(props)
        const details = props.details ?
            Object.assign({}, props.details)
            : {
                github: "",
                linkedIn: "",
            }

        this.state = {
            showEditSection: false,
            newAccount: details
        }
        //console.log(details)
        this.openEdit = this.openEdit.bind(this)
        this.closeEdit = this.closeEdit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.saveAccount = this.saveAccount.bind(this)
        this.renderEdit = this.renderEdit.bind(this)
        this.renderDisplay = this.renderDisplay.bind(this)


    }

   /* componentDidMount() {
        $('.ui.button.social-media')
            .popup();
    }*/

    openEdit() {
        const details = Object.assign({}, this.props.details)
        this.setState({
            showEditSection: true,
            newAccount: details
        })
    }

    closeEdit(){
        this.setState({
            showEditSection: false
        })
    }

    handleChange(event) {
        const data = Object.assign({}, this.state.newAccount)
        data[event.target.name] = event.target.value
        console.log(data)
        this.setState({
            newAccount: data
        })
    }

    saveAccount() {
        console.log(this.props.componentId)
        console.log(this.state.newAccount)
        const data = Object.assign({}, this.state.newAccount)
        this.props.controlFunc(this.props.componentId, data)
        console.log(data)
        //this.props.saveProfileData(data)
        this.closeEdit()
    }


    render() {
        return (
            this.state.showEditSection ? this.renderEdit() : this.renderDisplay()
        )


    }

    renderEdit() {
        return (
            <div className='ui sixteen wide column'>
                <ChildSingleInput
                    inputType="text"
                    label="Git Hub"
                    name="github"
                    value={this.state.newAccount.github}
                    controlFunc={this.handleChange}
                    maxLength={80}
                    placeholder={this.state.newAccount.github ? this.state.newAccount.github :"Enter your GitHub address"}
                    errorMessage="Please enter a valid GitHub address"
                />
                <ChildSingleInput
                    inputType="text"
                    label="Linked In"
                    name="linkedIn"
                    value={this.state.newAccount.linkedIn}
                    controlFunc={this.handleChange}
                    maxLength={80}
                    placeholder={this.state.newAccount.linkedIn ? this.state.newAccount.linkedIn : "Enter your LinkedIn address"}
                    errorMessage="Please enter a valid LinkedIn address"
                />

                <button type="button" className="ui teal button" onClick={this.saveAccount}>Save</button>
                <button type="button" className="ui button" onClick={this.closeEdit}>Cancel</button>
            </div>
        )
    }




    renderDisplay()
    {

        let linkedIn = this.props.details ? this.props.details.linkedIn : ""
        let github = this.props.details ? this.props.details.github : ""

        //display dummy data
        return (
            <div className='row'>
                <div className="ui sixteen wide column">
                    <React.Fragment>
                        <Label size = 'big' color = 'blue' as='a' href={linkedIn} target="_blank">
                            <Icon name='linkedin' />
                             LinkedIn
                        </Label>
                        <Label size = 'big' color = 'black' as='a' href={github} target="_blank">
                            <Icon name='github' />
                            GitHub
                        </Label>
                    </React.Fragment>
                    <button type="button" className="ui right floated teal button" onClick={this.openEdit}>Edit</button>
                </div>
            </div>
        )

    }


}