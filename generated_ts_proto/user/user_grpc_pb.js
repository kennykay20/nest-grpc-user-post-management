// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var user_user_pb = require('../user/user_pb.js');

function serialize_user_CreatePostDto(arg) {
  if (!(arg instanceof user_user_pb.CreatePostDto)) {
    throw new Error('Expected argument of type user.CreatePostDto');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_user_CreatePostDto(buffer_arg) {
  return user_user_pb.CreatePostDto.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_user_CreateUserDto(arg) {
  if (!(arg instanceof user_user_pb.CreateUserDto)) {
    throw new Error('Expected argument of type user.CreateUserDto');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_user_CreateUserDto(buffer_arg) {
  return user_user_pb.CreateUserDto.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_user_Empty(arg) {
  if (!(arg instanceof user_user_pb.Empty)) {
    throw new Error('Expected argument of type user.Empty');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_user_Empty(buffer_arg) {
  return user_user_pb.Empty.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_user_FindOnePostDto(arg) {
  if (!(arg instanceof user_user_pb.FindOnePostDto)) {
    throw new Error('Expected argument of type user.FindOnePostDto');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_user_FindOnePostDto(buffer_arg) {
  return user_user_pb.FindOnePostDto.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_user_FindOneUserDto(arg) {
  if (!(arg instanceof user_user_pb.FindOneUserDto)) {
    throw new Error('Expected argument of type user.FindOneUserDto');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_user_FindOneUserDto(buffer_arg) {
  return user_user_pb.FindOneUserDto.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_user_LoginNoPassResponse(arg) {
  if (!(arg instanceof user_user_pb.LoginNoPassResponse)) {
    throw new Error('Expected argument of type user.LoginNoPassResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_user_LoginNoPassResponse(buffer_arg) {
  return user_user_pb.LoginNoPassResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_user_LoginPayload(arg) {
  if (!(arg instanceof user_user_pb.LoginPayload)) {
    throw new Error('Expected argument of type user.LoginPayload');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_user_LoginPayload(buffer_arg) {
  return user_user_pb.LoginPayload.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_user_LoginUserOtpPayload(arg) {
  if (!(arg instanceof user_user_pb.LoginUserOtpPayload)) {
    throw new Error('Expected argument of type user.LoginUserOtpPayload');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_user_LoginUserOtpPayload(buffer_arg) {
  return user_user_pb.LoginUserOtpPayload.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_user_PaginationDto(arg) {
  if (!(arg instanceof user_user_pb.PaginationDto)) {
    throw new Error('Expected argument of type user.PaginationDto');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_user_PaginationDto(buffer_arg) {
  return user_user_pb.PaginationDto.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_user_UpdatePostDto(arg) {
  if (!(arg instanceof user_user_pb.UpdatePostDto)) {
    throw new Error('Expected argument of type user.UpdatePostDto');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_user_UpdatePostDto(buffer_arg) {
  return user_user_pb.UpdatePostDto.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_user_User(arg) {
  if (!(arg instanceof user_user_pb.User)) {
    throw new Error('Expected argument of type user.User');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_user_User(buffer_arg) {
  return user_user_pb.User.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_user_Users(arg) {
  if (!(arg instanceof user_user_pb.Users)) {
    throw new Error('Expected argument of type user.Users');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_user_Users(buffer_arg) {
  return user_user_pb.Users.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_user_VerifyOTPpayload(arg) {
  if (!(arg instanceof user_user_pb.VerifyOTPpayload)) {
    throw new Error('Expected argument of type user.VerifyOTPpayload');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_user_VerifyOTPpayload(buffer_arg) {
  return user_user_pb.VerifyOTPpayload.deserializeBinary(new Uint8Array(buffer_arg));
}


var UserServiceService = exports.UserServiceService = {
  createUser: {
    path: '/user.UserService/CreateUser',
    requestStream: false,
    responseStream: false,
    requestType: user_user_pb.CreateUserDto,
    responseType: user_user_pb.User,
    requestSerialize: serialize_user_CreateUserDto,
    requestDeserialize: deserialize_user_CreateUserDto,
    responseSerialize: serialize_user_User,
    responseDeserialize: deserialize_user_User,
  },
  // ** Create a Post for a particular user procedure *
createPost: {
    path: '/user.UserService/CreatePost',
    requestStream: false,
    responseStream: false,
    requestType: user_user_pb.CreatePostDto,
    responseType: user_user_pb.User,
    requestSerialize: serialize_user_CreatePostDto,
    requestDeserialize: deserialize_user_CreatePostDto,
    responseSerialize: serialize_user_User,
    responseDeserialize: deserialize_user_User,
  },
  // ********* Get All Listed Posts *************
//
findAllPost: {
    path: '/user.UserService/FindAllPost',
    requestStream: false,
    responseStream: false,
    requestType: user_user_pb.Empty,
    responseType: user_user_pb.Users,
    requestSerialize: serialize_user_Empty,
    requestDeserialize: deserialize_user_Empty,
    responseSerialize: serialize_user_Users,
    responseDeserialize: deserialize_user_Users,
  },
  // ********** Get a single post by id ***********
//
findOnePost: {
    path: '/user.UserService/FindOnePost',
    requestStream: false,
    responseStream: false,
    requestType: user_user_pb.FindOnePostDto,
    responseType: user_user_pb.User,
    requestSerialize: serialize_user_FindOnePostDto,
    requestDeserialize: deserialize_user_FindOnePostDto,
    responseSerialize: serialize_user_User,
    responseDeserialize: deserialize_user_User,
  },
  // ************  Update a user Post ***************
//
updatePost: {
    path: '/user.UserService/UpdatePost',
    requestStream: false,
    responseStream: false,
    requestType: user_user_pb.UpdatePostDto,
    responseType: user_user_pb.User,
    requestSerialize: serialize_user_UpdatePostDto,
    requestDeserialize: deserialize_user_UpdatePostDto,
    responseSerialize: serialize_user_User,
    responseDeserialize: deserialize_user_User,
  },
  // ************* Delete a single Post by id *****************
//
removePost: {
    path: '/user.UserService/RemovePost',
    requestStream: false,
    responseStream: false,
    requestType: user_user_pb.FindOnePostDto,
    responseType: user_user_pb.User,
    requestSerialize: serialize_user_FindOnePostDto,
    requestDeserialize: deserialize_user_FindOnePostDto,
    responseSerialize: serialize_user_User,
    responseDeserialize: deserialize_user_User,
  },
  // **************** Return a large amount of POST data, return a stream ********************************
queryUsers: {
    path: '/user.UserService/QueryUsers',
    requestStream: true,
    responseStream: true,
    requestType: user_user_pb.PaginationDto,
    responseType: user_user_pb.Users,
    requestSerialize: serialize_user_PaginationDto,
    requestDeserialize: deserialize_user_PaginationDto,
    responseSerialize: serialize_user_Users,
    responseDeserialize: deserialize_user_Users,
  },
  loginUserOtp: {
    path: '/user.UserService/LoginUserOtp',
    requestStream: false,
    responseStream: false,
    requestType: user_user_pb.LoginUserOtpPayload,
    responseType: user_user_pb.LoginNoPassResponse,
    requestSerialize: serialize_user_LoginUserOtpPayload,
    requestDeserialize: deserialize_user_LoginUserOtpPayload,
    responseSerialize: serialize_user_LoginNoPassResponse,
    responseDeserialize: deserialize_user_LoginNoPassResponse,
  },
  // *
//  This endpoint authenticates a user by accepting the valid login payload and returns user data with auth token
loginUser: {
    path: '/user.UserService/LoginUser',
    requestStream: false,
    responseStream: false,
    requestType: user_user_pb.LoginPayload,
    responseType: user_user_pb.User,
    requestSerialize: serialize_user_LoginPayload,
    requestDeserialize: deserialize_user_LoginPayload,
    responseSerialize: serialize_user_User,
    responseDeserialize: deserialize_user_User,
  },
  getUserById: {
    path: '/user.UserService/GetUserById',
    requestStream: false,
    responseStream: false,
    requestType: user_user_pb.FindOneUserDto,
    responseType: user_user_pb.User,
    requestSerialize: serialize_user_FindOneUserDto,
    requestDeserialize: deserialize_user_FindOneUserDto,
    responseSerialize: serialize_user_User,
    responseDeserialize: deserialize_user_User,
  },
  // *
//  This endpoint verifys a user by accepting the valid otp payload and returns user data with auth token
verifyOTP: {
    path: '/user.UserService/VerifyOTP',
    requestStream: false,
    responseStream: false,
    requestType: user_user_pb.VerifyOTPpayload,
    responseType: user_user_pb.User,
    requestSerialize: serialize_user_VerifyOTPpayload,
    requestDeserialize: deserialize_user_VerifyOTPpayload,
    responseSerialize: serialize_user_User,
    responseDeserialize: deserialize_user_User,
  },
};

exports.UserServiceClient = grpc.makeGenericClientConstructor(UserServiceService);
