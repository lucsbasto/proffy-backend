/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { Request, Response } from 'express';
import { Types } from 'mongoose';

export function ValidateIDMiddleware (req: Request, res: Response, next: Function) {
  const { id } = req.params;
  console.log(id);
  if (id && !Types.ObjectId.isValid(id)) { return res.status(400).send({ error: 'Invalid ID' }) }
  return next();
}
