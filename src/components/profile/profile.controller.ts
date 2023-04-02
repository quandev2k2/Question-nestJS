import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
    UseGuards,
    Req,
    Put,
    UseInterceptors, UploadedFile, Res
  } from "@nestjs/common";
  import { ProfileService } from './profile.service';
  import { PaginationQuery, PaginationResponse } from "../../common/dtos";
  import { ApiBearerAuth, ApiConsumes, ApiTags } from "@nestjs/swagger";
  import { AdminGuard, UserSignedGuard } from "../../common/guards/user";
  import { RequestWithUser } from "../../common/interfaces";
  import { FileInterceptor } from "@nestjs/platform-express";
  import { uploadImage } from "../../common/validatorContraints/imageStorage";
  import { validateImage } from "../../common/validatorContraints/validateImage";

@ApiTags('profile')
@Controller('api/profile')
export class ProfileController {
    constructor(private readonly profileService: ProfileService) { }
}
