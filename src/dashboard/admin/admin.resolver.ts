import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { AtGuard } from 'src/auth/guards/at.guard';
import PermissionGuard from 'src/auth/guards/permission.guard';
import { AdminDashboardService } from './admin.service';
import { AdminTotalCountEntity } from '../entities/admin/admin-total-count.entity';

@UseGuards(AtGuard, PermissionGuard())
@Resolver()
export class AdminDashboardResolver {
  constructor(private readonly adminDashbaordService: AdminDashboardService) {}

  @Query(() => AdminTotalCountEntity, {
    name: 'adminDashboardCount',
    description: 'Admin count active student',
  })
  async adminDashboardCount() {
    return this.adminDashbaordService.adminDashboardCount();
  }
}
