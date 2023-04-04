import { Entity } from 'typeorm';
import { EntityBasic } from './base.entity';

@Entity('conversations')
export class Conversations extends EntityBasic {}
