'use strict';

module.exports.hello = async (event, context, callback) => {
  const body = JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
      content: 'Hello World!'
    },
    null,
    2
  );

  const response = {
    statusCode: 200,
    body: body
  }

  return response;

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
