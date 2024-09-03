import { Test, TestingModule } from '@nestjs/testing';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { RoomService } from '../room/room.service';
import { AuthGuard } from '@app/booking/guards/auth.guard';
import { BookingReqDTO, IUser, OmitUser } from '@app/common';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Response } from 'express';
import { mock } from 'jest-mock-extended';

describe('BookingController', () => {
  let controller: BookingController;
  let bookingService: jest.Mocked<BookingService>;
  let roomService: jest.Mocked<RoomService>;
  let response: jest.Mocked<Response>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookingController],
      providers: [
        {
          provide: BookingService,
          useValue: mock<BookingService>(),
        },
        {
          provide: RoomService,
          useValue: mock<RoomService>(),
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue(mock<AuthGuard>())
      .compile();

    controller = module.get<BookingController>(BookingController);
    bookingService = mock<BookingService>(module.get<BookingService>(BookingService));
    roomService = mock<RoomService>(module.get<RoomService>(RoomService));
    response = mock<Response>();
  });

  describe('create', () => {
    it('should create a booking successfully', async () => {
      const mockBookingReqDTO: BookingReqDTO = {
        userId: 'user123',
        roomId: 'roomId',
        startTime: new Date(),
        endTime: new Date(),
        confirmed: true,
        guestsEmails: ['guest1@test.com', 'guest2@test.com', 'guest3@test.com']
      };
      /* 
      const mockUser: Omit<IUser, 'password' | 'createdAt' | 'updatedAt'> = {
        id: 'user123',
        membership: 'PREMIUM',
      };

      roomService.findOne.mockResolvedValue({
        room: { id: 'roomId', premium: false },
      } as any);

      roomService.isRoomAvailable.mockReturnValue(true);

      bookingService.create.mockResolvedValue({
        status: 201,
        booking: { id: 'booking123' },
      } as any);

      */
      const mockUser: OmitUser = {
        id: 'user123',
        membership: 'PREMIUM',
        email: 'testUser@test.com',
        name: 'testUser'
      };

      roomService.findOne.mockResolvedValue({
        room: { id: 'roomId', premium: false },
      } as any);

      roomService.isRoomAvailable.mockReturnValue(true);

      bookingService.create({
        status: 201,
        booking: { id: 'booking123' },
      } as any);

      await controller.create(mockBookingReqDTO, response, mockUser);

      expect(response.status).toHaveBeenCalledWith(201);
      expect(response.send).toHaveBeenCalledWith({
        status: 201,
        booking: { id: 'booking123' },
      });
    });

    it('should throw UnauthorizedException if the room is not available', async () => {
      const mockBookingReqDTO: BookingReqDTO = {
        userId: '123',
        roomId: 'roomId',
        startTime: new Date(),
        endTime: new Date(),
        confirmed: true,
        guestsEmails: ['guest1@test.com', 'guest2@test.com', 'guest3@test.com']
      };
      const mockUser: Omit<IUser, 'password' | 'createdAt' | 'updatedAt'> = {
        id: 'user123',
        membership: 'PREMIUM',
        email: 'testUser@test.com',
        name: 'testUser'
      };

      roomService.findOne(mockBookingReqDTO.roomId);

      roomService.isRoomAvailable.mockReturnValue(false);

      await expect(controller.create(mockBookingReqDTO, response, mockUser)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });

  describe('findOne', () => {
    it('should return a booking successfully', async () => {
      const mockUser: Omit<IUser, 'password' | 'createdAt' | 'updatedAt'> = {
        id: 'user123',
        membership: 'PREMIUM',
        email: 'testUser@test.com',
        name: 'testUser'
      };

      bookingService.findOne.mockResolvedValue({
        status: 200,
        booking: { id: 'booking123', userId: 'user123' },
      } as any);

      await controller.findOne('booking123', response, mockUser);

      expect(response.status).toHaveBeenCalledWith(200);
      expect(response.send).toHaveBeenCalledWith({
        status: 200,
        booking: { id: 'booking123', userId: 'user123' },
      });
    });

    it('should throw UnauthorizedException if the user is not the owner of the booking', async () => {
      const mockUser: Omit<IUser, 'password' | 'createdAt' | 'updatedAt'> = {
        id: 'user123',
        membership: 'PREMIUM',
        email: 'testUser@test.com',
        name: 'testUser'
      };

      bookingService.findOne.mockResolvedValue({
        status: 200,
        booking: { id: 'booking123', userId: 'otherUser' },
      } as any);

      await expect(controller.findOne('booking123', response, mockUser)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should throw NotFoundException if the booking is not found', async () => {
      const mockUser: Omit<IUser, 'password' | 'createdAt' | 'updatedAt'> = {
        id: 'user123',
        membership: 'PREMIUM',
        email: 'testUser@test.com',
        name: 'testUser'
      };

      bookingService.findOne.mockRejectedValue({ code: 'P2025' });

      await expect(controller.findOne('booking123', response, mockUser)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('findAll', () => {
    it('should return all bookings for the user', async () => {
      const mockUser: Omit<IUser, 'password' | 'createdAt' | 'updatedAt'> = {
        id: 'user123',
        membership: 'PREMIUM',
        email: 'testUser@test.com',
        name: 'testUser'
      };

      bookingService.findAll.mockResolvedValue({
        status: 200,
        bookings: [],
      } as any);

      await controller.findAll(response, mockUser, 'true', 'roomId', '2024-01-01T00:00:00Z', '2024-01-01T01:00:00Z');

      expect(response.status).toHaveBeenCalledWith(200);
      expect(response.send).toHaveBeenCalledWith({
        status: 200,
        bookings: [],
      });
    });
  });
});
