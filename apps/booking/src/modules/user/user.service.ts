import { PrismaService } from '@app/booking/prisma/prisma.service';
import {
    SigninReqDTO, SignupReqDTO,
    UserReqDTO,
    SigninResDTO, SignupResDTO,
    UsersResDTO, UserResDTO,
    IUser
} from '@app/common';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';

@Injectable()
export class UserService {
    private readonly logger = new Logger(UserService.name)
    constructor(
        private readonly prismaService: PrismaService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) { }

    async signIn(body: SigninReqDTO): Promise<SigninResDTO> {
        const current_user = await this.prismaService.user.findUniqueOrThrow({
            where: {
                email: body.login
            }
        }) as IUser;
        const pwd_matches = await argon.verify(current_user.password, body.password);
        if (!pwd_matches) {
            throw new BadRequestException('Bad Credentials');
        }

        delete current_user.password;

        const payload = {
            id: current_user.id,
            name: current_user.name,
            email: current_user.email,
        };

        const token = await this.jwtService.signAsync(payload, {
            expiresIn: this.configService.get<string>('JWT_EXPIRY'),
            secret: this.configService.get<string>('JWT_SECRET')
        });

        return {
            user: current_user,
            token,
            message: "Logged in successfully!",
            status: 200
        }
    }

    async signUp(body: SignupReqDTO): Promise<SignupResDTO> {
        this.logger.debug('singup body',body)
        const hashPassword = await argon.hash(body.password)
        const existed_user = await this.prismaService.user.findUnique({
            where: {
                email: body.email
            }
        }) as (IUser | null | undefined)
        this.logger.debug('existed user',existed_user)

        if (existed_user) {
            throw new BadRequestException(`This email ${body.email} is already existed`);
        }

        this.logger.debug('data body',{
            email: body.email,
            password: hashPassword,
            name: body.name,
            membership: body.membership,
        })

        const saved_user = await this.prismaService.user.create({
            data: {
                email: body.email,
                password: hashPassword,
                name: body.name,
                membership: body.membership,
            }
        });
        this.logger.debug('saved user',saved_user)
        delete saved_user.password;

        this.logger.debug('saved user after delete password',saved_user)

        return {
            user: saved_user,
            // user: {} as IUser,
            message: "Registered successfully!",
            status: 201
        }
    }

    async findAll(): Promise<UsersResDTO> {
        let users = await this.prismaService.user.findMany() as IUser[];
        users = users.map(current_user => {
            delete current_user.password;
            return current_user;
        })

        return {
            users,
            status: 200,
            message: `Fetched succesfully!`
        }
    }

    async findOne(id: string): Promise<UserResDTO> {
        const current_user = await this.prismaService.user.findUniqueOrThrow({
            where: {
                id
            }
        }) as IUser;
        return {
            user: current_user,
            status: 200,
            message: 'Fetched successfully!'
        };
    }

    async update(id: string, updateDto: UserReqDTO): Promise<UserResDTO> {
        const updated_user = await this.prismaService.user.update({
            where: {
                id
            },
            data: {
                name: updateDto.name,
                membership: updateDto.membership,
                password: updateDto.password
            }
        }) as IUser;

        return {
            status: 200,
            message: `User ID ${id} updated successfully!`,
            user: updated_user
        };
    }

    /* remove(id: number) {
        return `This action removes a #id `;
    } */
}

