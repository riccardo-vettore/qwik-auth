import z from 'zod';

const envVariables = z.object({
	VITE_AUTH_SECRET: z.string(),
	VITE_GITHUB_CLIENT_ID: z.string(),
	VITE_GITHUB_CLIENT_SECRET: z.string()
});

export const ENV_VARIABLES = envVariables.parse(import.meta.env);
