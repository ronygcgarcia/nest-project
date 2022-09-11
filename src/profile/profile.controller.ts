import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Profile } from '../auth/entities/Profile.entity';
import { ProfileService } from './profile.service';

@ApiTags('Profile')
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @ApiResponse({
    status: 200,
    description: 'List of profiles.',
    type: Profile,
    isArray: true,
  })
  @UseGuards(JwtAuthGuard)
  @Get()
  async index(): Promise<Profile[]> {
    return await this.profileService.findAll();
  }
}
