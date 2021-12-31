/* Skill section */
import React from 'react';
import AddSkill from './AddSkill.jsx';
import EditSkill from './EditSkill.jsx';

export class Skill extends React.Component {
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
        this.updateSkill = this.updateSkill.bind(this)
        this.addSkill = this.addSkill.bind(this)
        this.deleteSkill = this.deleteSkill.bind(this)
    }

    openAdd () {
        this.setState({
            showAdd: true,
        })
        //console.log(this.props.skillData)
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

   addSkill(newSkill)  {
        const list = this.props.skillData ? [...this.props.skillData, newSkill] : [newSkill];
        this.props.controlFunc(this.props.componentId, list)
        this.closeAdd()
        
    }

    updateSkill (newSkill,idSkill) {
        const list = this.props.skillData.map((item) => {
            if (item.id === idSkill) {
              return newSkill;
            } else {             
              return item;
            }
          });
        this.props.controlFunc(this.props.componentId,list)  
        this.closeEdit()

    }

    deleteSkill (idSkill) {
        const list = this.props.skillData.filter((item) => item.id !== idSkill);  
        this.props.controlFunc(this.props.componentId,list)     
        this.closeEdit()

    }


    render() {
        const list = this.props.skillData
        const {keyId,showEdit} = this.state

        if (!list) {
        return (
            <React.Fragment>
                
                <AddSkill showAdd={this.state.showAdd} closeAdd={this.closeAdd} addSkill={this.addSkill}/>
                <div className="sixteen wide column">
                
                <table className="ui single line table">
                    <thead className="">
                        <tr className="">
                        <th className="">Skill</th>
                        <th className="">Level</th>
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
                
                <AddSkill showAdd={this.state.showAdd} closeAdd={this.closeAdd} addSkill={this.addSkill}/>
                <div className="sixteen wide column">
                
                <table className="ui single line table">
                    <thead className="">
                        <tr className="">
                        <th className="">Skill</th>
                        <th className="">Level</th>
                        <th className=""><button type="button" className="ui right floated black button" onClick={this.openAdd}>+ Add New</button> </th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {list.map((s) => {
                            return showEdit && keyId === s.id ? 
                            <EditSkill showEdit={showEdit} closeEdit={this.closeEdit} updateSkill={this.updateSkill} currentSkill={s}/>
                            :
                            (
                            <tr className="" key={s.id}>
                                <td className="">{s.skill ? s.skill : "dummy"}</td>
                                <td className="">{s.experienceLevel ? s.experienceLevel : "data"}</td>
                                <td className="">
                                    <button type="button" className="ui right floated icon button">
                                        <i className="close icon" onClick={()=>this.deleteSkill(s.id)}></i>  
                                    </button>
                                    <button type="button" className="ui right floated icon button" > 
                                        <i className="pencil icon" onClick={()=>this.openEdit(s.id)}></i>
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