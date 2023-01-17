const AWS = require("aws-sdk");
const multer = require("multer");
const s3 = new AWS.S3({ apiVersion: "2006-03-01" });
const NAME_OF_BUCKET = "<NAME-OF-YOUR-BUCKET>"; // TODO - UPDATE ME <-- Use your bucket name here


const singleFileUpload = async ({ file, public = false }) => {
  const { originalname, buffer } = file;
  const path = require("path");

  // Set the name of the file in your S3 bucket to the date in ms plus the
  // extension name.
  const Key = new Date().getTime().toString() + path.extname(originalname);
  const uploadParams = {
    Bucket: NAME_OF_BUCKET,
    Key: public ? `public/${Key}` : Key,
    Body: buffer
  };
  const result = await s3.upload(uploadParams).promise();

  // Return the link if public. If private, return the name of the file in your
  // S3 bucket as the key in your database for subsequent retrieval.
  return public ? result.Location : result.Key;
};


module.exports = {
  s3,
  singleFileUpload
};