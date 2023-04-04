import { Entity } from 'typeorm';
import { EntityBasic } from './base.entity';

@Entity('attachments')
export class Attachments extends EntityBasic {}
