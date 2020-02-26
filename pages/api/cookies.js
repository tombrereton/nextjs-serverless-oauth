import cookies from '../../utils/cookies'
var AWS = require('aws-sdk');

AWS.config.update({
  region: "us-west-2",
  endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();
var table = "Session";
var sessionId = "123abc";
var token = "imatoken";

var insertParams = {
  TableName: table,
  Item: {
    "sessionId": sessionId,
    "token": token,
  }
};

var getParams = {
  TableName: table,
  Key: {
    "sessionId": sessionId,
  }
};

// docClient.get(getParams, function (err, data) {
//   if (err) {
//     console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
//   } else {
//     console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
//   }
// });

// console.log("Adding a new item...");
// docClient.put(params, function (err, data) {
//   if (err) {
//     console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
//   } else {
//     console.log("Added item:", JSON.stringify(data, null, 2));
//   }
// });

// var dynamodb = new AWS.DynamoDB();

// var params = {
//     TableName : "Session",
//     KeySchema: [       
//         { AttributeName: "sessionId", KeyType: "HASH"},  //Partition key
//     ],
//     AttributeDefinitions: [       
//         { AttributeName: "sessionId", AttributeType: "S" },
//     ],
//     ProvisionedThroughput: {       
//         ReadCapacityUnits: 1, 
//         WriteCapacityUnits: 1
//     }
// };

// dynamodb.createTable(params, function(err, data) {
//     if (err) {
//         console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
//     } else {
//         console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
//     }
// });

const handler = (req, res) => {
  docClient.get(getParams, function (err, data) {
    if (err) {
      console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
    }
    console.log(data)
    if (Object.entries(data).length === 0 && data.constructor === Object) {
      return res.end();
    }
    console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
    res.cookie('sessionId', data.Item.sessionId)
    return res.end();
  });
}

export default cookies(handler)
