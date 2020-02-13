import React from "react";
import { toast } from "react-toastify";
import { ToastComponent } from "../components/common";
import * as constants from "./constants";

const toaster = (message, type) => {
  let toastType;
  switch (type) {
    case constants.SUCCESS:
      toastType = toast.TYPE.SUCCESS;
      break;
    case constants.INFO:
      toastType = toast.TYPE.INFO;
      break;
    case constants.WARNING:
      toastType = toast.TYPE.WARNING;
      break;
    case constants.ERROR:
      toastType = toast.TYPE.ERROR;
      break;
    default:
      toastType = toast.TYPE.DEFAULT;
      break;
  }
  toast(<ToastComponent message={message} />, {
    autoClose: 5000,
    type: toastType,
    position: toast.POSITION.BOTTOM_CENTER
  });
};

export default toaster;
