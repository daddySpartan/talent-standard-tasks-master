import React from 'react'
import { Form, Checkbox } from 'semantic-ui-react';

export default class TalentStatus extends React.Component {
    constructor(props) {
        super(props);
        const jobseekstatus = props.status ?
          Object.assign({}, props.status) : { status: "",  }            
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
            value: data
        })
        this.props.controlFunc(this.props.componentId, data)
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
                  name='status'
                  value='Actively looking for a job'
                  checked={this.props.status.status === 'Actively looking for a job'}
                  onClick={this.handleChange}
                />
              </Form.Field>
              <Form.Field>
                <Checkbox
                  radio
                  label='Not looking for a job at the moment'
                  name='status'
                  value='Not looking for a job at the moment'
                  checked={this.props.status.status === 'Not looking for a job at the moment'}
                  onClick={this.handleChange}
                />
              </Form.Field>
              <Form.Field>
                <Checkbox
                  radio
                  label='Currently employed but open to offers'
                  name='status'
                  value='Currently employed but open to offers'
                  checked={this.props.status.status === 'Currently employed but open to offers'}
                  onClick={this.handleChange}
                />
              </Form.Field>
              <Form.Field>
                <Checkbox
                  radio
                  label='Will be available on later date'
                  name='status'
                  value='Will be available on later date'
                  checked={this.props.status.status === 'Will be available on later date'}
                  onClick={this.handleChange}
                />
              </Form.Field>
            </Form>
            </div>
            </React.Fragment>

        )
              
    }
}