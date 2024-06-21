import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Post } from 'src/posts/schema/post.schema';
import { User } from 'src/users/schema/user.schema';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Response } from 'express';
import { Comment } from './schema/comment.schema';
import { UpdateMessageDto } from './dto/update-message.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name) private commentModel: mongoose.Model<Comment>,
    @InjectModel(User.name) private userModel: mongoose.Model<User>,
    @InjectModel(Post.name) private postModel: mongoose.Model<Post>,
  ) {}

  async createComment(createComment: CreateCommentDto, res: Response) {
    const { comment, commentBy, commentedOn } = createComment;
    if (!comment || !commentBy || !commentedOn) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const createdComment = await this.commentModel.create({
      comment,
      commentBy,
      commentedOn,
    });

    // Find the corresponding post and update its comments array
    await this.postModel.findByIdAndUpdate(
      commentedOn,
      { $push: { comment: createdComment._id } },
      { new: true },
    );

    // Optionally, populate the commentBy field
    await createdComment.populate('commentBy', '-password');

    return res
      .status(201)
      .json({ message: 'Comment created successfully', data: createdComment });
  }

  async getComments(postid: string, res: Response) {
    const comments = await this.commentModel
      .find({ commentedOn: postid })
      .populate('commentBy', '-password');
    if (!comments) {
      return res.status(404).json({ message: 'Comments not found' });
    }
    return res.status(200).json({ message: 'Comments found', data: comments });
  }

  async updateComment(
    commentid: string,
    res: Response,
    updateMessage: UpdateMessageDto,
  ) {
    console.log(updateMessage);

    const updatedComment = await this.commentModel
      .findOneAndUpdate({ _id: commentid }, { ...updateMessage }, { new: true })
      .populate('commentBy', '-password')
      .populate('commentedOn');
    if (!updatedComment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    return res
      .status(200)
      .json({ message: 'Comment updated successfully', data: updatedComment });
  }

  async deleteComment(commentid: string, res: Response) {
    const deletedComment = await this.commentModel.findOneAndDelete({
      _id: commentid,
    });
    if (!deletedComment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    return res
      .status(200)
      .json({ message: 'Comment deleted successfully', data: deletedComment });
  }
}
