import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ProfilePic } from './schema/profilepic.schema';
import mongoose from 'mongoose';
import { User } from 'src/users/schema/user.schema';
import { CreateProfilePicDto } from './dto/create-profilepic.dto';
import { updateProfilePicDto } from './dto/update-profilepic.dto';
import * as multer from 'multer';
const storage = multer.memoryStorage();
const upload = multer({ storage });

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
    const profilePic2 = await this.profilePicModel.create({
      imagePath: file.path,
      imageName: createProfilePic.imageName,
      user: user._id,
    });

    await this.userModel.findByIdAndUpdate(
      createProfilePic.user,
      { $push: { profilePic: profilePic2._id } },
      { new: true },
    );

    // Optionally, populate the commentBy field
    await profilePic2.populate('user');
    return res.status(201).json({
      message: 'Profile picture uploaded successfully',
      data: profilePic2,
    });
  }

  async updateProfilePic(
    updateProfilePic: updateProfilePicDto,
    res,
    req,
    id: string,
  ) {
    upload.single('imagePath')(req, res, async (err: any) => {
      if (err) {
        return res
          .status(400)
          .json({ message: 'File upload error', error: err });
      }

      const updateProfilePic: updateProfilePicDto = req.body;
      const file = req.file;

      if (file) {
        const imageUrl = `./uploads/${file.originalname}`;
        updateProfilePic.imagePath = imageUrl;
      }
      const profilePic = await this.profilePicModel.findOneAndUpdate(
        { _id: id },
        { $set: updateProfilePic },
        { new: true },
      );
      return res.status(200).json({
        message: 'Profile picture updated successfully',
        data: profilePic,
      });
    });
  }

  async getProfilePic(res, id: string) {
    const profilePic = await this.profilePicModel
      .findById(id)
      .populate('user', '-password -profilePic');
    if (!profilePic) {
      return res.status(404).json({ message: 'Profile picture not found' });
    }
    return res.status(200).json({ data: profilePic });
  }

  async deleteProfilePic(res, id: string) {
    const profilePic = await this.profilePicModel.findByIdAndDelete(id);
    if (!profilePic) {
      return res.status(404).json({ message: 'Profile picture not found' });
    }
    return res.status(200).json({ message: 'Profile picture deleted' });
  }
}
