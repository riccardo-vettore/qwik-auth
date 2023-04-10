import {component$} from '@builder.io/qwik';
import Navbar from '~/components/navbar/navbar';
import {Form} from '@builder.io/qwik-city';
import {Button} from '@qwik-ui/headless';
import {useAuthSignin, useAuthSignout} from '~/routes/plugin@auth';

interface HeaderProps {
    loggedIn: boolean;
}

export default component$(({loggedIn}: HeaderProps) => {
    const loginAction = useAuthSignin();
    const signoutAction = useAuthSignout();

    return (
        <Navbar class="bg-base-100 rounded-lg bg-neutral text-neutral-content">
            <a q:slot="navbar-left" class="btn btn-ghost normal-case text-xl">
                Qwik Auth
            </a>
            <div q:slot="navbar-right">
                <Form action={loggedIn ? signoutAction : loginAction}>
                    <div>
                        <input
                            type="hidden"
                            name="provider"
                            value="credentials"
                        />
                        <Button class="btn">{loggedIn ? 'Logout' : 'Login'}</Button>
                    </div>
                </Form>
            </div>
        </Navbar>
    );
});
