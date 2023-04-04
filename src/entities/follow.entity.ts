import { Entity } from 'typeorm';
import { EntityBasic } from './base.entity';

@Entity('follows')
export class Follows extends EntityBasic {}
