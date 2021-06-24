require('dotenv').config();
const { readFileSync } = require('fs');
const { join } = require('path');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const PROTO_PATH = join(__dirname, './proto/helloworld.proto');

const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const Greeter = grpc.loadPackageDefinition(packageDefinition).helloworld.Greeter;

const credentials =
  process.env.SSL === 'crt'
    ? grpc.credentials.createSsl(
        readFileSync('./certs/crt/ca.crt'),
        readFileSync('./certs/crt/client.key'), // privateKey
        readFileSync('./certs/crt/client.crt') // certChain
      )
    : grpc.credentials.createSsl(
        readFileSync('./certs/pem/ca.pem'),
        readFileSync('./certs/pem/client/client.key'), // privateKey
        readFileSync('./certs/pem/client/client.pem') // certChain
      );

const host = process.env.SERVER_NAME || 'go-grpc-example';
const client = new Greeter('localhost:50051', credentials, {
  'grpc.ssl_target_name_override': host,
  'grpc.default_authority': host,
});

client.sayHello({ name: 'sample' }, (err, response) => {
  if (err) {
    console.error('Greeting err :', err);
    return;
  }
  console.log('Greeting:', response && response.message);
});
