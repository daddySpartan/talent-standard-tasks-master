/* Experience section */
import React from 'react';
import Cookies from 'js-cookie';
import AddXp from './AddXp.jsx';
import EditXp from './EditXp.jsx';
import {format } from 'date-fns';

export default class Experience extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showAdd: false,
            showEdit: false,
            keyId: 0
        }
        this.openAdd = this.openAdd.bind(this)
        this.closeAdd = this.closeAdd.bind(this)
        this.openEdit = this.openEdit.bind(this)
        this.closeEdit = this.closeEdit.bind(this)
        this.updateExperience = this.updateExperience.bind(this)
        this.addExperience = this.addExperience.bind(this)
        this.deleteExperience = this.deleteExperience.bind(this)
        this.formatDate = this.formatDate.bind(this)
       
    };
 
    openAdd () {
        this.setState({
            showAdd: true,
        })
        console.log(this.props.experienceData)
    }

    closeAdd () {
        this.setState({
            showAdd: false
        })
        
    }

    openEdit (currentid) {
        this.setState({
            showEdit: true,
            keyId: currentid,
        })
    }

    closeEdit () {
        this.setState({
            showEdit: false,
            keyId: 0
        })
        
    }

   addExperience(newExp)  {
        const list = this.props.experienceData ? [...this.props.experienceData, newExp] : [newExp]
        this.props.controlFunc(this.props.componentId, list)
        this.closeAdd()
        
    }

    updateExperience (newExp,idExp) {
        const list = this.props.experienceData.map((item) => {
            if (item.id === idExp) {
              return newExp;
            } else {             
              return item;
            }
          });
        this.props.controlFunc(this.props.componentId,list)
        this.closeEdit()

    }

    deleteExperience (idExp) {
        const list = this.props.experienceData.filter((item) => item.id !== idExp);  
        this.props.controlFunc(this.props.componentId,list)     
        this.closeEdit()
    }

    formatDate (_date) {
        var date = new Date(_date);
        var formattedDate = format(date, "do MMM, yyyy");
        return(formattedDate)           
    }

    
    render() {
        const list = this.props.experienceData
        const {keyId,showEdit} = this.state

        if (!list) {
        return (
            <React.Fragment>
                
                <AddXp showAdd={this.state.showAdd} closeAdd={this.closeAdd} addXp={this.addExperience}/>
                <div className="sixteen wide column">
                
                <table className="ui single line table">
                    <thead className="">
                        <tr className="">
                        <th className="">Company</th>
                        <th className="">Position</th>
                        <th className="">Responsibilities</th>
                        <th className="">Start</th>
                        <th className="">End</th>
                        <th className=""><button type="button" className="ui right floated black button" onClick={this.openAdd}>+ Add New</button> </th>
                        </tr>
                    </thead>
                </table>
                </div>
            </React.Fragment>
        )
        }
        return (
            <React.Fragment>
                
                <AddXp showAdd={this.state.showAdd} closeAdd={this.closeAdd} addXp={this.addExperience}/>
                <div className="sixteen wide column">
                
                <table className="ui single line table">
                    <thead className="">
                        <tr className="">
                        <th className="">Company</th>
                        <th className="">Position</th>
                        <th className="">Responsibilities</th>
                        <th className="">Start</th>
                        <th className="">End</th>
                        <th className=""><button type="button" className="ui right floated black button" onClick={this.openAdd}>+ Add New</button> </th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {list.map((x) => {
                            return showEdit && keyId === x.id ? 
                            <EditXp showEdit={showEdit} closeEdit={this.closeEdit} updateXp={this.updateExperience} currentXp={x}/>
                            :
                            (
                            <tr className="" key={x.id}>
                                <td className="">{x.company ? x.company : "dummy"}</td>
                                <td className="">{x.position ? x.position : "data"}</td>
                                <td className="">{x.responsibilities ? x.responsibilities : ""}</td>
                                <td className="">{x.start ? this.formatDate(x.start) : ""}</td>
                                <td className="">{x.end ? this.formatDate(x.end) : ""}</td>
                               <td className="">
                                    <button type="button" className="ui right floated icon button">
                                        <i className="close icon" onClick={()=>this.deleteExperience(x.id)}></i>  
                                    </button>
                                    <button type="button" className="ui right floated icon button" > 
                                        <i className="pencil icon" onClick={()=>this.openEdit(x.id)}></i>
                                    </button>
                                    
                                </td>                   
                            </tr>    
                            );                                            
                        })}
                    </tbody>        
                </table>
                </div>
            </React.Fragment>
        )
        
    }
        
}
