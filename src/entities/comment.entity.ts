import { Entity } from 'typeorm';
import { EntityBasic } from './base.entity';

@Entity('comments')
export class Comments extends EntityBasic {}
