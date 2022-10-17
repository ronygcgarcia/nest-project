import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Profile } from '../auth/entities/profile.entity';
import { ProfileService } from './profile.service';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Permission } from '../auth/decorators/Permission.decorator';
import { PermissionGuard } from '../auth/guards/permissions.guard';

@ApiTags('Profile')
@Controller('profile')
@UseGuards(RolesGuard)
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @ApiResponse({
    status: 200,
    description: 'List of profiles.',
    type: Profile,
    isArray: true,
  })
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permission('PROFILE_LIST')
  @Get()
  async index(): Promise<Profile[]> {
    return await this.profileService.findAll();
  }
}
