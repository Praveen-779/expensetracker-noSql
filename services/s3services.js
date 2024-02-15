const AWS = require('aws-sdk');

exports.uploadTos3 = (data, filename) => {

    try {
        const BUCKET_NAME = process.env.AWS_BUCKET_NAME;
        const IAM_USER_KEY = process.env.IAM_USER_KEY;
        const IAM_USER_SECRET = process.env.IAM_USER_SECRET;

        const s3bucket = new AWS.S3({
            accessKeyId: IAM_USER_KEY,
            secretAccessKey: IAM_USER_SECRET

        })
        const params = {
            Bucket: BUCKET_NAME,
            Key: filename,
            Body: data,
            ACL: 'public-read'
        }

        return new Promise((resolve, reject) => {
            s3bucket.upload(params, (err, data) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                resolve(data.Location);
            })
        })
    } catch (err) {
        console.log(err);
    }
}