import { Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Observable, Subject } from 'rxjs';
import { CreatePostDto, FindOnePostDto, UpdatePostDto } from '@app/common';
import { Metadata } from '@grpc/grpc-js';
import { EntityManager, Repository } from 'typeorm';
import { Post } from './models/post.model';
import { InjectEntityManager } from '@nestjs/typeorm';
import { User } from '../user/models/user.model';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class PostService {
  private readonly postRepository: Repository<Post>;
  private readonly userRepository: Repository<User>;

  constructor(
    @InjectEntityManager() private readonly entityManager: EntityManager,
  ) {
    this.postRepository = entityManager.getRepository(Post);
    this.userRepository = entityManager.getRepository(User);
  }

  async createPost(data: CreatePostDto) {
    try {
      const { userId, postDetails } = data;
      const userExist = await this.userRepository.findOne({
        where: {
          id: userId,
        },
      });
      if (!userExist) {
        throw new RpcException(`user not found with id ${userId}`);
      }

      const post = new Post();
      post.id = randomUUID().toString();
      post.content = postDetails.content;
      post.user.id = (await userExist).id;
      post.selectCategory = postDetails.selectCategory;

      await this.postRepository.save(post);
      delete post.user.password;

      return post;
    } catch (error) {
      Logger.log(error);
    }
  }

  async getAllPost() {}

  async getPostById(data: FindOnePostDto) {
    try {
      const { id } = data;
      const post = await this.postRepository.findOne({
        where: {
          id,
          isDelete: false,
        },
      });
      delete post.user.password;
      return post;
    } catch (error) {
      Logger.log(error);
    }
  }

  async updatePost(data: UpdatePostDto, metadata: Metadata) {
    try {
      const { id, postDetails } = data;
      const post = await this.postRepository.findOne({
        where: {
          id,
          isDelete: false,
        },
      });

      if (!post) {
        throw new RpcException(`Post with id ${id} not found`);
      }

      post.content = postDetails.content;
      post.selectCategory = postDetails.selectCategory;

      await this.postRepository.update({ id }, { ...post });
      delete post.user.password;

      return post;
    } catch (error) {
      Logger.log(error);
      throw new RpcException(error);
    }
  }

  async deletePost(data: FindOnePostDto, metadata: Metadata) {
    try {
      const { id } = data;
      const post = await this.postRepository.findOne({
        where: {
          id,
          isDelete: false,
        },
      });

      if (!post) {
        throw new RpcException(`Post with id ${id} not found`);
      }

      post.isDelete = true;
      await this.postRepository.save(post);
      return post;
    } catch (error) {
      Logger.log(error);
    }
  }
}
