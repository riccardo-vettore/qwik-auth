import {component$, Slot} from '@builder.io/qwik';
import {routeLoader$} from '@builder.io/qwik-city';

import Header from '~/components/header/header';
import {useAuthSession} from '~/routes/plugin@auth';

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
        <div class="page">
            <main>
                {
                    !isAuthPathSignal.value &&
                    <Header loggedIn={userSignal.value?.user !== undefined}/>
                }
                <Slot/>
            </main>
        </div>
    );
});
