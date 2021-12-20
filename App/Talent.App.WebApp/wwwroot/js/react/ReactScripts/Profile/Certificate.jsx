/* Certificate section */
import React from 'react';
import Cookies from 'js-cookie';

export default class Certificate extends React.Component {

    constructor(props) {
        super(props)
        

    };

    render() {
        //display dummy data
        return (
            <div className='row'>
                <div className="ui sixteen wide column">
                    <React.Fragment>
                        <p>Name: </p>
                        <p>Email: </p>
                        <p>Phone: </p>
                    </React.Fragment>
                    <button type="button" className="ui right floated teal button" >Edit</button>
                </div>
            </div>
        )

    }
}

