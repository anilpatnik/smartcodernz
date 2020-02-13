import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal, Button } from "react-bootstrap";
import InnerHtmlComponent from "./inner-html-component";

class ModalComponent extends Component {
  render() {
    const { title, body, show, handleSubmit, handleClose } = this.props;
    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <InnerHtmlComponent text={title} />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InnerHtmlComponent text={body} />
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn btn-success btn-sm" onClick={handleSubmit}>
            Submit
          </Button>
          <Button className="btn btn-secondary btn-sm" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

ModalComponent.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default ModalComponent;
