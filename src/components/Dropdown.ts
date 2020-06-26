import { Component, hooks, tags } from "@odoo/owl";
import { GandalfEnv } from "../types";

// Hooks
const { useExternalListener, useState } = hooks;

/**
 * Dropdown menu component
 *
 * This component includes 2 parts:
 * 1. The header displaying the 'title' props and the optional 'icon' prop
 * 2. The dropdown menu, displayed only if the component is in open state.
 *    This second part holds a default 't-slot' used to inject the dropdown
 *    content
 */
class Dropdown extends Component<
    { direction: string; title: string; icon: string },
    GandalfEnv
> {
    public state = useState(<{ open: boolean }>{
        open: false,
    });
    public static defaultProps = {
        direction: "right",
    };
    public static style = tags.css`
        .gandalf-menu {
            width: 100%;

            .gandalf-menu-title {
                align-items: center;
                display: flex;
                width: 100%;
            }
        }`;
    public static template = tags.xml`
        <div t-attf-class="gandalf-menu btn-group drop{{ props.direction }}">
            <div class="gandalf-menu-title"
                role="button"
                aria-haspopup="true"
                t-att-aria-expanded="stringify(state.open)"
                t-on-click="state.open = !state.open"
                >
                <i t-if="props.icon" class="mr-2" t-att-class="props.icon"/>
                <t t-esc="env._(props.title)"/>
            </div>
            <ul t-if="state.open" class="dropdown-menu show">
                <t t-slot="default"/>
            </ul>
        </div>`;

    constructor() {
        super(...arguments);

        useExternalListener(window, "click", this.onWindowClick);
    }

    /**
     * 'JSON.stringify' is not available in Owl.
     * @param expr
     */
    stringify(expr: any) {
        return JSON.stringify(expr);
    }

    //-------------------------------------------------------------------------
    // Handlers
    //-------------------------------------------------------------------------

    /**
     * Closes the dropdown on external clicks.
     * @param ev
     */
    onWindowClick(ev: MouseEvent) {
        if (this.state.open && !this.el!.contains(<Node>ev.target)) {
            this.state.open = false;
        }
    }
}

export default Dropdown;
