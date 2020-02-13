import React, { Component } from "react";
import { Modal, Image } from "react-bootstrap";
import { photo } from "../../images";

class ImageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
  }
  handleClose = () => {
    this.setState({ show: false });
  };
  handleShow = () => {
    this.setState({ show: true });
  };
  render() {
    const { text } = this.props;
    return (
      <React.Fragment>
        <Image
          src={text}
          onError={e => (e.target.src = photo)}
          circle
          responsive
          className="picture cursor"
          onClick={this.handleShow}
        />
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton />
          <Modal.Body>
            <Image src={text} onError={e => (e.target.src = photo)} responsive className="center" />
          </Modal.Body>
        </Modal>
      </React.Fragment>
    );
  }
}

export default ImageComponent;
