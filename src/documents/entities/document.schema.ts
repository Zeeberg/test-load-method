import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiResponseProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';

export type DocumentDocument = HydratedDocument<DocumentSchemaClass>;

@Schema()
export class DocumentSchemaClass {
  @ApiResponseProperty({
    type: String,
  })
  @Prop()
  name: string;

  @ApiResponseProperty({
    type: String,
  })
  @Prop({ index: true })
  name_indexed: string;
}

export const DocumentSchema = SchemaFactory.createForClass(DocumentSchemaClass);
