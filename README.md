### [GRPC](https://grpc.io/) -  NodeJS + CA SSL Certs 

This is a basic sample  of **client -> server**  communication using GRPC protocol with NodeJS.

- Certificates generation
- Secure connection with CA SSL

#### Install dependencies

```sh
npm install
```

##### Generate SSL Certificates .crt (certificates will be generated at `./certs/crt`)

```sh
 npm run gen:crt_certs
```

##### Running GRPC Server

```sh
 npm run start
```

##### Running GRPC Client

```sh
 npm run client
```

##### `TODO`

- [] auto generate *.pem ssl files, can refer [instructions.sh](https://github.com/simplesteph/grpc-go-course/blob/master/ssl/instructions.sh)

### Refer

- [grpc-go-course](https://github.com/simplesteph/grpc-go-course)

- [node-grpc-ssl](https://github.com/gbahamondezc/node-grpc-ssl)