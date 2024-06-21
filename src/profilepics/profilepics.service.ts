import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ProfilePic } from './schema/profilepic.schema';
import mongoose from 'mongoose';
import { User } from 'src/users/schema/user.schema';
import { CreateProfilePicDto } from './dto/create-profilepic.dto';

@Injectable()
export class ProfilepicsService {
  constructor(
    @InjectModel(ProfilePic.name)
    private profilePicModel: mongoose.Model<ProfilePic>,
    @InjectModel(User.name) private userModel: mongoose.Model<User>,
  ) {}

  async uploadProfilePic(
    createProfilePic: CreateProfilePicDto,
    res,
    file: Express.Multer.File,
  ) {
    createProfilePic.imagePath = file ? file.path : null;
    const user = await this.userModel.findById(createProfilePic.user);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const profilePic = await this.profilePicModel.create({
      imagePath: file.path,
      imageName: file.filename,
      user: user._id,
    });
    return res.status(201).json({
      message: 'Profile picture uploaded successfully',
      data: profilePic,
    });
  }
}
