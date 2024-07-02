import { build } from './app';

const host = 'RENDER' in process.env ? `0.0.0.0` : `localhost`;
const port = process.env.PORT ? Number(process.env.PORT) : 4000;

const start = async () => {
  const fastify = build();

  try {
    await fastify.listen({
      host,
      port,
    });

    fastify.log.info(`Server started on ${JSON.stringify(fastify.server.address())}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

void start();
