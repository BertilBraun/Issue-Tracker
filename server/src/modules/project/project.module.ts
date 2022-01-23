import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserService } from 'src/modules/user/user.service'
import { ProjectController } from './project.controller'
import { Project } from './project.entity'
import { ProjectService } from './project.service'

@Module({
  imports: [TypeOrmModule.forFeature([Project]), UserService],
  providers: [ProjectService],
  controllers: [ProjectController],
  exports: [ProjectService],
})
export class ProjectModule {}
