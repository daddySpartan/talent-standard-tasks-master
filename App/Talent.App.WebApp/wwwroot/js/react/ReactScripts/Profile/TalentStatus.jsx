import React from 'react'
import { Form, Checkbox } from 'semantic-ui-react';
import { SingleInput } from '../Form/SingleInput.jsx';

export default class TalentStatus extends React.Component {
    constructor(props) {
        super(props);
        const jobseekstatus = props.status ?
            props.status : ""              
        this.state = {
            value : jobseekstatus,                      
        }
        this.handleChange = this.handleChange.bind(this)
       
    }

    handleChange(event,value) {
        var data = Object.assign({}, this.state.value)
        const name = value.name;
        let status = value.value;  

        data[name] = status           
        this.setState({
            value: status
        })
        console.log(name)
        console.log(event)
        console.log(status)
        console.log(data)
        this.props.saveProfileData(data)
    }    
    

    render() {
        return (
            <React.Fragment>
            <div className="sixteen wide column">
            <Form>
              <Form.Field>
                <b>Current Status</b>
              </Form.Field>
              <Form.Field>
                <Checkbox
                  radio
                  label='Actively looking for a job'
                  name='jobSeekingStatus'
                  value='Actively looking for a job'
                  checked={this.state.value === 'Actively looking for a job'}
                  onClick={this.handleChange}
                />
              </Form.Field>
              <Form.Field>
                <Checkbox
                  radio
                  label='Not looking for a job at the moment'
                  name='jobSeekingStatus'
                  value='Not looking for a job at the moment'
                  checked={this.state.value === 'Not looking for a job at the moment'}
                  onClick={this.handleChange}
                />
              </Form.Field>
              <Form.Field>
                <Checkbox
                  radio
                  label='Currently employed but open to offers'
                  name='jobSeekingStatus'
                  value='Currently employed but open to offers'
                  checked={this.state.value === 'Currently employed but open to offers'}
                  onClick={this.handleChange}
                />
              </Form.Field>
              <Form.Field>
                <Checkbox
                  radio
                  label='Will be available on later date'
                  name='jobSeekingStatus'
                  value='Will be available on later date'
                  checked={this.state.value === 'Will be available on later date'}
                  onClick={this.handleChange}
                />
              </Form.Field>
            </Form>
            </div>
            </React.Fragment>

        )
              
    }
}