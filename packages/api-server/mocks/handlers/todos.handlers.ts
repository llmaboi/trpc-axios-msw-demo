import { rest } from 'msw';
import { DATABASE_URL } from '../..';

export const todoHandlers = [
  rest.get(`${DATABASE_URL}/todos`, (req, res, ctx) => {
    console.log(req, res, ctx);

    return res(
      ctx.status(200),
      ctx.json([
        {
          userId: 5,
          id: 100,
          title: 'excepturi a et neque qui expedita vel voluptate',
          completed: false,
        },
      ])
    );
  }),
];
