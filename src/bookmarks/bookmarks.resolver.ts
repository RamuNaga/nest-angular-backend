import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { CreateBookmarkInput } from './dto/input/create-bookmark-input.dto';
import { BookmarksService } from './bookmarks.service';
import { User } from '../users/models/user.model';
import { Bookmark } from './models/bookmark.model';
import { UpdateBookmarkInput } from './dto/input/update-bookmark-input.dto';
import { CurrentUser } from '../auth/current-user.decorator';
import { GetBookmarkArgs } from './dto/args/get-bookmark-args.dto';

@Resolver(() => Bookmark)
export class BookmarksResolver {
  constructor(private readonly bookmarksService: BookmarksService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Bookmark)
  async createBookmark(
    @Args('createBookmarkData') createBookmarkData: CreateBookmarkInput,
    @CurrentUser() user: User,
  ) {
    return this.bookmarksService.createBookmark(createBookmarkData, user._id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Bookmark)
  async updateBookmark(
    @Args('updateBookmarkData') updateBookmarkData: UpdateBookmarkInput,
    @CurrentUser() user: User,
  ) {
    return this.bookmarksService.updateBookmark(updateBookmarkData, user._id);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Bookmark], { name: 'bookmarks' })
  async getBookmarks(@CurrentUser() user: User) {
    return this.bookmarksService.getBookmarks(user._id);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => Bookmark, { name: 'bookmark' })
  async getBookmark(
    @Args() getBookmarkArgs: GetBookmarkArgs,
    @CurrentUser() user: User,
  ) {
    return this.bookmarksService.getBookmark(getBookmarkArgs, user._id);
  }
}
