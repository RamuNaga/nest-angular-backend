import { Args, Query, Resolver } from '@nestjs/graphql';
import { Link } from './link.model';
import { LinksService } from './links.service';
import { GetLinksArgs } from './dto/args/get-links-arg.dto';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';

@Resolver(() => Link)
export class LinksResolver {
  constructor(private readonly linksService: LinksService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [Link], { name: 'links' })
  async getLinks(@Args() getLinksArgs: GetLinksArgs) {
    return this.linksService.getLinks(getLinksArgs);
  }
}
