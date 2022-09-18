import express from 'express';
import * as trpc from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import { z } from 'zod';
import cors from 'cors';
import axios from 'axios';
import * as apiServerSetupMocks from './mocks/index';
import { TRPCError } from '@trpc/server';

export const DATABASE_URL = 'https://jsonplaceholder.typicode.com';

const ZodToDo = z.object({
  userId: z.number(),
  id: z.number(),
  title: z.string(),
  completed: z.boolean(),
});

type ToDo = z.infer<typeof ZodToDo>;

const appRouter = trpc.router().query('getTodos', {
  async resolve(): Promise<ToDo[]> {
    const response = await axios
      .get<ToDo[]>(`${DATABASE_URL}/todos`)
      .then((data) => data.data.map((dataItem) => ZodToDo.parse(dataItem)));

    return response;
  },
});

export type AppRouter = typeof appRouter;
export default apiServerSetupMocks;

function prepare() {
  console.log('prepare');
  // if (process.env.NODE_ENV === 'development') {
  return import('./mocks').then(async (apiServer) => {
    console.log(apiServer);
    await apiServer.setupMocks();
  });
  // }
  // return Promise.resolve();
}

prepare().then(() => {
  const app = express();
  app.use(cors());
  const port = 8080;

  app.use(
    '/trpc',
    trpcExpress.createExpressMiddleware({
      router: appRouter,
      createContext: () => null,
    })
  );

  app.get('/', (req, res) => {
    res.send('Hello from api-server');
  });

  app.listen(port, () => {
    console.log(`api-server listening at http://localhost:${port}`);
  });
});
