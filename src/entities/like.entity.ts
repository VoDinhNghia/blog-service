import { Entity } from 'typeorm';
import { EntityBasic } from './base.entity';

@Entity('likes')
export class Likes extends EntityBasic {}
