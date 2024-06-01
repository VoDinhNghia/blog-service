import { randomUUID } from 'crypto';
import { GetCurrentDate } from './utils.get.current-date';

export const randomUuid = () => {
  return randomUUID();
};

export const randomCode = (length: number) => {
  return Math.floor(
    Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1)
  );
};

export const generateCode = (length: number) => {
  const code = randomCode(length);
  const year = new GetCurrentDate().getYear();
  return `${year}${code}`;
};
