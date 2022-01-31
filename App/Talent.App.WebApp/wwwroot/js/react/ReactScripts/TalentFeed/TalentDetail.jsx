import React from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie'
import { BodyWrapper, loaderData } from '../Layout/BodyWrapper.jsx'
import TalentCardDetail from '../TalentFeed/TalentCardDetail.jsx';
import CompanyProfile from '../TalentFeed/CompanyProfile.jsx';
import FollowingSuggestion from '../TalentFeed/FollowingSuggestion.jsx';
import TalentCard from '../TalentFeed/TalentCard.jsx';

export default class TalentDetail extends React.Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        //console.log(this.props.talents)
        this.props.reload() 
    }

    
    render() {
        
        if (this.props.talents==[])
            return (
                <p>There are no talents found for your recruitment company</p>
            )
        
        else {
            return (
                <React.Fragment>
                    {this.props.talents.map ( (d) => (<TalentCard key={d.id} name={d.name} visa={d.visa} skills={d.skills} position={d.position} job={d.currentEmployment}/>))}
                </React.Fragment>
                
            )

        }
        
    }
}