import {component$, Slot} from '@builder.io/qwik';
import {routeLoader$} from '@builder.io/qwik-city';

import Header from '~/components/header/header';
import {useAuthSession} from '~/routes/plugin@auth';
import {AuthUser} from '~/types';

export const useServerTimeLoader = routeLoader$(() => {
    return {
        date: new Date().toISOString(),
    };
});

export const isAuthPath = routeLoader$(async (requestEvent) => {
    return requestEvent.url.pathname === '/auth/signin/';
})

export default component$(() => {
    const userSignal = useAuthSession();
    const isAuthPathSignal = isAuthPath();
    return (
        <div class="page bg-base-300 p-3">
            <main>
                {
                    !isAuthPathSignal.value &&
                    <Header user={userSignal.value?.user as AuthUser}/>
                }
                <Slot/>
            </main>
        </div>
    );
});
