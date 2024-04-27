import { Controller, Get } from '@nestjs/common';
import { PostService } from './post.service';
import { GrpcMethod } from '@nestjs/microservices';
import { Metadata } from '@grpc/grpc-js';
import { CreatePostDto, UpdatePostDto } from '@app/common';

@Controller()
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  getHello(): string {
    return this.postService.getHello();
  }

  @GrpcMethod('PostService', 'CreatePost')
  createPost(data: CreatePostDto, metadata: Metadata) {
    return this.postService.createPost(data, metadata);
  }

  @GrpcMethod('PostService', 'FindAllPost')
  findAllPost(data: UpdatePostDto, metadata: Metadata) {
    return this.postService.updatePost(data, metadata);
  }

  @GrpcMethod('PostService', 'FindOnePost')
  findOnePost(data: UpdatePostDto, metadata: Metadata) {
    return this.postService.updatePost(data, metadata);
  }
  @GrpcMethod('PostService', 'UpdatePost')
  updatePost(data: UpdatePostDto, metadata: Metadata) {
    return this.postService.updatePost(data, metadata);
  }

  @GrpcMethod('PostService', 'RemovePost')
  deletePost(data: UpdatePostDto, metadata: Metadata) {
    return this.postService.updatePost(data, metadata);
  }
}
