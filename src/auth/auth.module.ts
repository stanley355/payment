import { Module } from '@nestjs/common';
import { JwtGuard } from './jwt.guard';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [],
  providers: [JwtStrategy, JwtGuard],
  exports: [],
})
export class AuthModule {}
