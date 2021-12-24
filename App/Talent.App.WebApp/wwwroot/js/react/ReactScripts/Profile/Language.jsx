/* Language section */
import React from 'react';
import Cookies from 'js-cookie';
import AddLanguage from './AddLanguage.jsx';
import EditLanguage from './EditLanguage.jsx';

export default class Language extends React.Component {
    constructor(props) {
        super(props);
        const data = props.languageData  /*? [[], props.languageData]
        : 
            {
                //id: "",
                language: "",
                languageLevel: "",
            }*/
         

        this.state = {
            list: data,
            newLanguage:  {language: "",  languageLevel: ""},
            //newList: [],
            summchar: 0,
            descchar: 0,
            showAdd: false,
            showEdit: false,
        }
        this.openAdd = this.openAdd.bind(this)
        this.closeAdd = this.closeAdd.bind(this)
        this.openEdit = this.openEdit.bind(this)
        this.closeEdit = this.closeEdit.bind(this)
        //this.saveLanguage = this.saveLanguage.bind(this)
        this.updateLanguage = this.updateLanguage.bind(this)
        

    }
    openAdd () {
        this.setState({
            showAdd: true,
        })
        console.log(this.state.list)
    }

    closeAdd () {
        this.setState({
            showAdd: false
        })
    }

    openEdit () {
        this.setState({
            showEdit: true,
        })
    }

    closeEdit () {
        this.setState({
            showEdit: false
        })
    }

    updateLanguage(newLang)  {
      
        this.setState(state => {
            const list = [...state.list, newLang];
      
            return {
              list,
              newLanguage: newLang,
            };
          });

        //this.saveLanguage
        console.log(newLang)
        console.log(this.state.list)
        //this.props.updateProfileData(this.state.list)
        this.props.controlFunc(this.props.componentId, this.state.list)
        this.closeAdd()
        this.closeEdit()
    }

    /*saveLanguage = () => {

        this.props.controlFunc(this.props.componentId, this.state.list)

    }
*/


    render() {
        const {list} = this.state
        return (
            <React.Fragment>
                <AddLanguage showAdd={this.state.showAdd} closeAdd={this.closeAdd} updateLanguage={this.updateLanguage}/>
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
                        {(list || []).map((l) => {

                            return this.state.showEdit ?  (<EditLanguage showEdit={this.state.showEdit} closeEdit={this.closeEdit} updateLanguage={this.updateLanguage} currentLanguage={l}/>)
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