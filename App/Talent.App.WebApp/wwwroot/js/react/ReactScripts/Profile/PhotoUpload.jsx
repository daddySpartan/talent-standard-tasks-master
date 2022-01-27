/* Photo upload section */

import React from 'react';
import Cookies from 'js-cookie';
export class PhotoUpload extends React.Component {

    constructor(props) {
        super(props);
        //var profilePhoto = props.imagePhoto ? Object.assign({}, props.imagePhoto) : "camera.jpg";
        //var profilePhotoUrl = props.imageId ? Object.assign({}, props.imageId) : "";

        this.selectFileToUpload = this.selectFileToUpload.bind(this);
        this.fileSelectedHandler = this.fileSelectedHandler.bind(this);
        this.fileUploadHandler = this.fileUploadHandler.bind(this);
        this.maxFileSize = 2097152;
        this.acceptedFileType = ["image/gif", "image/jpeg", "image/png", "image/jpg"];

        this.state = {
            selectedFile: null,
            selectedFileName: '',
            imageSrc: '',
            showUploadButton: false
        }
    };

    /*loadImages(Id) {

        var cookies = Cookies.get('talentAuthToken');

        $.ajax({
            url: 'http://localhost:60290/profile/profile/getEmployerProfileImage/?id=' + Id,
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "GET",
            contentType: "application/json",
            dataType: "json",
            success: function (res) {

                let imageSrcArr = [];
                let imageIdArr = [];
                let selectedFileArr = [];

                if (res.employerProfile.length > 0) {
                    for (var i = 0; i < res.employerProfile.length; i++) {
                        imageSrcArr.push("http://localhost:60290/profile/profile/getEmployerProfileImages/?Id=" + res.employerProfile[i].fileName);
                        imageIdArr.push(res.employerProfile[i].id);
                        selectedFileArr.push("");
                    }
                }

                this.setState({
                    imageSrc: imageSrcArr,
                    imageId: imageIdArr,
                    selectedFile: selectedFileArr,
                    selectedFileName: [],
                    selectedRemoveFileId: [],
                    currentNoOfFiles: res.employerProfile.length
                });
            }.bind(this)
        });
    }*/

    selectFileToUpload() {
        document.getElementById('selectFile').click();
    }

    fileSelectedHandler(event) {

        let localSelectedFile = this.state.selectedFile;
        let localSelectedFileName = this.state.selectedFileName;
        let localImageSrc = this.state.imageSrc;

    
        if (event.target.files[0].size > this.maxFileSize || this.acceptedFileType.indexOf(event.target.files[0].type) == -1) {
            TalentUtil.notification.show("Max file size is 2 MB and supported file types are *.jpg, *.jpeg, *.png, *.gif", "error", null, null);
        } 
        else {
            localSelectedFile = event.target.files[0], 
            localSelectedFileName = (event.target.files[0].name), 
            localImageSrc = window.URL.createObjectURL(event.target.files[0]) 
        }

        this.setState({
            selectedFile: localSelectedFile,
            selectedFileName: localSelectedFileName,
            imageSrc: localImageSrc,
            showUploadButton: true,
        })
    }

    fileUploadHandler(event) {
        event.preventDefault();
        let data = new FormData();
        if (this.state.selectedFile != "") {
            data.append('file', this.state.selectedFile);
        }
 
        console.log('selectedFile data', data);
        console.log('selectedFile', this.state.selectedFile);
        console.log('selectedFile', this.state.selectedFileName);

        var cookies = Cookies.get('talentAuthToken');

        $.ajax({
            url: 'http://localhost:60290/profile/profile/updateProfilePhoto',
            headers: {
                'Authorization': 'Bearer ' + cookies
            },
            type: "POST",
            data: data,
            cache: false,
            processData: false,
            contentType: false,
            success: function (res) {
                if (res.success) {
                    this.setState({ showUploadButton: false });
                } else {
                    TalentUtil.notification.show(res.message, "error", null, null);
                }
            }.bind(this),
            error: function (res, status, error) {
                //Display error
                TalentUtil.notification.show("There is an error when updating Images - " + error, "error", null, null);
            }
        });
    }

    render() {
        let showProfileImg = [];
        var profileUrl = this.state.imageSrc ? this.state.imageSrc : this.props.imageId;

         if (profileUrl != null && profileUrl != '') {
            showProfileImg.push(<span><img style={{ height: 112, width: 112, borderRadius: 55 }} className="ui small" src= {profileUrl} alt="Image Not Found" onClick={this.selectFileToUpload}/> </span>);
        }
        else {
            showProfileImg.push(<span><i style={{ alignContent: 'right', verticalAlign: 'top'}} className="huge circular camera retro icon" onClick={this.selectFileToUpload}/> </span>);
        }


        return (
            <React.Fragment>
                 <div className="sixteen wide column">
                    <section>
                        <div className="corner right">
                            <label htmlFor="work_sample_uploader" className="profile-photo">
                                {showProfileImg}
                            </label>
                            <input id="selectFile" type="file" style={{ display: 'none' }} onChange={this.fileSelectedHandler} accept="image/*" />
                            <br/>
                            {this.state.showUploadButton ? 
                                <button type="button" className="ui icon left labelled button" onClick={this.fileUploadHandler}><i aria-hidden="true" className="upload icon"></i>Upload</button> 
                            : ""}
                        </div>
                    </section>
                    
                </div>
            </React.Fragment>
        )
    }
}