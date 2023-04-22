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
  body('members')
    .exists()
    .withMessage('members is required')
    .isArray()
    .withMessage('members should be array'),
];

export const BodyUpdateGroup = [
  body('name').optional().isString().withMessage('name should be string'),
  body('description')
    .optional()
    .isString()
    .withMessage('description should be string'),
  body('privateMode')
    .optional()
    .isBoolean()
    .withMessage('privateMode should be true or false'),
];

export const BodyUpdateGroupMember = [
  body('members')
    .exists()
    .withMessage('members is required')
    .isArray()
    .withMessage('members should be array'),
];

export const BodyCreateTopic = [
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
  body('groupId')
    .exists()
    .withMessage('groupId is required')
    .isString()
    .withMessage('groupId should be array'),
];

export const BodyUpdateTopic = [
  body('name').optional().isString().withMessage('name should be string'),
  body('description')
    .optional()
    .isString()
    .withMessage('description should be string'),
];

export const BodyCreateProblem = [
  body('problem')
    .exists()
    .withMessage('problem is required')
    .isString()
    .withMessage('problem should be string'),
  body('topicId')
    .exists()
    .withMessage('topicId is required')
    .isString()
    .withMessage('topicId should be string'),
];

export const BodyUpdateProblem = [
  body('problem').optional().isString().withMessage('problem should be string'),
];

export const BodyCreateSolution = [
  body('problemId')
    .exists()
    .withMessage('problemId is required')
    .isString()
    .withMessage('problemId should be string'),
  body('solution')
    .exists()
    .withMessage('solution is required')
    .isString()
    .withMessage('solution should be string'),
];

export const BodyUpdateSolution = [
  body('solution')
    .exists()
    .withMessage('solution is required')
    .isString()
    .withMessage('solution should be string'),
];

export const BodyCreateComment = [
  body('content')
    .exists()
    .withMessage('content is required')
    .isString()
    .withMessage('content should be string'),
  body('postId')
    .exists()
    .withMessage('postId is required')
    .isString()
    .withMessage('postId should be string'),
];

export const BodyUpdateComment = [
  body('content').optional().isString().withMessage('content should be string'),
];

export const BodyConversation = [
  body('name')
    .exists()
    .withMessage('name is required')
    .isString()
    .withMessage('name should be string'),
  body('chatWithId')
    .exists()
    .withMessage('chatWithId is required')
    .isString()
    .withMessage('chatWithId should be string'),
];

export const BodyMessage = [
  body('conversationId')
    .exists()
    .withMessage('conversationId is required')
    .isString()
    .withMessage('conversationId should be string'),
  body('content')
    .exists()
    .withMessage('content is required')
    .isString()
    .withMessage('content should be string'),
  body('userReviceId')
    .exists()
    .withMessage('userReviceId is required')
    .isString()
    .withMessage('userReviceId should be string'),
  body('userSendId')
    .exists()
    .withMessage('userSendId is required')
    .isString()
    .withMessage('userSendId should be string'),
];
