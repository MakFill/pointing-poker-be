import { BadRequest, NotFound } from '@/error';
import { messageService } from '@/services';
import {NextFunction, Request, Response} from 'express';


class MessageController {
  async getAllMessages(req: Request, res: Response, next: NextFunction) {
    try {
      const { roomId } = req.query;
      if (!roomId) {
        return next(new NotFound('Not found room id'));
      }

      const messages = await messageService.getMessagesByRoomId(roomId as string);

      res.json(messages);
    } catch {
      return next(new BadRequest('Wrong room'));
    }
  }
};

export const messageController = new MessageController();