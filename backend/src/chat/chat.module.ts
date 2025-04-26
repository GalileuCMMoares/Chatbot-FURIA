import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { PandaScoreService } from '../pandascore/pandascore.service';

@Module({
  controllers: [ChatController],
  providers: [ChatService, PandaScoreService],
})
export class ChatModule {}