import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CommentModule } from './comment/comment.module'
import { IssueModule } from './issue/issue.module'
import { ProjectModule } from './project/project.module'
import { UserModule } from './user/user.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('DATABASE_URL'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
        retryAttempts: 3,
        ssl: {
          rejectUnauthorized: false,
        },
      }),
    }),
    UserModule,
    CommentModule,
    ProjectModule,
    IssueModule,
  ],
})
export class AppModule {}
