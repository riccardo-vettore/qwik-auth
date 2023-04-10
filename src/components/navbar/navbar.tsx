import {component$, QwikIntrinsicElements, Slot} from '@builder.io/qwik';
import clsq from '~/shared/utils/clsq';

export type HTMLNavigationBarProps = QwikIntrinsicElements['div'];

export default component$((props: HTMLNavigationBarProps) => {
    const { class: className, ...rest } = props;

    return (
        <div class={clsq('navbar', className)} {...rest}>
            <div class="navbar-start">
                <Slot name="navbar-left" />
            </div>
            <div class="navbar-center">
                <Slot name="navbar-center" />
            </div>
            <div class="navbar-end">
                <Slot name="navbar-right" />
            </div>
        </div>
    );
});