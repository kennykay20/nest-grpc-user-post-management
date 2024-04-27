import { Module } from '@nestjs/common';
import { PostModule } from './post/post.module';
import { InteractionModule } from './interaction/interaction.module';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule, PostModule, InteractionModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
