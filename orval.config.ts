import { defineConfig } from 'orval';

export default defineConfig({
    api: {
        input: {
            target: 'https://architectural-bluepr.onrender.com/api-docs.json',
        },
        output: {
            mode: 'split',
            target: './src/lib/api/generated',
            schemas: './src/lib/api/generated/model',
            client: 'react-query',
            mock: false,
            prettier: true,
            clean: true, // Xóa file cũ trước khi generate
            override: {
                mutator: {
                    path: './src/lib/api/mutator.ts',
                    name: 'customInstance',
                },
                query: {
                    useQuery: true,
                    useMutation: true,
                    useInfinite: true,
                    signal: true,
                    version: 5,
                },
            },
        },
        hooks: {
            afterAllFilesWrite: 'npx prettier --write ./src/lib/api/generated/**/*.ts',
        },
    },
});