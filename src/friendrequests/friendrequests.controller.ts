import { Body, Controller, Patch, Post, Res } from '@nestjs/common';
import { FriendrequestsService } from './friendrequests.service';
import { SendFriendRequestDto } from './dto/friend-request.dto';
import { UpdateStatusDto } from './dto/update-status.dto';

@Controller('friendrequests')
export class FriendrequestsController {
  constructor(private readonly friendrequestsService: FriendrequestsService) {}

  @Post('sendrequest')
  sendRequest(@Res() res, @Body() sendFriendRequestDto: SendFriendRequestDto) {
    return this.friendrequestsService.sendRequest(res, sendFriendRequestDto);
  }

  @Patch('acceptrequest')
  acceptRequest(@Res() res, @Body() updateStatusDto: UpdateStatusDto) {
    return this.friendrequestsService.acceptRequest(res, updateStatusDto);
  }

  @Patch('declinerequest')
  declineRequest(@Res() res, @Body() updateStatusDto: UpdateStatusDto) {
    return this.friendrequestsService.declineRequest(res, updateStatusDto);
  }
}
