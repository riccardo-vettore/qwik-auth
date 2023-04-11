import {$, component$} from '@builder.io/qwik';
import Navbar from '~/components/navbar/navbar';
import {Form, useNavigate} from '@builder.io/qwik-city';
import {useAuthSignin, useAuthSignout} from '~/routes/plugin@auth';
import {AuthUser} from '~/types';

interface HeaderProps {
    user: AuthUser;
}

export default component$(({user}: HeaderProps) => {
    const loginAction = useAuthSignin();
    const signoutAction = useAuthSignout();
    const navigate = useNavigate();

    const getUserInitials = $((user: AuthUser) => {
        if (!user.name) return '';
        return user.name.split(' ').reduce((prev, curr) => {
            return `${prev} ${curr[0]}`
        }, '');
    })

    return (
        <Navbar class="bg-base-100 rounded-lg bg-neutral text-neutral-content">
            <div q:slot="navbar-left">
                <button class="btn btn-ghost normal-case text-xl"
                        onClick$={() => navigate('/')}
                >
                    Qwik Auth
                </button>
            </div>
            <div q:slot="navbar-right">
                {
                    !user ? (
                        <Form action={loginAction}>
                            <div>
                                <input
                                    type="hidden"
                                    name="provider"
                                    value="credentials"
                                />
                                <button class="btn">Login</button>
                            </div>
                        </Form>
                    ) : (
                        <div class="dropdown dropdown-end">
                            <label tabIndex={0} class="btn btn-ghost btn-circle avatar placeholder">
                                <div class="bg-neutral-focus text-neutral-content rounded-full w-12">
                                    <span>
                                        {
                                            user.image ? (
                                                <div class="w-10 rounded-full">
                                                    <img src={user.image}/>
                                                </div>
                                            ) : getUserInitials(user)
                                        }
                                    </span>
                                </div>
                            </label>
                            <ul tabIndex={0}
                                class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                                <li>
                                    <button onClick$={() => navigate('/account')}>
                                        Account
                                    </button>
                                </li>
                                <li>
                                    <Form action={signoutAction}>
                                        <div>
                                            <input
                                                type="hidden"
                                                name="provider"
                                                value="credentials"
                                            />
                                            <button>Logout</button>
                                        </div>
                                    </Form>
                                </li>
                            </ul>
                        </div>
                    )
                }
            </div>
        </Navbar>
    );
});
