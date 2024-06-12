import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type DocumentDocument = HydratedDocument<DocumentSchemaClass>;

@Schema()
export class DocumentSchemaClass {
  @Prop()
  name: string;
}

export const DocumentSchema = SchemaFactory.createForClass(DocumentSchemaClass);
