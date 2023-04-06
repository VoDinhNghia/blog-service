import { query } from 'express-validator';
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
