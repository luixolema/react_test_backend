import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractSchema } from '../comun/data/abstract.schema';

@Schema({ versionKey: false })
export class User extends AbstractSchema {
  @Prop({ unique: true, required: true })
  email: string;

  @Prop(Date)
  registerDate: Date;

  @Prop()
  favoriteBooks: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
