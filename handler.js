'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk');

AWS.config.setPromisesDependency(require('bluebird'));

const documentClient = new AWS.DynamoDB.DocumentClient();

module.exports.save = async (event, context, callback) => {
  const requestBody = JSON.parse(event.body);

  const name = requestBody.name;

  const timestamp = new Date().getTime();

  const record = {
    id: uuid.v1(),
    name: name,
    createdAt: timestamp,
    updatedAt: timestamp
  }

  const params = {
    TableName: 'MyDynamoDbTable',
    Item: record
  };

  await ((params) => {
    return new Promise((resolve, reject) => {
      documentClient.put(params, (err, data) => {
        if (err) reject(err)
        else resolve(data);
      });
    });
  })(params);

  callback(null, {
    statusCode: 200,
    body: JSON.stringify({
      message: 'successfully saved',
      id: record.id
    })
  });

}
