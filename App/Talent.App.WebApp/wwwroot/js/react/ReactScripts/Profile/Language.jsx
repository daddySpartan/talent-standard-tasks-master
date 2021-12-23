/* Language section */
import React from 'react';
import Cookies from 'js-cookie';
import AddLanguage from './AddLanguage.jsx';
import EditLanguage from './EditLanguage.jsx';

export default class Language extends React.Component {
    constructor(props) {
        super(props);
        /*const lists = props.languageData  ? [[], props.languageData]
        : 
            {
                //id: "",
                language: "",
                languageLevel: "",
            }*/
         

        this.state = {
            //newList: lists,
            newList: [],
            summchar: 0,
            descchar: 0,
            showAdd: false,
            showEdit: false,
        }
        this.openAdd = this.openAdd.bind(this)
        this.closeAdd = this.closeAdd.bind(this)
        this.openEdit = this.openEdit.bind(this)
        this.closeEdit = this.closeEdit.bind(this)
        this.saveLanguage = this.saveLanguage.bind(this)
       

    }
    openAdd() {
        this.setState({
            showAdd: true,
        })
        console.log(this.state.newList)
    }

    closeAdd() {
        this.setState({
            showAdd: false
        })
    }

    openEdit() {
        this.setState({
            showEdit: true,
        })
    }

    closeEdit() {
        this.setState({
            showEdit: false
        })
    }

    saveLanguage(newLanguage) {
      
        //const list = this.state.newList
        //const data = list.push(newLanguage)
        this.setState(previousState => ({
            newList: [...previousState.newList, newLanguage]
        }));
        this.props.controlFunc(this.props.componentId, this.state.newList)
        console.log(newLanguage)
        console.log(this.state.newList)
        //this.props.updateProfileData(this.state.newList)
        this.closeAdd()
        this.closeEdit()
    }



    render() {
        const {newList} = this.state
        return (
            <React.Fragment>
                <AddLanguage showAdd={this.state.showAdd} closeAdd={this.closeAdd} updateLanguage={this.saveLanguage}/>
                <div className="sixteen wide column">
                
                <table className="ui single line table">
                    <thead className="">
                        <tr className="">
                        <th className="">Language</th>
                        <th className="">Level</th>
                        <th className=""><button type="button" className="ui right floated black button" onClick={this.openAdd}>+ Add New</button> </th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {newList.map((l) => {

                            return this.state.showEdit ?  (<EditLanguage showEdit={this.state.showEdit} closeEdit={this.closeEdit} updateLanguage={this.saveLanguage} currentLanguage={l}/>)
                                :
                            (
                                <tr className="" key={l.id}>
                                    <td className="">{l.language ? l.language : "dummy"}</td>
                                    <td className="">{l.languageLevel ? l.languageLevel : "data"}</td>
                                    <td className="">
                                        <button type="button" className="ui right floated icon button">
                                            <i className="close icon"></i>  
                                        </button>
                                        <button type="button" className="ui right floated icon button" > 
                                            <i className="pencil icon" onClick={this.openEdit}></i>
                                        </button>
                                </td>                   
                                </tr>
                            )                       

                        })}
                    </tbody>        
                </table>
                </div>
            </React.Fragment>
        )
        
    }
}