import moment from "moment";
import { firebase } from "../config";
import { constants } from ".";

export default class helper {
  // get current date time - Jan 1, 2017 00:00:00 AM
  static get getDateTime() {
    return moment().format("ll LTS");
  }
  // get current user from sessionStorage
  static get getSessionUserId() {
    return Object.keys(sessionStorage).map(key => {
      if (key.includes("authUser")) {
        const auth = sessionStorage.getItem(key);
        if (auth && auth.length > 0) {
          const user = JSON.parse(auth);
          return user.uid;
        }
      }
      return constants.EMPTY_OBJECT;
    });
  }
  // upload profile pic in firebase storage
  static uploadProfilePic(item) {
    return firebase
      .storage()
      .ref()
      .child(constants.USERS_URL)
      .child(item.uid)
      .child("profilePic")
      .put(item.file);
  }
  // resize image to 400x400 at 0.95% quality
  static resizeImage(file, callback) {
    const maxWidth = 400;
    const maxHeight = 400;
    const quality = 0.95;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = e => {
      const dataUrl = e.target.result;
      const image = document.createElement("img");
      image.src = dataUrl;
      image.onload = () => {
        const canvas = document.createElement("canvas");
        let width = image.width;
        let height = image.height;
        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(image, 0, 0, width, height);
        canvas.toBlob(blob => callback(blob), file.type, quality);
      };
    };
  }
}
