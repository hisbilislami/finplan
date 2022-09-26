import { IsOptional, ValidateNested } from 'class-validator';
import { UserDtoId } from 'src/user/dto/create-user.dto';

export class AttachUser {
  @IsOptional()
  @ValidateNested()
  created_by: UserDtoId;

  @IsOptional()
  @ValidateNested()
  updated_by: UserDtoId;
}
