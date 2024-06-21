import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from './schema/post.schema';
import mongoose from 'mongoose';
import { User } from 'src/users/schema/user.schema';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Request, Response } from 'express';
import * as multer from 'multer';
import { Comment } from 'src/comments/schema/comment.schema';

const storage = multer.memoryStorage();
const upload = multer({ storage });

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private postModel: mongoose.Model<Post>,
    @InjectModel(User.name) private userModel: mongoose.Model<User>,
    @InjectModel(Comment.name) private commentModel: mongoose.Model<Comment>,
  ) {}

  async createPost(
    createPost: CreatePostDto,
    file: Express.Multer.File,
    res: Response,
  ) {
    createPost.imagePath = file ? file.path : null;
    if (!createPost.text || !createPost.imagePath || !createPost.user) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const user = await this.userModel.findById(createPost.user);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const newPost = await (
      await this.postModel.create({
        text: createPost.text,
        imagePath: createPost.imagePath,
        user: createPost.user,
        likes: createPost.likes,
      })
    ).populate('user', '-password');

    // data.user.password = undefined;
    return res
      .status(201)
      .json({ message: 'Post created successfully', data: newPost });
  }

  async getPostsOfUser(userid: string, res: Response) {
    const posts = await this.postModel.find({ user: userid });
    if (posts.length > 0) {
      return res.status(200).json({ message: 'Posts found', data: posts });
    }
  }

  async getPost(postid: string, res: Response) {
    const post = await this.postModel
      .findById(postid)
      .populate('user', '-password')
      .populate('comment');
    console.log(post.comment[0]);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (post.comment.length > 0) {
      return res.status(200).json({ message: 'Post found', data: post });
    }
  }

  async updatePost(
    postid: string,
    updatePost: UpdatePostDto,
    res: Response,
    req: Request,
  ) {
    upload.single('imagePath')(req, res, async (err: any) => {
      if (err) {
        return res
          .status(400)
          .json({ message: 'File upload error', error: err });
      }

      const updatePost: UpdatePostDto = req.body;
      const file = req.file;

      if (file) {
        const imageUrl = `uploads/${file.originalname}`;
        updatePost.imagePath = imageUrl;
      }

      console.log(updatePost);

      const post = await this.postModel.findOneAndUpdate(
        { _id: postid },
        { ...updatePost },
        { new: true },
      );

      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }

      return res
        .status(200)
        .json({ message: 'Post updated successfully', data: post });
    });
  }

  async deletePost(postid: string, res: Response) {
    const post = await this.postModel.findByIdAndDelete(postid);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    return res.status(200).json({ message: 'Post deleted successfully' });
  }

  async search(q: string, res: Response) {
    const posts = await this.postModel.find({
      $or: [{ text: { $regex: q, $options: 'i' } }],
    });
    return res.status(200).json({ message: 'Posts found', data: posts });
  }
}
