import React from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie'
import TalentCard from '../TalentFeed/TalentCard.jsx';
import TalentDetail from '../TalentFeed/TalentDetail.jsx';
import { Loader } from 'semantic-ui-react';
import CompanyProfile from '../TalentFeed/CompanyProfile.jsx';
import FollowingSuggestion from '../TalentFeed/FollowingSuggestion.jsx';
import { BodyWrapper, loaderData } from '../Layout/BodyWrapper.jsx';


export default class TalentFeed extends React.Component {
    constructor(props) {
        super(props);

        let loader = loaderData
        loader.allowedUsers.push("Employer")
        loader.allowedUsers.push("Recruiter")

        this.state = {
            loadNumber: 5,
            loadPosition: 310,
            feedData: [],
            watchlist: [],
            loaderData: loader,
            loadingFeedData: false,
            companyDetails: {
                skills: []
            },
        }


        this.init = this.init.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this.loadTalentData = this.loadTalentData.bind(this);
        this.loadCompanyData = this.loadCompanyData.bind(this);
        this.updateWithoutSave = this.updateWithoutSave.bind(this);
    };

    init() {
        let loaderData = TalentUtil.deepCopy(this.state.loaderData)
        loaderData.isLoading = false;
        this.setState({ loaderData });//comment this
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
        
        this.init()
    };

    handleScroll() {
        const win = $(window);
        var increment = this.state.loadPosition + 1;

        if ((($(document).height() - win.height()) == Math.round(win.scrollTop())) || ($(document).height() - win.height()) - Math.round(win.scrollTop()) == 1) {
            $("#load-more-loading").show();
            //load ajax and update states
            //call state and update state;
            //this.loadCompanyData();
            this.loadTalentData();
            this.setState({
                loadPosition: increment,
            })
            //console.log(this.state.feedData[0]);
            console.log(this.state.feedData);
            //console.log(this.state.loadPosition);
        }
    };

    loadTalentData() {
        var cookies = Cookies.get('talentAuthToken');
        var feed = {
            position: this.state.loadPosition, 
            number: this.state.loadNumber,
        }
        $.ajax({
            url: 'http://localhost:60290/profile/profile/getTalent',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "GET",
            contentType: "application/json",
            dataType: "json",
            data: feed,
            success: function (res) {
                let talentData = null;
                if (res.data) {
                    talentData = res.data
                    console.log("talentData", talentData)
                }
                this.updateWithoutSave(1,talentData)
            }.bind(this),
            error: function (res) {
                console.log(res.status)
            }
        }) 
    }  


    loadCompanyData() {
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'http://localhost:60290/profile/profile/getEmployerProfile',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "GET",
            contentType: "application/json",
            dataType: "json",
            success: function (res) {
                let companyData = null;
                if (res.employer) {
                    companyData = res.employer.companyContact
                }
                this.updateWithoutSave(0,companyData)
            }.bind(this),
            error: function (res) {
                console.log(res.status)
            }
        }) 
    }
    //updates component's state without saving data
    updateWithoutSave(talent,newData) {
        if (!talent) {
            let newCompanyData = Object.assign({}, this.state.companyDetails, newData)
            this.setState({
                companyDetails: newCompanyData,
                //loadingFeedData: this.loadingFeedData = !this.loadingFeedData,
            })
        }
        else {
            let newTalentData = Object.assign({}, this.state.feedData, newData)
            this.setState({
                feedData: newData,
                loadingFeedData: this.loadingFeedData = !this.loadingFeedData,
            })
            console.log(newData)
            console.log(newTalentData)
        }
    }

   
    render() {
        let cardDetail = this.state.feedData;
    

        return (

            <BodyWrapper reload={this.init} loaderData={this.state.loaderData}>
                <div className="ui grid talent-feed container">
                    <div className="four wide column">
                        <CompanyProfile reload={this.loadCompanyData} companyData={this.state.companyDetails}/>
                    </div>
                    <div className="eight wide column">
                        <TalentDetail talents = {cardDetail || []} reload = {this.loadTalentData}/>
                        <p id="load-more-loading">
                            <img src="/images/rolling.gif" alt="Loading…" />
                        </p>
                    </div>
                    <div className="four wide column">
                        <div className="ui card">
                            <FollowingSuggestion />
                        </div>
                    </div>
                </div>
            </BodyWrapper>
        
        )
    }
}