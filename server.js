require('dotenv').config();
const { readFileSync } = require('fs');
const { join } = require('path');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const PROTO_PATH = join(__dirname, './proto/helloworld.proto');

const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const package = grpc.loadPackageDefinition(packageDefinition);

const sayHello = (call, callback) => {
  console.info('Calling method [sayHello]');
  callback(null, { message: 'Hello ' + call.request.name });
};

const server = new grpc.Server();
const credentials =
  process.env.SSL === 'crt'
    ? grpc.ServerCredentials.createSsl(
        readFileSync('./certs/crt/ca.crt'),
        [
          {
            cert_chain: readFileSync('./certs/crt/server.crt'),
            private_key: readFileSync('./certs/crt/server.key'),
          },
        ],
        true
      )
    : grpc.ServerCredentials.createSsl(
        readFileSync('./certs/pem/ca.pem'),
        [
          {
            cert_chain: readFileSync('./certs/pem/server/server.pem'),
            private_key: readFileSync('./certs//pem/server/server.key'),
          },
        ],
        true
      );

server.addService(package.helloworld.Greeter.service, { sayHello: sayHello });

const SERVER_PORT = process.env.SERVER_PORT || '50051';
server.bindAsync(`localhost:${SERVER_PORT}`, credentials, (err) => {
  if (err) {
    console.error('Bind failed', err);
    return;
  }
  server.start();
  console.info(`GRPC server started at port: ${SERVER_PORT}, pid: ${process.pid}`);
});
