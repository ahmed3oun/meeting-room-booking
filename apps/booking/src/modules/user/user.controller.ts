import { Body, Controller, Get, InternalServerErrorException, Logger, NotFoundException, Patch, Post, Res, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { SigninReqDTO, SignupReqDTO, UserReqDTO } from '@app/common/dto/requests.dto';
import { IUser, OmitUser, SigninResDTO, SignupResDTO, UserResDTO } from '@app/common';
import { Response } from 'express';
import { AuthGuard } from '@app/booking/guards/auth.guard';
import { GetUser } from '@app/booking/decorators';

@Controller('user')
export class UserController {
    private readonly _logger = new Logger(UserController.name);
    constructor(
        private readonly userService: UserService,
    ) { }

    @Post('/signin')
    async signIn(
        @Body() body: SigninReqDTO,
        @Res() response: Response
    ): Promise<Response<SigninResDTO>> {
        try {
            const res: SigninResDTO = await this.userService.signIn(body);

            return response.status(res.status).send({
                ...res
            })
        } catch (error) {
            if (error.code === 'P2025') {
                throw new NotFoundException('This email address doesn\'t exists in database');
            } else {
                this._logger.error({
                    error
                })
                throw new InternalServerErrorException('Failed to signin', error);
            }
        }
    }

    @Post('/signup')
    async signUp(
        @Body() body: SignupReqDTO,
        @Res() response: Response
    ): Promise<Response<SignupResDTO>> {
        try {
            const res = await this.userService.signUp(body);

            return response.status(res.status).send({
                ...res
            })
        } catch (error) {
            this._logger.error({
                error
            })
            throw new InternalServerErrorException('Failed to signup', error);
        }
    }

    @UseGuards(AuthGuard)
    @Patch('/update/me')
    async update(
        @Body() body: UserReqDTO,
        @GetUser() currentUser: OmitUser,
        @Res() response: Response
    ): Promise<Response<SignupResDTO>> {
        try {
            const res = await this.userService.update(currentUser.id, body);

            return response.status(res.status).send({
                ...res
            })
        } catch (error) {
            this._logger.error({
                error
            })
            throw new InternalServerErrorException('Failed to update user', error);
        }
    }

    @UseGuards(AuthGuard)
    @Get('/find/me')
    async findMe(
        @Res() response: Response,
        @GetUser() currentUser: Omit<IUser, 'password' | 'createdAt' | 'updatedAt'>
    ) {
        try {
            const res: UserResDTO = {
                user: currentUser,
                message: 'Fetched successfully!',
                status: 200
            }
            return response.status(res.status).send({
                ...res
            })
        } catch (error) {
            this._logger.error({
                error
            })
            throw new InternalServerErrorException(`Failed to find user`, error);
        }
    }

    @UseGuards(AuthGuard)
    @Get('/find/all')
    async find(
        @Res() response: Response
    ) {
        try {
            const res = await this.userService.findAll();

            return response.status(res.status).send({
                ...res
            })
        } catch (error) {
            this._logger.error({
                error
            })
            throw new InternalServerErrorException('Failed to retrieve users', error);
        }
    }
}
