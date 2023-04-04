import { Entity } from 'typeorm';
import { EntityBasic } from './base.entity';

@Entity('messages')
export class Messages extends EntityBasic {}
