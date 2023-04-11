import GithubProvider from '@auth/core/providers/github';
import GoogleProvider from '@auth/core/providers/google';
import {Provider} from '@auth/core/providers';
import {serverAuth$} from '~/custom-qwik-auth';
import {ENV_VARIABLES} from '~/env';

export const {useAuthSignin, useAuthSignout, onRequest, getProviders, useAuthSession} = serverAuth$(
    () => {
        return ({
            secret: ENV_VARIABLES.VITE_AUTH_SECRET,
            trustHost: true,
            pages: {
                signIn: '/auth/signin'
            },
            providers: [
                GithubProvider({
                    clientId: ENV_VARIABLES.VITE_GITHUB_CLIENT_ID,
                    clientSecret: ENV_VARIABLES.VITE_GITHUB_CLIENT_SECRET,
                }),
                GoogleProvider({
                    clientId: ENV_VARIABLES.VITE_GOOGLE_CLIENT_ID,
                    clientSecret: ENV_VARIABLES.VITE_GOOGLE_CLIENT_SECRET
                })
            ] as Provider[],
            callbacks: {
                async redirect({ url, baseUrl }) {
                    // Allows relative callback URLs
                    if (url.startsWith("/")) return `${baseUrl}${url}`
                    else return baseUrl
                }
            }
        })
    }
);
