import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from './prisma.service';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

jest.mock('@prisma/client', () => {
    return {
        PrismaClient: jest.fn().mockImplementation(() => {
            return {
                $connect: jest.fn(),
                $disconnect: jest.fn(),
            };
        }),
    };
});

describe('PrismaService', () => {
    let prismaService: PrismaService;
    let configService: ConfigService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PrismaService,
                {
                    provide: ConfigService,
                    useValue: {
                        get: jest.fn().mockReturnValue('mongodb://localhost:27017/meetingBooking'),
                    },
                },
            ],
        }).compile();

        prismaService = module.get<PrismaService>(PrismaService);
        configService = module.get<ConfigService>(ConfigService);
    });

    it('should be defined', () => {
        expect(prismaService).toBeDefined();
    });

    it('should initialize PrismaClient with the correct MongoDB URI', () => {
        const prismaClientInstance = (PrismaClient as jest.Mock).mock.instances[0];
        expect(prismaClientInstance).toBeDefined();
        expect(configService.get).toHaveBeenCalledWith('MONGODB_URI');
        expect(prismaClientInstance).toHaveProperty('datasources.db.url', 'mongodb://localhost:27017/meetingBooking');
    });

    it('should connect and disconnect the Prisma client', async () => {
        const connectSpy = jest.spyOn(prismaService, '$connect');
        const disconnectSpy = jest.spyOn(prismaService, '$disconnect');

        await prismaService.$connect();
        await prismaService.$disconnect();

        expect(connectSpy).toHaveBeenCalled();
        expect(disconnectSpy).toHaveBeenCalled();
    });
});
