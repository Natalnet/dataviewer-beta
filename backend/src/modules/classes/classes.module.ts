import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClassesController } from './classes.controller';
import { ClassesService } from './classes.service';
import { ClassSchema, TClass } from './schemas/class.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: TClass.name, schema: ClassSchema }]),
  ],
  controllers: [ClassesController],
  providers: [ClassesService], 
})
export class ClassesModule {}
