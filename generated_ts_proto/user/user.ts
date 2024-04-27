/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "user";

export interface Empty {
}

export interface CreateUserDto {
  firstName: string;
  lastName: string;
  username: string;
  phone: string;
  password: string;
  imageUrl: string;
}

export interface CreatePostDto {
  userId: string;
  postDetails: PostDetails | undefined;
}

export interface PostDetails {
  content: string;
  selectCategory: string;
}

export interface UpdatePostDto {
  id: string;
  postDetails: PostDetails | undefined;
}

export interface FindOnePostDto {
  id: string;
}

export interface User {
  firstName: string;
  lastName: string;
  imageUrl: string;
  postDetails: PostDetails | undefined;
  createAt: string;
  updateAt: string;
  username: string;
  phone: string;
}

export interface Users {
  users: User[];
}

export interface FindOneUserDto {
  id: string;
}

export interface Interaction {
  userId: string;
  upVoting: string;
  downVoting: string;
}

export interface Comments {
  userId: string;
  comment: string;
}

export interface GetUserByUsernameOrPhoneRequest {
  username: string;
  phone: string;
}

export interface PaginationDto {
  page: number;
  skip: number;
}

export interface LoginUserOtpPayload {
  payload: string;
}

export interface LoginPayload {
  username: string;
  phone: string;
  password: string;
}

export interface LoginNoPassResponse {
  message: string;
  userId: string;
}

export interface VerifyOTPpayload {
  otp: string;
  userId: string;
}

export const USER_PACKAGE_NAME = "user";

export interface UserServiceClient {
  createUser(request: CreateUserDto): Observable<User>;

  /** * Create a Post for a particular user procedure * */

  createPost(request: CreatePostDto): Observable<User>;

  findAllPost(request: Empty): Observable<Users>;

  findOnePost(request: FindOnePostDto): Observable<User>;

  updatePost(request: UpdatePostDto): Observable<User>;

  removePost(request: FindOnePostDto): Observable<User>;

  /** *************** Return a large amount of POST data, return a stream ******************************** */

  queryUsers(request: Observable<PaginationDto>): Observable<Users>;

  loginUserOtp(request: LoginUserOtpPayload): Observable<LoginNoPassResponse>;

  /** This endpoint authenticates a user by accepting the valid login payload and returns user data with auth token */

  loginUser(request: LoginPayload): Observable<User>;

  getUserById(request: FindOneUserDto): Observable<User>;

  /** This endpoint verifys a user by accepting the valid otp payload and returns user data with auth token */

  verifyOtp(request: VerifyOTPpayload): Observable<User>;
}

export interface UserServiceController {
  createUser(request: CreateUserDto): Promise<User> | Observable<User> | User;

  /** * Create a Post for a particular user procedure * */

  createPost(request: CreatePostDto): Promise<User> | Observable<User> | User;

  findAllPost(request: Empty): Promise<Users> | Observable<Users> | Users;

  findOnePost(request: FindOnePostDto): Promise<User> | Observable<User> | User;

  updatePost(request: UpdatePostDto): Promise<User> | Observable<User> | User;

  removePost(request: FindOnePostDto): Promise<User> | Observable<User> | User;

  /** *************** Return a large amount of POST data, return a stream ******************************** */

  queryUsers(request: Observable<PaginationDto>): Observable<Users>;

  loginUserOtp(
    request: LoginUserOtpPayload,
  ): Promise<LoginNoPassResponse> | Observable<LoginNoPassResponse> | LoginNoPassResponse;

  /** This endpoint authenticates a user by accepting the valid login payload and returns user data with auth token */

  loginUser(request: LoginPayload): Promise<User> | Observable<User> | User;

  getUserById(request: FindOneUserDto): Promise<User> | Observable<User> | User;

  /** This endpoint verifys a user by accepting the valid otp payload and returns user data with auth token */

  verifyOtp(request: VerifyOTPpayload): Promise<User> | Observable<User> | User;
}

export function UserServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "createUser",
      "createPost",
      "findAllPost",
      "findOnePost",
      "updatePost",
      "removePost",
      "loginUserOtp",
      "loginUser",
      "getUserById",
      "verifyOtp",
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("UserService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = ["queryUsers"];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("UserService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const USER_SERVICE_NAME = "UserService";
