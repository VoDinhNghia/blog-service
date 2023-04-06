import { Column, Entity } from 'typeorm';
import { EntityBasic } from './base.entity';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

@Entity('labels')
export class Labels extends EntityBasic {
  @IsString()
  @IsNotEmpty()
  @Column()
  name?: string;

  @IsNumber()
  @Type(() => Number)
  condition?: number;

  @IsBoolean()
  @Column()
  type?: string; // POST, SOLUTION, ...
}
