import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Nav, Navbar, NavItem, NavDropdown, MenuItem, Image } from "react-bootstrap";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import {
  FaRegHandshake,
  FaStore,
  FaLock,
  FaImage,
  FaTh,
  FaUsers,
  FaGlobeAsia,
  FaSignInAlt,
  FaSignOutAlt
} from "react-icons/fa";
import { authActions } from "../../actions";
import { constants } from "../../common";
import { ModalComponent } from "../../components/common";
import { photo } from "../../images";

class HeaderContainer extends Component {
  constructor() {
    super();
    this.state = { show: false };
  }
  render() {
    const { user } = this.props;
    return (
      <div>
        <Navbar className="navbar navbar-custom navbar-fixed-top" collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to={constants.HOME_URL}>LOGO</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavItem eventKey={1} onClick={e => this.handleSubmit(e, constants.HOME_URL)}>
                <span className="glyphicon glyphicon-home mr5" aria-hidden="true" />
                Home
              </NavItem>
            </Nav>
            {user.isAuthenticated &&
              (user.role === constants.MERCHANT_ROLE ||
                user.role === constants.ADMIN_ROLE ||
                user.role === constants.SUPER_ADMIN_ROLE) && (
                <Nav>
                  <NavDropdown
                    id="listings-nav-dropdown"
                    eventKey={3}
                    title={
                      <span>
                        <span className="glyphicon glyphicon-usd mr5" aria-hidden="true" />
                        Merchant
                      </span>
                    }
                  >
                    <MenuItem
                      eventKey={3.1}
                      onClick={e => this.handleSubmit(e, constants.MERCHANTS_URL)}
                    >
                      <FaStore className="text-success icon-margin" size={20} />
                      Update Profile
                    </MenuItem>
                    <MenuItem
                      eventKey={3.2}
                      onClick={e => this.handleSubmit(e, `${constants.DEALS_URL}/${constants.NEW}`)}
                    >
                      <FaRegHandshake className="text-danger icon-margin" size={20} /> Create Deal
                    </MenuItem>
                    <MenuItem
                      eventKey={3.3}
                      onClick={e => this.handleSubmit(e, constants.DEALS_URL)}
                    >
                      <FaTh className="text-info icon-margin" size={18} /> Manage Deals
                    </MenuItem>
                  </NavDropdown>
                  {user.isAuthenticated &&
                    (user.role === constants.ADMIN_ROLE ||
                      user.role === constants.SUPER_ADMIN_ROLE) && (
                      <NavDropdown
                        id="admin-nav-dropdown"
                        eventKey={4}
                        title={
                          <span>
                            <span className="glyphicon glyphicon-cog mr5" aria-hidden="true" />
                            Admin
                          </span>
                        }
                      >
                        <MenuItem
                          eventKey={4.1}
                          onClick={e => this.handleSubmit(e, constants.USERS_URL)}
                        >
                          <FaUsers className="text-primary icon-margin" size={18} />
                          Users
                        </MenuItem>
                        <MenuItem
                          eventKey={4.2}
                          onClick={e => this.handleSubmit(e, constants.CATEGORIES_URL)}
                        >
                          <FaTh className="text-success icon-margin" size={18} />
                          Categories
                        </MenuItem>
                        <MenuItem
                          eventKey={4.3}
                          onClick={e => this.handleSubmit(e, constants.COUNTRIES_URL)}
                        >
                          <FaGlobeAsia className="text-success icon-margin" size={18} />
                          Countries
                        </MenuItem>
                      </NavDropdown>
                    )}
                </Nav>
              )}
            {user.isAuthenticated ? (
              <Nav pullRight>
                <NavDropdown
                  id="account-nav-dropdown"
                  eventKey={5}
                  title={
                    <span>
                      <span className="glyphicon glyphicon-user mr5" aria-hidden="true" />
                      {user.displayName || user.email}
                    </span>
                  }
                >
                  <MenuItem
                    eventKey={5.1}
                    onClick={e => this.handleSubmit(e, constants.PROFILE_URL)}
                  >
                    <FaImage className="text-success icon-margin" size={20} />
                    Update Profile
                  </MenuItem>
                  {user.providerId === constants.PASSWORD && (
                    <MenuItem
                      eventKey={5.2}
                      onClick={e => this.handleSubmit(e, constants.CHANGE_PASSWORD_URL)}
                    >
                      <FaLock className="text-danger icon-margin" size={20} />
                      Change Password
                    </MenuItem>
                  )}
                  <MenuItem eventKey={5.3} onClick={this.handleShow}>
                    <FaSignOutAlt className="text-primary icon-margin" size={20} />
                    Sign-Out
                  </MenuItem>
                </NavDropdown>
                <NavItem eventKey={6} href="#" className="nav-picture">
                  <Image
                    src={user.photoURL}
                    onError={e => (e.target.src = photo)}
                    circle
                    responsive
                  />
                </NavItem>
              </Nav>
            ) : (
              <Nav pullRight>
                <NavItem eventKey={2} onClick={e => this.handleSubmit(e, constants.SIGN_IN_URL)}>
                  <FaSignInAlt className="icon-margin" size={20} />
                  Sign-In
                </NavItem>
              </Nav>
            )}
          </Navbar.Collapse>
        </Navbar>
        <ModalComponent
          title="Sign out?"
          body="Are you sure you would like to sign out?"
          show={this.state.show}
          handleClose={this.handleClose}
          handleSubmit={this.handleSignOut}
        />
      </div>
    );
  }
  handleSubmit = (e, url) => {
    e.preventDefault();
    // do nothing while on the same page nav click
    if (this.props.location.pathname !== url) this.props.history.replace(url);
  };
  handleClose = () => {
    this.setState({ show: false });
  };
  handleShow = e => {
    e.preventDefault();
    this.setState({ show: true });
  };
  handleSignOut = e => {
    e.preventDefault();
    this.setState({ show: false });
    /* 
    // issue with redux-form sign-in validation
    // as form loads twice and destroying UPDATE_SYNC_ERRORS
    this.props.authActions.signOut().then(() => {
      this.props.history.replace(constants.SIGN_IN_URL);
    });
    */
    this.props.authActions.signOut();
  };
}

function mapStateToProps(state) {
  return {
    user: state.read.auth.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    authActions: bindActionCreators(authActions, dispatch)
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(HeaderContainer)
);
