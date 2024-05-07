import AWS from "aws-sdk";
import moment from "moment";


// S3 Bucket Name
const S3_BUCKET = process?.env?.REACT_APP_S3_BUCKET;

// S3 Region
const REGION = process?.env?.REACT_APP_REGION;

// S3 Credentials
AWS.config.update({
  accessKeyId: process?.env?.REACT_APP_ACCESS_KEY_ID,
  secretAccessKey: process?.env?.REACT_APP_SECRET_KEY_ID,
});
const s3 = new AWS.S3({
  params: { Bucket: S3_BUCKET },
  region: REGION,
});

// Files Parameters

export const uploadFileOnS3 = async ({ file, fileName }) => {
  // Uploading file to s3
  const params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Body: file
  };
  const upload = s3
    .putObject(params)
    .on("httpUploadProgress", (evt) => {
      // File uploading progress
      console.log(
        "Uploading " + parseInt((evt.loaded * 100) / evt.total) + "%"
      );
    })
    .promise();

  await upload.then((err, data) => {
    console.log(err);
    // Fille successfully uploaded
    console.log('data > ', data);
  });
};

export const uploadImageOnS3 = async (file) => {
  const params = {
    ACL: 'public-read',
    Body: file,
    Bucket: S3_BUCKET,
    Key: `${file.name}-${moment().format('D-MMM-YY-h:mm')}`
  };

  await s3.putObject(params)
    .on('httpUploadProgress', (evt) => {
      console.log("Uploading Images" + Math.round((evt.loaded / evt.total) * 100));
    })
    .send((err) => {
      if (err) console.log(err);
      throw err;
    })
}
