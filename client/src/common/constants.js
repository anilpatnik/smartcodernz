// environments
export const PRODUCTION = "production";
// production web url
export const SITE_URL = "https://smartcodernz.firebaseio.com";
// rest api url
export const API_URL = process.env.NODE_ENV === PRODUCTION ? "/api" : "http://localhost:3001/api";
// user roles
export const SUPER_ADMIN_ROLE = "super";
export const BATCH_ADMIN_ROLE = "batch";
export const ADMIN_ROLE = "admin";
export const MERCHANT_ROLE = "merchant";
export const USER_ROLE = "user";
// generic
export const ASC = "asc";
export const DESC = "desc";
export const VALUE = "value";
export const KEY = "key";
export const ID = "id";
export const NEW = "new";
export const FILE = "file";
export const SUCCESSFUL = "successful";
export const UNSUCCESSFUL = "unsuccessful";
export const SUBMIT_SUCCESSFUL = "submit successful";
export const DELETE_SUCCESSFUL = "delete successful";
export const SUCCESS = "success";
export const INFO = "info";
export const WARNING = "warning";
export const ERROR = "error";
export const LOADING = "Loading...";
export const LOAD_MORE = "Load More";
export const SUBMIT = "Submit";
export const RESET = "Reset";
export const SEARCH = "Search";
// single-ton params
export const EMPTY_STRING = "";
export const EMPTY_OBJECT = {};
export const EMPTY_ARRAY = [];
// http response status codes
export const HTTP_400 = "Bad Request";
export const HTTP_200 = "OK";
// auth params
export const CODE = "code";
export const MODE = "mode";
export const ACTION_CODE = "oobCode";
export const RESET_PASSWORD = "resetPassword";
export const VERIFY_EMAIL = "verifyEmail";
export const PASSWORD = "password";
export const GOOGLE = "google.com";
export const FACEBOOK = "facebook.com";
export const STATE_CHANGED = "state_changed";
// urls
export const ROOT_URL = "/";
export const SIGN_IN_URL = "/signin";
export const SIGN_UP_URL = "/signup";
export const FORGOT_PASSWORD_URL = "/forgotpassword";
export const RESET_PASSWORD_URL = "/resetpassword";
export const CHANGE_PASSWORD_URL = "/changepassword";
export const VERIFY_EMAIL_URL = "/verifyemail";
export const HOME_URL = "/dashboard";
export const AUTH_URL = "/auth";
export const USERS_URL = "/users";
export const PROFILE_URL = "/profile";
export const PROFILE_PIC_URL = "/profilepic";
export const LOOKUP_URL = "/lookup";
export const CATEGORIES_URL = "/categories";
export const COUNTRIES_URL = "/countries";
export const MERCHANTS_URL = "/merchants";
export const DEALS_URL = "/deals";
