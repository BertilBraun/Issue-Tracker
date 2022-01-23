import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common'
import { JwtAuth } from 'src/decorators/jwt-auth'
import { UserCreateDto } from 'src/dtos'
import { User } from './user.entity'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  @JwtAuth()
  findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(id)
  }

  @Delete(':id')
  @JwtAuth()
  remove(@Param('id') id: string): Promise<void> {
    return this.userService.remove(id)
  }

  @Post()
  @JwtAuth()
  save(@Body() user: UserCreateDto): Promise<User> {
    return this.userService.save(user.email, user.name, user.passwordHash)
  }
}
