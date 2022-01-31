import React from 'react';

export default class CompanyProfile extends React.Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
        console.log(this.props.companyData)
        this.props.reload()
    };

    

    render() {        
        let companyName = this.props.companyData.name
        let email = this.props.companyData.email
        let phone = this.props.companyData.phone
        let location = {city:'',country:''}
        if (this.props.companyData && this.props.companyData.location) {
            location = this.props.companyData.location
        }

    return (
            <div className="ui card">
                <div className="content">
                    <div className="center aligned header">
                        <img src="https://react.semantic-ui.com/images/wireframe/square-image.png" className="ui tiny circular image"/>
                    </div>
                    <br></br>
                    <div className="center aligned header">{companyName}</div>
                    <div className="center aligned author"><i aria-hidden="true" className="'map marker alternate' disabled icon"></i>{location.city}, {location.country}</div>
                    <div className="center aligned description">
                        <br></br>
                        <p>We currently do not have specific skills that we desire</p>
                    </div>
                </div>
                <div className="extra content">                   
                    <div className="left aligned author"><i aria-hidden="true" className="phone icon"> </i> : {phone}</div>
                   <div className="left aligned author"><i aria-hidden="true" className="mail icon"></i> : {email}</div>
                </div>
            </div>
        )
        
    }
}