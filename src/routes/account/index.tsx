import {RequestEvent} from '@builder.io/qwik-city';
import {Session} from '@auth/core/types';
import {component$} from '@builder.io/qwik';
import {useAuthSession} from '~/routes/plugin@auth';

export const onRequest = async (request: RequestEvent) => {
    const logged = request.sharedMap.get('session') as Session | null;

    if (logged?.user === undefined) {
        throw request.redirect(302, '/');
    }
};

export default component$(() => {
    const authSession = useAuthSession();
    return (
        <div class="h-screen mt-10 flex justify-center items-start">
            <div class="card w-96 bg-base-100 rounded-lg shadow-xl">
                <figure>
                    <div class="avatar">
                        <div class="w-32 m-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            <img src={authSession.value?.user?.image ?? '/images/default-profile.jpeg'}
                                 alt="Profile"
                            />
                        </div>
                    </div>
                </figure>
                <div class="card-body items-center text-center">
                    <h2 class="text-xl">{authSession.value?.user?.name}</h2>
                    <p>{authSession.value?.user?.email}</p>
                </div>
            </div>
        </div>
    )
})
