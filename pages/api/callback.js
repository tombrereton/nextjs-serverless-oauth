import cookies from '../../utils/cookies'
import { v4 as uuidv4 } from 'uuid';

var AWS = require('aws-sdk');

AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000"
});

const handler = (req, res) => {
    // api/callback generates sessionId
    // saves sessionId in cookie
    // saves sessionId and token in db
    // redirects to select
    var docClient = new AWS.DynamoDB.DocumentClient();
    var table = "Session";
    var token = "imatoken";
    let sessionId = uuidv4();

    var insertParams = {
        TableName: table,
        Item: {
            "sessionId": sessionId,
            "token": token,
        }
    };

    console.log("Adding a new item...");
    docClient.put(insertParams, function (err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Added item:", JSON.stringify(data, null, 2));
        }
    });

    let cookieOptions = { path: '/', domain: 'localhost', samesite: 'Strict', httpOnly: true, secure: false }
    res.cookie('sessionId', sessionId, cookieOptions)
    res.writeHead(302, { location: '/' });
    return res.end();
}

export default cookies(handler)
