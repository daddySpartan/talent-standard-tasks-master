/* Language section */
import React from 'react';
import Cookies from 'js-cookie';

export default class Language extends React.Component {
    constructor(props) {
        super(props);
        const details = props.languageData ?             
        Object.assign({}, props.languageData)
        : {
            language: "",
            languageLevel: "",
        }


        this.state = {
            newProfile: details,
            summchar: 0,
            descchar: 0,
        }
       

    }



    render() {
        //display dummy data
        return (
            <div className='row'>
                <div className="ui six wide header cell">
                    <React.Fragment>
                       <p>Language</p>                        
                    </React.Fragment>
                </div>
                <div className="ui nine wide header cell">
                    <React.Fragment>
                       <p>Level</p>                        
                    </React.Fragment>
                    <button type="button" className="ui right floated black button" >+ Add New</button> 
                </div>

            </div>
        )

        
    }
}