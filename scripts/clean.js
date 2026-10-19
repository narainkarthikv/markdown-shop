import { rm } from 'node:fs/promises';

await Promise.all(
  ['dist', 'node_modules/.vite'].map((path) =>
    rm(path, { recursive: true, force: true })
  )
);
