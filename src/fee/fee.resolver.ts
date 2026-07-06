import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { FeeService } from './fee.service';
import { FeesStructure } from './database/fee.entity';
import { UseGuards } from '@nestjs/common';
import { AtGuard } from 'src/auth/guards/at.guard';
import PermissionGuard from 'src/auth/guards/permission.guard';
import { GetFeeEntity } from './entities/get-fee.entity';
import { ListsFeeEntity } from './entities/list-fees-entity';
import { ListFeesInput } from './dto/list-fees.input';
import { CurrentUser } from 'src/user/user.decorator';
import { User } from 'src/user/database/user.entity';

@UseGuards(AtGuard, PermissionGuard())
@Resolver(() => FeesStructure)
export class FeeResolver {
  constructor(private readonly feeService: FeeService) {}

  // 1.GetFees
  @Query(() => GetFeeEntity, {
    name: 'getFees',
    description: ' get the fees.',
  })
  async getSubject(@CurrentUser() user: User): Promise<GetFeeEntity> {
    return this.feeService.getFees(user);
  }

  //   2.ListFees
  @Query(() => ListsFeeEntity, {
    name: 'listFees',
    description: ' list the fees.',
  })
  async listSubject(
    @Args('list_fees_input') listFeesInput: ListFeesInput,
  ): Promise<ListsFeeEntity> {
    return this.feeService.listFees(listFeesInput);
  }
}
