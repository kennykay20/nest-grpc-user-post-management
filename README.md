## Monorepo Microservice User/Post Management
Build with 
1. Nodejs as the run time environment
2. Nestjs a backend framework, built with both typescript and javascript, and some other libraries
3. Database Postgresql, pg
4. Protobuffer with Grpc
5. Swagger doc for the document 

# this includes a protoc.sh 
proto buffer compiler written in a bash script, you will need to run this protoc.sh 
- try run the protoc.sh with a script run found inside the package.json --- npm run postinstall
- it will generate a folder name generated_ts_proto which contains the grpc buffer compiler into both javascript and typescript
- the generated_ts folder is been exported inside the libs/common/src/types index file 
- I use @app/common anywhere i import to use the generated_ts_proto

# This dist folder contains where the app runs after built successfully
- This contains both the micro-api-gateway where clients request comes into as the core of the app
- The micro-usr-service which the micro-api-gateway connects to, in a real project, this won't be a monorepo culture
- The api-gateway connects to the micro-user-service sends request to the user-service and the micro-user-service respond back and the api-gateway respond back to the client
- 

# we have the .env file, in a real app we don't expose it, one of the reason why we have .gitignore where it's been added 
- for clarification, the .env file contains required information, which are rendered in the config/index.ts file with extraction with a Joi library and dotenv, if the required field are not found, we will get an error. you can check the .env.example how the .env to look like.

## run the app
- npm run start:dev --- will start the micro-api-gateway
- nom run start:dev micro-user-service --- start the micro-user-service which the micro-api-gateway connects to... 


## I couldn't finish up with this project cos of the time given, I would have needed 3 days to finish but because of GRPC  with the protobuff, Assuming it's a RESTAPI pattern it would have been more faster, if you can still give me more time I will love to finish this.. Regards 
