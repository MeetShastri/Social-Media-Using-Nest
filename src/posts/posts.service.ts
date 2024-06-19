import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from './schema/post.schema';
import mongoose from 'mongoose';
import { User } from 'src/users/schema/user.schema';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private postModel: mongoose.Model<Post>,
    @InjectModel(User.name) private userModel: mongoose.Model<User>,
  ) {}

  async createPost(createPost: CreatePostDto, file: Express.Multer.File, res) {
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
    ).populate('user');

    // data.user.password = undefined;
    return res
      .status(201)
      .json({ message: 'Post created successfully', data: newPost });
  }
}
