/* eslint-disable no-unused-vars */
import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { constants } from "../common";
import { WithAuthentication, WithoutAuthentication } from "../components/hoc";
import { MainContainer, DashboardContainer } from "../components/home";
import {
  SignInContainer,
  SignUpContainer,
  ForgotPasswordContainer,
  ResetPasswordContainer,
  ChangePasswordContainer,
  VerifyEmailContainer,
  UpdateProfileContainer
} from "../components/authentication";
import { UsersContainer, UserContainer } from "../components/users";
import { CategoriesContainer, CategoryContainer, CountriesContainer } from "../components/lookups";
import { DealContainer } from "../components/deals";
import { MerchantsContainer, MerchantContainer } from "../components/merchants";

// authorization rules
const User = WithAuthentication([
  constants.USER_ROLE,
  constants.MERCHANT_ROLE,
  constants.ADMIN_ROLE,
  constants.SUPER_ADMIN_ROLE
]);
const Merchant = WithAuthentication([
  constants.MERCHANT_ROLE,
  constants.ADMIN_ROLE,
  constants.SUPER_ADMIN_ROLE
]);
const Admin = WithAuthentication([constants.ADMIN_ROLE, constants.SUPER_ADMIN_ROLE]);
const Super = WithAuthentication([constants.SUPER_ADMIN_ROLE]);

// prettier-ignore
const RoutesComponent = () => (
  <Switch>
    <Route exact path={constants.ROOT_URL} component={MainContainer} />
    <Route exact path={constants.HOME_URL} component={DashboardContainer} />
    <Route exact path={constants.SIGN_IN_URL} component={WithoutAuthentication(SignInContainer)} />
    <Route exact path={constants.SIGN_UP_URL} component={WithoutAuthentication(SignUpContainer)} />
    <Route exact path={constants.FORGOT_PASSWORD_URL} component={WithoutAuthentication(ForgotPasswordContainer)} />    
    <Route exact path={constants.CHANGE_PASSWORD_URL} component={User(ChangePasswordContainer)} />
    <Route path={`${constants.RESET_PASSWORD_URL}/:${constants.CODE}`} component={WithoutAuthentication(ResetPasswordContainer)} />
    <Route path={`${constants.VERIFY_EMAIL_URL}/:${constants.CODE}`} component={WithoutAuthentication(VerifyEmailContainer)} />
    <Route exact path={constants.PROFILE_URL} component={User(UpdateProfileContainer)} />    
    <Route exact path={constants.USERS_URL} component={Super(UsersContainer)} />
    <Route path={`${constants.USERS_URL}/:${constants.ID}`} component={Super(UserContainer)} />
    <Route exact path={constants.CATEGORIES_URL} component={Super(CategoriesContainer)} />
    <Route path={`${constants.CATEGORIES_URL}/:${constants.ID}`} component={Super(CategoryContainer)} />        
    <Route exact path={constants.COUNTRIES_URL} component={Super(CountriesContainer)} />
    <Route exact path={constants.MERCHANTS_URL} component={Merchant(MerchantsContainer)} />
    <Route path={`${constants.MERCHANTS_URL}/:${constants.ID}`} component={Merchant(MerchantContainer)} />
    <Redirect to={constants.HOME_URL} component={DashboardContainer} />
  </Switch>
);

export default RoutesComponent;
