import { check } from 'express-validator';

export const deviceValidation = [
  check('name', 'Name is required').notEmpty(),
  check('description', 'Description must be a string').optional().isString(),
  check('price', 'Price must be a valid number').isNumeric(),
  check('brandId', 'Brand ID is required').notEmpty(),
  check('typeId', 'Type ID is required').notEmpty(),
];

export const typeValidation = [
  check('name', 'Type name is required').notEmpty(),
];

export const brandValidation = [
  check('name', 'Brand name is required').notEmpty(),
];

