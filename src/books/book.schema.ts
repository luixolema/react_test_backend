import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractSchema } from '../comun/data/abstract.schema';

@Schema({ versionKey: false })
export class Book extends AbstractSchema {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  author: string;

  @Prop({ required: true })
  description: string;

  @Prop(Date)
  publishDate: Date;
}

export const BookSchema = SchemaFactory.createForClass(Book);
