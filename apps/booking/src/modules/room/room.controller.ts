import {
    Body,
    Controller,
    Get,
    InternalServerErrorException,
    Logger,
    NotFoundException,
    Param,
    Patch,
    Post,
    Query,
    Res,
} from '@nestjs/common';

import { ERoomSize, RoomReqDTO, toBoolean } from '@app/common';
import { RoomService } from './room.service';
import { Response } from 'express';

@Controller('room')
export class RoomController {
    private readonly _logger = new Logger(RoomController.name);
    constructor(
        private readonly roomService: RoomService,
    ) { }

    @Post('/create')
    async create(
        @Body() body: RoomReqDTO,
        @Res() response: Response
    ) {
        try {
            const res = await this.roomService.create(body);
            return response.status(res.status).send({
                ...res
            })
        } catch (error) {
            this._logger.log({
                error
            })
            throw new InternalServerErrorException('Fail to create room', error);
        }
    }

    @Get('/find/all')
    async findAll(
        @Res() response: Response,
        @Query('name') name?: string,
        @Query('size') size?: ERoomSize,
        @Query('premium') premium?: string,
    ) {
        try {
            const res = await this.roomService.findAll({
                name,
                size,
                isPremium: toBoolean(premium)
            });

            return response.status(res.status).send({
                ...res
            })
        } catch (error) {
            this._logger.error({
                error
            })
            throw new InternalServerErrorException('Failed to retrieve rooms', error);
        }
    }

    @Get('/:id')
    async findOne(
        @Param('id') id: string,
        @Res() response: Response
    ) {
        try {
            const res = await this.roomService.findOne(id);

            return response.status(res.status).send({
                ...res
            })
        } catch (error) {
            if (error.code === 'P2025') {
                throw new NotFoundException('This id doesn\'t exists in database');
            } else {
                this._logger.error({
                    error
                })
                throw new InternalServerErrorException(`Failed to find user with id ${id}`, error);
            }
        }
    }

    @Patch('/update/:id')
    async update(
        @Param('id') id: string,
        @Res() response: Response,
        @Body() body: RoomReqDTO
    ) {
        try {
            const res = await this.roomService.update(id, body);

            return response.status(res.status).send({
                ...res
            })
        } catch (error) {
            this._logger.error({
                error
            })
            throw new InternalServerErrorException(`Failed to update room id ${id}`, error);
        }
    }
}



