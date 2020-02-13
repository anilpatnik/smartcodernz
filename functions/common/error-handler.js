import { helper } from ".";

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  // return res.status(500).json({ message: err.message });
  const error = `error: [${helper.getDateTime}] ${err}`;
  // log to firebase functions console
  // eslint-disable-next-line no-console
  console.log(error);
};

export default errorHandler;
