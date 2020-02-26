import fetch from 'isomorphic-unfetch'
import { parseCookies } from 'nookies'
var AWS = require('aws-sdk');

AWS.config.update({
  region: "us-west-2",
  endpoint: "http://localhost:8000"
});

function Index({ playlists }) {
  return (
    <div>
      <div>User from response:</div>
      <div>{playlists[0].name}</div>
    </div>
  )
}

Index.getInitialProps = async (ctx) => {
  let cookies = parseCookies(ctx)
  if (IsObjectEmpty(cookies)) {
    RedirectToLogin(ctx);
    return {};
  }
  if (IsObjectEmpty(cookies.sessionId)) {
    RedirectToLogin(ctx);
    return {};
  }

  let token = await GetTokenFromDb(cookies.sessionId);

  let playlists = [];
  if (token !== undefined) {
    // get playlists from api
    playlists = [{ "name": "playlist1" }]
  }

  return { playlists }
}

export default Index

function IsObjectEmpty(obj) {
  return Object.entries(obj).length === 0 && obj.constructor === Object;
}

async function GetTokenFromDb(sessionId) {
  var docClient = new AWS.DynamoDB.DocumentClient();
  var table = "Session";
  var getParams = {
    TableName: table,
    Key: {
      "sessionId": sessionId,
    }
  };

  let token = "";
  try {
    let dbResponse = await docClient.get(getParams).promise();
    token = dbResponse.Item.token;
    console.log("token: " + token);
  }
  catch (err) {
    console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
  }

  return token;
}

function RedirectToLogin(ctx) {
  ctx.res.writeHead(302, { location: '/login' });
  ctx.res.end();
}

