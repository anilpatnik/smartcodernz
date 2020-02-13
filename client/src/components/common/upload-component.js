import React, { Component } from "react";
import PropTypes from "prop-types";
import { Image } from "react-bootstrap";
import { constants, helper } from "../../common";
import { photo } from "../../images";

class UploadComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { file: null };
  }
  render() {
    const { photoURL } = this.props;
    const file = this.state.file;
    const src = (file && URL.createObjectURL(file)) || photoURL;
    return (
      <div className="text-center">
        <input
          id={constants.FILE}
          name={constants.FILE}
          type={constants.FILE}
          accept="image/*"
          className="file-upload"
          onChange={this.fileUpload}
        />
        <Image
          className="profile-image"
          src={src}
          onError={e => (e.target.src = photo)}
          circle
          responsive
          onClick={() => document.getElementById(constants.FILE).click()}
        />
      </div>
    );
  }
  fileUpload = e => {
    e.preventDefault();
    const inputFile = e.target.files[0];
    if (inputFile) {
      helper.resizeImage(inputFile, file => {
        this.setState({ file });
        this.props.handleFileUpload(file);
      });
    }
  };
}

UploadComponent.propTypes = {
  photoURL: PropTypes.string.isRequired,
  handleFileUpload: PropTypes.func.isRequired
};

export default UploadComponent;
