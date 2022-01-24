import { Controller, Delete, Get, Param } from '@nestjs/common'
import { JwtAuth } from 'src/decorators/jwt-auth'
import { UserDto } from 'src/dtos/user/user.dto'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  @JwtAuth()
  findOne(@Param('id') id: string): Promise<UserDto> {
    return this.userService.findOne(id)
  }

  @Delete(':id')
  @JwtAuth()
  remove(@Param('id') id: string): Promise<void> {
    return this.userService.remove(id)
  }
}
