import { Injectable } from '@nestjs/common';
import { GetLinksArgs } from './dto/args/get-links-arg.dto';
import { getLinkPreview } from 'link-preview-js';

@Injectable()
export class LinksService {
  async getLinks(getLinksArgs: GetLinksArgs) {
    return Promise.all(
      getLinksArgs.urls.map(async (url) => {
        return getLinkPreview(url);
      }),
    );
  }
}
