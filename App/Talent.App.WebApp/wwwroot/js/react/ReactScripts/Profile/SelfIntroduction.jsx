/* Self introduction section */
import React, { Component } from "react";

export class SelfIntroduction extends Component {
    constructor(props) {
        super(props)

        const details = props.profile ?             
        Object.assign({}, props.details)
        : {
            summary: "",
            description: "",
        }


        this.state = {
            newProfile: details,
            summchar: 0,
            descchar: 0,
        }

        this.saveData = this.saveData.bind(this);
        this.updateSummary = this.updateSummary.bind(this);
        this.updateDescription = this.updateDescription.bind(this);
    }



    updateSummary(event) {
        console.log(this.state.newProfile)
        const data = Object.assign({}, this.state.newProfile)
        data[event.target.name] = event.target.value
        this.setState({
            newProfile: data
        })
        this.props.updateWithoutSave(data)
    }

    updateDescription(event) {
        console.log(this.state.newProfile)
        const data = Object.assign({}, this.state.newProfile)
        data[event.target.name] = event.target.value
        this.setState({
            newProfile: data
        })
        this.props.updateWithoutSave(data)
    }


    saveData() {
        console.log(this.state.newProfile)
        const data = Object.assign({}, this.state.newProfile)
        this.props.updateProfileData(data)
    }

    dataOrNoData(option) {
        switch(option) {
            case 'summary':
                let summary = this.props.details.summary ? this.props.details.summary : "Please provide a short summary of yourself";
                return summary;
            case 'description' :
                let description = this.props.details.description ? this.props.details.description : "Please tell us about any hobbies, additional expertise, or anything else you’d like to add.";
                return description;                      
        }

    }


    render() {

        const summaryLimit = 150;
        const descLimit = 600;
        let summchar = this.props.details.summary ? this.props.details.summary.length : 0;
        let descchar = this.props.details.description ? this.props.details.description.length : 0;

        return (
            <React.Fragment>
               
                <div className="sixteen wide column">
                    <div className="field" >
                        <textarea maxLength={summaryLimit} name="summary" placeholder={this.dataOrNoData('summary')} value={this.state.newProfile.summary} onChange={this.updateSummary} ></textarea>
                    </div>
                    <p>Summary must be no more than 150 character. Characters remaining : {summchar} / {summaryLimit}</p>
                </div>

                <div className="sixteen wide column">
                    <div className="field" >
                        <textarea minLength = {summaryLimit} maxLength={descLimit} name="description" placeholder={this.dataOrNoData('description')} value={this.state.newProfile.description} onChange={this.updateDescription} ></textarea>
                    </div>
                    <p>Description must be between 150-600 characters. Characters remaining : {descchar} / {descLimit}</p>
                    <button type="button" className="ui right floated teal button" onClick={this.saveData}>Save</button>
                </div>
              
            </React.Fragment>

        )
   
    }

}
