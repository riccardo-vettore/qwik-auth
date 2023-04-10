import {component$} from '@builder.io/qwik';
import {getProviders, useAuthSignin} from '~/routes/plugin@auth';
import {Form, routeLoader$} from '@builder.io/qwik-city';
import {AuthProvider} from '~/types';
import {Button, Card} from '@qwik-ui/headless';
import {QwikLogo} from '~/components/icons/qwik';
import {Session} from '@auth/core/types';

routeLoader$(async (requestEvent) => {
    const logged = requestEvent.sharedMap.get('session') as Session | null;
    if (logged?.user !== undefined) {
        return requestEvent.redirect(302, '/');
    }
})

export default component$(() => {
    const loginAction = useAuthSignin();
    return (
        <div class="h-screen flex flex-col items-center justify-center">
            <Card class="w-96 bg-base-100 shadow-xl">
                <figure class="px-10 pt-10 flex justify-center">
                    <QwikLogo/>
                </figure>
                <div class="card-body items-center text-center">
                    <h2 class="card-title">Sign in</h2>
                    <div class="card-actions">
                        <Form action={loginAction}>
                            <div class="mt-5">
                                {Object.values(getProviders().value as AuthProvider[]).map((provider) => (
                                    <div key={provider.name}>
                                        <input
                                            type="hidden"
                                            name="providerId"
                                            value={provider.id}
                                        />
                                        <Button class="btn btn-outline">
                                            Sign in with {provider.name}
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </Form>
                    </div>
                </div>
            </Card>
        </div>
    )
})