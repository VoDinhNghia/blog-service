import { query } from 'express-validator';
import { EqueryFollowType } from '../constants/constant';
export const QueryPagination = [
  query('limit').optional().isNumeric().withMessage('postId should be number'),
  query('page').optional().isNumeric().withMessage('page should be number'),
  query('searchKey')
    .optional()
    .isString()
    .withMessage('searchKey should be number'),
];

export const QueryUser = [...QueryPagination];

export const QueryPost = [
  ...QueryPagination,
  query('userId').optional().isString().withMessage('userId should be string'),
];

export const QuerySharePost = [...QueryPagination];

export const QueryFollow = [
  ...QueryPagination,
  query('type')
    .exists()
    .withMessage('type is required')
    .isIn(Object.values(EqueryFollowType))
    .withMessage(`type should be one of [${Object.values(EqueryFollowType)}]`),
];

export const QueryGroup = [
  ...QueryPagination,
  query('createdById')
    .optional()
    .isString()
    .withMessage('createdById should be string'),
];

export const QueryMessage = [
  ...QueryPagination,
  query('conversationId')
    .optional()
    .isString()
    .withMessage('conversationId should be string'),
];

export const QueryMessageByConver = [
  ...QueryPagination,
  query('chatWithId')
    .exists()
    .withMessage('chatWithId is required')
    .isString()
    .withMessage('chatWithId should be string'),
];
