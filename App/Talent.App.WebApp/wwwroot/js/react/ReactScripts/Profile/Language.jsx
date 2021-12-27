/* Language section */
import React from 'react';
import Cookies from 'js-cookie';
import AddLanguage from './AddLanguage.jsx';
import EditLanguage from './EditLanguage.jsx';

export class Language extends React.Component {
    constructor(props) {
        super(props);       
        /*const newList = props.languageData ? 
        [newList,...props.languageData] :
        [{
            language: "",
            languageLevel: "",
            id: "",
            userId: "",
        }]*/
        this.state = {
            //newL: [...newList],
            summchar: 0,
            descchar: 0,
            showAdd: false,
            showEdit: false,
            keyId: 0
        }
        this.openAdd = this.openAdd.bind(this)
        this.closeAdd = this.closeAdd.bind(this)
        this.openEdit = this.openEdit.bind(this)
        this.closeEdit = this.closeEdit.bind(this)
        this.updateLanguage = this.updateLanguage.bind(this)
        this.addLanguage = this.addLanguage.bind(this)
        this.deleteLanguage = this.deleteLanguage.bind(this)
        //this.loadLanguages = this.loadLanguages.bind(this)
    }
    /*componentDidMount() {
        this.loadLanguages();
    }

    loadLanguages() {
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'http://localhost:60290/profile/profile/getLanguages',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "GET",
            contentType: "application/json",
            dataType: "json",
            success: function (res) {
                let languageData = null;
                if (res.user) {
                    talentData = res.user
                    console.log("languagedata",languageData)
                }
                this.props.updateProfileData(languageData)
               
            }.bind(this),
            error: function (res) {
                console.log(res.status)
            }

        })
        //this.init()
    }*/


    openAdd () {
        this.setState({
            showAdd: true,
        })
        console.log(this.props.languageData)
    }

    closeAdd () {
        this.setState({
            showAdd: false
        })
        
    }

    openEdit (currentlevel,currentlanguage,currentid,currentuserid) {
        /*const newLanguage = {
            language: currentlanguage,
            languageLevel: currentlevel,
            id: currentid,
            userId: currentuserid
        }
        const newList = [...this.state.newL,newLanguage]*/
        this.setState({
            showEdit: true,
            keyId: currentid,
            //newL: [...newList]
        })
    }

    closeEdit () {
        this.setState({
            showEdit: false,
            keyId: 0
        })
        
    }

   addLanguage(newLang)  {
        const list = [...this.props.languageData, newLang];
        /*this.setState(state => {     
            return {
              newL: [...list],
            };
          });*/

        this.props.controlFunc(this.props.componentId, list)
        //this.props.refresh()
        this.closeAdd()
        
    }

    updateLanguage (newLang,idLang) {
        const list = this.props.languageData.map((item) => {
            if (item.id === idLang) {
              return newLang;
            } else {             
              return item;
            }
          });
          /*this.setState(state => {     
            return {
              newL: [...list],
            };
          });*/
        this.props.controlFunc(this.props.componentId,list)
        //this.props.refresh()     
        this.closeEdit()

    }

    deleteLanguage (idLang) {
        //this.props.refresh() 
        const list = this.props.languageData.filter((item) => item.id !== idLang);  
        /*this.setState(state => {     
            return {
              newL: [...list],
            };
          });*/
        this.props.controlFunc(this.props.componentId,list)     
        this.closeEdit()

    }


    render() {
        const list = this.props.languageData
        const {keyId,showEdit} = this.state

        if (!list) {
            return <div />
        }
        return (
            <React.Fragment>
                
                <AddLanguage showAdd={this.state.showAdd} closeAdd={this.closeAdd} addLanguage={this.addLanguage}/>
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
                        {list.map((l) => {
                            return showEdit && keyId === l.id ? 
                            <EditLanguage showEdit={showEdit} closeEdit={this.closeEdit} updateLanguage={this.updateLanguage} currentLanguage={l}/>
                            :
                            (
                            <tr className="" key={l.id}>
                                <td className="">{l.language ? l.language : "dummy"}</td>
                                <td className="">{l.languageLevel ? l.languageLevel : "data"}</td>
                                <td className="">
                                    <button type="button" className="ui right floated icon button">
                                        <i className="close icon" onClick={()=>this.deleteLanguage(l.id)}></i>  
                                    </button>
                                    <button type="button" className="ui right floated icon button" > 
                                        <i className="pencil icon" onClick={()=>this.openEdit(l.languageLevel,l.language,l.id,l.userId)}></i>
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