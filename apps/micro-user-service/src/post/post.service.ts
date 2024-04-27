import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Observable, Subject } from 'rxjs';
import { CreatePostDto, UpdatePostDto, User } from '@app/common';
import { Metadata } from '@grpc/grpc-js';

@Injectable()
export class PostService {
  getHello(): string {
    return 'Hello World!';
  }

  async createPost(data: CreatePostDto, metadata: Metadata) {
    try {
    } catch (error) {}
  }

  async getAllPost() {}

  async getPostById() {}

  async updatePost(data: UpdatePostDto, metadata: Metadata) {}

  async deletePost() {}
}
