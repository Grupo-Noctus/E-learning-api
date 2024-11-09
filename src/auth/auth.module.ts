import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { CursoModule } from 'src/curso/curso.module';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { jwtContants } from './constants';

@Module({
  imports: [
    UserModule,
    CursoModule,
    JwtModule.register({
      global: true,
      secret: jwtContants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports:[AuthService],
})
export class AuthModule {}
