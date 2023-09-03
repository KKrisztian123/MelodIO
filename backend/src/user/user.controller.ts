import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  Req,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AdminAuthGuard, AuthGuard } from 'src/auth/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request as RequestType } from 'express';
import {
  checkEmpty,
  createFilePath,
  errorResponse,
  getFileAsBase64,
  imageTypes,
  successResponse,
} from 'src/utils/utils';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('new')
  @UseGuards(AdminAuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  async newUser(
    @Body() body,
    @UploadedFile() file,
  ): Promise<APIResponse<object>> {
    const fileData = body.image ?? file;
    if (!checkEmpty(body)) return errorResponse('Üres mezők!');

    const { imageUrl, fileType } =
      fileData === 'false'
        ? { imageUrl: '', fileType: '' }
        : this.userService.uploadUserImage(file);

    const userResult = await this.userService.createUser({
      name: body.name,
      email: body.email,
      password: body.password,
      passwordRepeat: body.passwordRepeat,
      imageUrl,
      fileType,
    });

    return userResult === true
      ? successResponse({})
      : errorResponse(userResult);
  }

  @Get(':userId')
  @UseGuards(AuthGuard)
  async getUserInfo(
    @Headers() header,
    @Param('userId') userId: string,
    @Req() req: RequestType,
  ) {
    const currentUser = await this.userService.getCurrentUser(
      header.authorization,
    );

    if (typeof currentUser === 'string') return errorResponse(currentUser);
    if (!(currentUser.isAdmin || currentUser.userId == userId))
      return errorResponse('Nincs jogosultságod a műveletre!');

    const userInfo = await this.userService.getUserById(userId);
    if (typeof userInfo === 'string') return errorResponse(userInfo);
    const hasImage = userInfo.imageURL !== '' && userInfo.imageType !== '';
    const mimeType =
      hasImage &&
      Object.keys(imageTypes).find(
        (key) => imageTypes[key] === userInfo.imageType,
      );

    return successResponse({
      image: hasImage
        ? await getFileAsBase64(
            createFilePath(
              'uploads',
              'images',
              'profile',
              `${userInfo.imageURL}.${userInfo.imageType}`,
            ),
            mimeType,
          )
        : false,
      name: `${userInfo.firstName} ${userInfo.lastName}`,
      email: userInfo.email,
      lastUpdate: userInfo.lastUpdate,
    });
  }

  @Post(':userId')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  async updateUserInfo(
    @Headers() header,
    @Param('userId') userId: string,
    @Body() body,
    @UploadedFile() file,
  ) {
    const currentUser = await this.userService.getCurrentUser(
      header.authorization,
    );

    if (typeof currentUser === 'string') return errorResponse(currentUser);
    if (!(currentUser.isAdmin || currentUser.userId == userId))
      return errorResponse('Nincs jogosultságod a műveletre!');

    const userData = await this.userService.getUserById(userId);

    const fileData = body.image ?? file;
    if (!checkEmpty(body)) return errorResponse('Üres mezők!');

    const { imageUrl, fileType } =
      typeof fileData === 'string'
        ? fileData === 'false'
          ? { imageUrl: '', fileType: '' }
          : { imageUrl: userData.imageURL, fileType: userData.imageType }
        : this.userService.uploadUserImage(file);

    if (typeof userData === 'string') return errorResponse(userData);
    if (
      userData.imageURL !== '' &&
      userData.fileType !== '' &&
      typeof fileData !== 'string'
    )
      this.userService.deleteUserImage(userData.imageURL, userData.imageType);
    if (
      userData.imageURL !== '' &&
      userData.fileType !== '' &&
      fileData === 'false'
    )
      this.userService.deleteUserImage(userData.imageURL, userData.imageType);
    const updateInfo = await this.userService.updateUser(
      {
        name: body.name,
        email: body.email,
        imageUrl,
        fileType,
      },
      userId,
    );
    if (typeof updateInfo === 'string') return errorResponse(updateInfo);
    const hasImage = updateInfo.imageURL !== '' && updateInfo.imageType !== '';
    return successResponse({
      image: hasImage
        ? typeof fileData === 'string'
          ? await getFileAsBase64(
              createFilePath(
                'uploads',
                'images',
                'profile',
                `${imageUrl}.${fileType}`,
              ),
              Object.keys(imageTypes).find(
                (key) => imageTypes[key] === fileType,
              ),
            )
          : `data:${file.mimetype};base64,${file.buffer.toString('base64')}`
        : false,
      name: updateInfo.name,
      email: updateInfo.email,
      lastUpdate: updateInfo.lastUpdate,
    });
  }

  @Post(':userId/password')
  @UseGuards(AuthGuard)
  async updateUserPassword(
    @Headers() header,
    @Param('userId') userId: string,
    @Request() req,
  ) {
    const currentUser = await this.userService.getCurrentUser(
      header.authorization,
    );
    if (typeof currentUser === 'string') return errorResponse(currentUser);
    if (currentUser.userId != userId)
      return errorResponse('Nincs jogosultságod a műveletre!');

    const passwordResult = await this.userService.changeUserPassword(userId, {
      password: req.body.password,
      newPassword: req.body.newPassword,
      newPasswordRepeat: req.body.newPasswordRepeat,
    });
    return typeof passwordResult === 'string'
      ? errorResponse(passwordResult)
      : successResponse({});
  }
}
