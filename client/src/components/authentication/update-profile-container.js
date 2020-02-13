import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Field, reduxForm } from "redux-form";
import _ from "lodash";
import { ProgressBar, Modal } from "react-bootstrap";
import { validators, helper, toaster, constants } from "../../common";
import { authActions } from "../../actions";
import { UploadComponent, LoadingOverlayComponent } from "../common";
import { InputComponent } from "../redux-form-components";

class UpdateProfileContainer extends Component {
  constructor() {
    super();
    this.state = { file: null, init: true, show: false, progress: 0 };
  }
  render() {
    const { handleSubmit, pristine, submitting, reset, post, user } = this.props;
    const photoURL = post.payload.photoURL || user.photoURL;
    const progress = parseInt(this.state.progress, 10);
    const show = this.state.show;
    const overlayLoading = this.state.init && post.isLoading && <LoadingOverlayComponent />;
    return (
      <div>
        <div className="container">
          <div className="col-sm-6 col-sm-offset-3 well">
            <h4 className="mb20">Update Profile</h4>
            <form onSubmit={handleSubmit(this.handleSubmit)}>
              <div className="mb20 text-center">
                <UploadComponent photoURL={photoURL} handleFileUpload={this.handleFileUpload} />
              </div>
              <Field
                id="name"
                name="name"
                type="text"
                label="Name"
                icon="glyphicon-user"
                maxlength={30}
                component={InputComponent}
                validate={validators.required}
              />
              <div className="mt25 text-center">
                <span className="mr5">
                  <button
                    type="submit"
                    disabled={submitting || post.isLoading}
                    className="btn btn-success btn-sm"
                  >
                    {post.isLoading ? "Loading..." : "Submit"}
                  </button>
                </span>
                <span className="ml5">
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    disabled={pristine || submitting}
                    onClick={reset}
                  >
                    Reset
                  </button>
                </span>
              </div>
            </form>
          </div>
        </div>
        {overlayLoading}
        <Modal show={show}>
          <Modal.Body>
            <div className="mt25 mb20 text-center">
              {progress !== 100 ? "Uploading pic..." : "Finishing..."}
            </div>
            <ProgressBar bsStyle="info" now={progress} label={`${progress}%`} />
          </Modal.Body>
        </Modal>
      </div>
    );
  }
  handleSubmit = values => {
    if (!_.isEmpty(values)) {
      if (this.state.file) {
        this.setState({ show: true, init: false });
        var uploadTask = helper.uploadProfilePic({
          uid: this.props.user.uid,
          file: this.state.file
        });
        uploadTask.on(
          constants.STATE_CHANGED,
          snapshot => {
            var progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            this.setState({ progress });
          },
          error => toaster(error),
          () => {
            uploadTask.snapshot.ref
              .getDownloadURL()
              .then(downloadURL => {
                this.props.authActions.changeProfile({
                  uid: this.props.user.uid,
                  name: values.name,
                  photoURL: downloadURL
                });
              })
              .then(() => {
                this.setState({ show: false });
              });
          }
        );
      } else {
        this.props.authActions.changeProfile({
          uid: this.props.user.uid,
          name: values.name,
          photoURL: null
        });
      }
    }
  };
  handleFileUpload = file => {
    this.setState({ file });
  };
}

function mapStateToProps(state) {
  return {
    auth: state.read.auth,
    user: state.read.auth.user,
    post: state.write.submit,
    initialValues: { name: state.read.auth.user.displayName }
  };
}

function mapDispatchToProps(dispatch) {
  return {
    authActions: bindActionCreators(authActions, dispatch)
  };
}

const profileForm = reduxForm({ form: "profileForm", enableReinitialize: true })(
  UpdateProfileContainer
);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(profileForm);
