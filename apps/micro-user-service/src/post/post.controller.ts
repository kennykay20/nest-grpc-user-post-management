import { Controller } from '@nestjs/common';
import { PostService } from './post.service';
import { GrpcMethod } from '@nestjs/microservices';
import { Metadata } from '@grpc/grpc-js';
import {
  CreatePostDto,
  Empty,
  FindOnePostDto,
  UpdatePostDto,
} from '@app/common';

@Controller()
export class PostController {
  constructor(private readonly postService: PostService) {}

  @GrpcMethod('PostService', 'CreatePost')
  createPost(data: CreatePostDto, metadata: Metadata) {
    return this.postService.createPost(data);
  }

  @GrpcMethod('PostService', 'FindAllPost')
  findAllPost(data: Empty, metadata: Metadata) {
    return this.postService.getAllPost();
  }

  @GrpcMethod('PostService', 'FindOnePost')
  findOnePost(data: FindOnePostDto, metadata: Metadata) {
    return this.postService.getPostById(data);
  }
  @GrpcMethod('PostService', 'UpdatePost')
  updatePost(data: UpdatePostDto, metadata: Metadata) {
    return this.postService.updatePost(data, metadata);
  }

  @GrpcMethod('PostService', 'RemovePost')
  deletePost(data: FindOnePostDto, metadata: Metadata) {
    return this.postService.deletePost(data, metadata);
  }
}
