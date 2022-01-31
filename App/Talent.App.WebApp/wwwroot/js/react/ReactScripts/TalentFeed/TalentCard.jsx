import React from 'react';
import ReactPlayer from 'react-player';

export default class TalentCard extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            toggleView: true,
        }

        this.handleView=this.handleView.bind(this)
       
    };
    componentDidMount() {
        this.handleView()
    };

    handleView() {
        this.setState({
            toggleView: this.toggleView=!this.toggleView
        })
       //console.log(this.props.name)
        //console.log(this.state.name)
        //console.log(this.props.visa)

    }
    
    
    render() {
        let talentName = this.props.name

        const videoView =( 
            <ReactPlayer width='auto' light = 'true' url='https://www.youtube.com/watch?v=MUaL1FnotRQ' />
        );
        const snapShotView=(
            <React.Fragment>
                <img className="ui left floated image" width='50%' height='120%' src="https://react.semantic-ui.com/images/avatar/large/matthew.png"/>
                <header><strong>Talent snapshot</strong></header>
                <br></br>
                <p>CURRENT EMPLOYER</p>
                <p>{this.props.job ? this.props.job : 'Unemployed'}</p>
                
                <p>VISA STATUS</p>
                <p>{this.props.visa ? this.props.visa : 'Unknown'}</p>
                
                <p>POSITION</p>
                <p>{this.props.position ? this.props.position : 'Student'}</p>
            </React.Fragment>
        );


        return (
            <div className="ui raised link job card">
                <div className="content">
                    <div className="header">{talentName}<a className="ui right floated icon"><i aria-hidden="true" className="star big icon"></i></a></div>
                    
                </div>
                <div className="content">    
                    <div className="description">{this.state.toggleView ? videoView : snapShotView}</div>
                    <div className="ui four big basic buttons" style={{border: 'none'}}>
                    { this.state.toggleView ? <button className="ui icon button" style={{border: 'none'}} onClick={this.handleView}><i aria-hidden="true"  className="user icon"> </i></button>
                    : <button className="ui icon button" style={{border: 'none'}} onClick={this.handleView} style={{borderRadius: 0}}><i aria-hidden="true" className="video icon"> </i></button>}
                        <button className="ui icon button" style={{border: 'none'}}><i aria-hidden="true" className="file pdf outline icon"></i></button>
                        <button className="ui icon button" style={{border: 'none'}}><i aria-hidden="true" className="linkedin icon"></i></button>
                        <button className="ui icon button" style={{border: 'none'}}><i aria-hidden="true" className="github icon"></i></button>
                    </div>
                </div>
                <div className="extra content">
                    <div className="left floated">
                        {this.props.skills ? this.props.skills.map( (s,i) => ( <a className="ui blue basic label" key={i}> <b> {s} </b></a>)) :  <a className="ui blue basic label"><b>No skills</b></a>}
                    </div>
                </div>
            </div>
        );
       
    }
}

