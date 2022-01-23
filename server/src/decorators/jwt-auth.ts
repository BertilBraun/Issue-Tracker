import { applyDecorators, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiBearerAuth } from '@nestjs/swagger'

export const JwtAuth = (type?: 'full' | 'admin') => {
  switch (type) {
    case undefined:
      return applyDecorators(UseGuards(AuthGuard()), ApiBearerAuth())
    case 'full':
      return applyDecorators(UseGuards(AuthGuard('full')), ApiBearerAuth())
    case 'admin':
      return applyDecorators(UseGuards(AuthGuard('admin')), ApiBearerAuth())
  }
}
