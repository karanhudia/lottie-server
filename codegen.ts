import type { CodegenConfig } from '@graphql-codegen/cli';

const port = process.env.PORT || 4000;

const config: CodegenConfig = {
  overwrite: true,
  schema: `http://localhost:${port}/graphql`,
  generates: {
    'src/graphql/generated.ts': {
      plugins: [
        {
          add: {
            content: `// eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-nocheck
            /* eslint-disable */`,
          },
        },
        'typescript',
        'typescript-resolvers',
      ],
    },
  },
  hooks: { afterAllFileWrite: ['prettier --write'] },
};

export default config;
