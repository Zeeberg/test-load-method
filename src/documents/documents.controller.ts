import {
  Controller,
  Get,
  HttpStatus,
  HttpCode,
  Query,
  ParseBoolPipe,
} from '@nestjs/common';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
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
  @Get('search')
  @HttpCode(HttpStatus.OK)
  async searchDocument(
    @Query('search') search: string,
    @Query('indexed', ParseBoolPipe) indexed: boolean,
  ): Promise<DocumentSchemaClass[]> {
    return this.service.searchDocument({ search, indexed });
  }
}
