import { Status } from '../status.enum';

export class UpdateStatusDto {
  requestId: string;
  status: Status;
}
