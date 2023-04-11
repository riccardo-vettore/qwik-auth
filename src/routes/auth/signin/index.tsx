import {component$} from '@builder.io/qwik';
import {getProviders, useAuthSignin} from '~/routes/plugin@auth';
import {RequestEvent} from '@builder.io/qwik-city';
import {AuthProvider} from '~/types';
import {QwikLogo} from '~/components/icons/qwik';
import {Session} from '@auth/core/types';

export const onRequest = async (request: RequestEvent) => {
    const logged = request.sharedMap.get('session') as Session | null;

    if (logged?.user !== undefined) {
        throw request.redirect(302, '/');
    }
};

export default component$(() => {
    const loginAction = useAuthSignin();
    return (
        <div class="h-screen flex flex-col items-center justify-center">
            <div class="w-96 card p-8 bg-base-100 rounded-lg shadow-xl">
                <figure class="flex justify-center">
                    <QwikLogo/>
                </figure>
                <div class="card-body items-center text-center">
                    <div class="text-xl">Sign in</div>
                    <div class="card-actions">
                        <div>
                            {Object.values(getProviders().value as AuthProvider[]).map((provider) => (
                                <div class="mt-5" key={provider.name}>
                                    <button class="btn btn-outline w-full"
                                            onClick$={() => loginAction.submit({providerId: provider.id})}
                                    >
                                        Sign in with {provider.name}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
})