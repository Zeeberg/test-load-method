import {
  Controller,
  Param,
  Get,
  HttpStatus,
  HttpCode,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiParam } from '@nestjs/swagger';
import { DocumentSchemaClass } from './entities/document.schema';
import { DocumentsService } from './documents.service';

@ApiTags('Documents')
@Controller({
  path: 'documents',
})
export class DocumentsController {
  constructor(private readonly service: DocumentsService) {}

  @ApiOkResponse({
    type: DocumentSchemaClass,
  })
  @Get('search/:search')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'search',
    type: String,
    required: true,
  })
  async searchDocument(
    @Param('search') search: string,
    @Query('indexed') indexed: boolean,
  ): Promise<DocumentSchemaClass[]> {
    return this.service.searchDocument({ search, indexed });
  }
}
