// src/otp/otp.service.ts
import { Injectable } from '@nestjs/common';
import * as otpGenerator from 'otp-generator';
import { EmailService } from '../email/email.service';

@Injectable()
export class OtpService {
  constructor(private readonly emailService: EmailService) {}

  generateOtp() {
    return otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
    });
  }

  async sendOtp(email: string) {
    const otp = this.generateOtp();
    const subject = 'Your OTP Code';
    const text = `Your OTP code is ${otp}`;

    await this.emailService.sendMail(email, subject, text);
    return otp;
  }
}
