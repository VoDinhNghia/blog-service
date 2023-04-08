import { body } from 'express-validator';
import { ElikeType } from '../constants/constant';

export const BodyLogin = [
  body('email')
    .exists()
    .withMessage('email is required')
    .isEmail()
    .withMessage('email should be format such as test@gmail.com'),
  body('password')
    .exists()
    .withMessage('password is required')
    .isString()
    .withMessage('password should be string'),
];

export const BodyLike = [
  body('type')
    .isIn(Object.values(ElikeType))
    .withMessage(`type should be one of [${Object.values(ElikeType)}]`),
  body('postId').optional().isString().withMessage('postId should be string'),
  body('shareId').optional().isString().withMessage('shareId should be string'),
];

export const BodyPost = [
  body('type')
    .exists()
    .withMessage('password is required')
    .isString()
    .withMessage('password should be string'),
  body('content')
    .exists()
    .withMessage('content is required')
    .isString()
    .withMessage('content should be string'),
  body('title')
    .exists()
    .withMessage('title is required')
    .isString()
    .withMessage('title should be string'),
  body('privateMode')
    .exists()
    .withMessage('privateMode is required')
    .isBoolean()
    .withMessage('privateMode should be true or false'),
];

export const BodyShare = [
  body('postId')
    .exists()
    .withMessage('postId is required')
    .isString()
    .withMessage('postId should be string'),
  body('privateMode')
    .exists()
    .withMessage('privateMode is required')
    .isBoolean()
    .withMessage('privateMode should be true or false'),
];

export const BodyUpdateShare = [
  body('privateMode')
    .exists()
    .withMessage('privateMode is required')
    .isBoolean()
    .withMessage('privateMode should be true or false'),
];

export const BodyFollow = [
  body('userFollowedId')
    .exists()
    .withMessage('userFollowedId is required')
    .isString()
    .withMessage('userFollowedId should be string'),
];

export const BodyGroup = [
  body('name')
    .exists()
    .withMessage('name is required')
    .isString()
    .withMessage('name should be string'),
  body('description')
    .exists()
    .withMessage('description is required')
    .isString()
    .withMessage('description should be string'),
  body('privateMode')
    .exists()
    .withMessage('privateMode is required')
    .isBoolean()
    .withMessage('privateMode should be true or false'),
];
