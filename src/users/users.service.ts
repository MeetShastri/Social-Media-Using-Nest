import { Injectable } from '@nestjs/common';
import { User } from './schema/user.schema';
import mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { CreateUserDto } from './dto/create-user.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { OtpService } from 'src/otp/otp.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
    private otpService: OtpService,
  ) {}

  async createUser(createUser: CreateUserDto, res) {
    const user = await this.userModel.findOne({ email: createUser.email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(createUser.password, 10);
    console.log(hashedPassword);
    const newUser = await this.userModel.create({
      firstName: createUser.firstName,
      lastName: createUser.lastName,
      email: createUser.email,
      password: hashedPassword,
    });
    return res
      .status(201)
      .json({ message: 'User created successfully', data: newUser });
  }

  async loginUser(loginUser: LoginUserDto, res) {
    const user = await this.userModel.findOne({ email: loginUser.email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const isPasswordValid = await bcrypt.compare(
      loginUser.password,
      user.password,
    );
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }
    const otp = await this.otpService.sendOtp(user.email);
    console.log(otp);

    const tokenObject = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };
    const token = await jwt.sign(
      {
        tokenObject,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '1d',
      },
    );
    return res.status(200).json({
      message: 'Login successful',
      tokenObject: tokenObject,
      token: token,
      otp: otp,
    });
  }

  async getUser(id: string, res) {
    const user = await this.userModel.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json({ message: 'User found', data: user });
  }

  async resetPassword(resetPassword: ResetPasswordDto, res) {
    const user = await this.userModel.findOne({ email: resetPassword.email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const isPasswordValid = await bcrypt.compare(
      resetPassword.oldPassword,
      user.password,
    );
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }
    const hashedPassword = await bcrypt.hash(resetPassword.newPassword, 10);
    user.password = hashedPassword;
    const updatedUser = await this.userModel.findByIdAndUpdate(
      user._id,
      { password: hashedPassword },
      { new: true },
    );
    return res
      .status(200)
      .json({ message: 'Password reset successful', data: updatedUser });
  }

  async searchUsers(q: string, res) {
    const users = await this.userModel.find({
      $or: [{ firstName: { $regex: q, $options: 'i' } }],
    });
    return res.status(200).json({ message: 'Users found', data: users });
  }
}
