import { Component, tags, useState } from "@odoo/owl";
import { GandalfEnv, ModeName, Music } from "../types";
import { gandalf } from "../utils";
import Dropdown from "./Dropdown";

/**
 * Navbar component
 *
 * Contains the topmost elements of the application, typically the buttons and
 * dropdown menus.
 */
class Navbar extends Component<{}, GandalfEnv> {
    protected state = useState(<{ closeButton: "idle" | "hover" | "hidden" }>{
        closeButton: "idle",
    });

    protected ALT_F4 = "";
    protected HELP = "De l'aide ? T'es teubé ou ça se passe comment ?";

    public static components = { Dropdown };
    public static template = tags.xml`
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="#">${gandalf("quizz")}</a>
            <ul class="navbar-nav mr-auto">
                <li class="nav-item"><Dropdown class="nav-link" title="'Fichier'" icon="'fas fa-folder'" direction="'down'">
                    <li class="dropdown-item"><Dropdown title="'Quitter'" icon="'fas fa-sign-out-alt'">
                        <li class="dropdown-item"><Dropdown title="'Quitter le programme'">
                            <li class="dropdown-item"><Dropdown title="'ATTENTION vous allez quitter le programme'">
                                <li class="dropdown-item"><Dropdown title="'Vous êtes sur le point de quitter'">
                                    <li class="dropdown-item"><Dropdown title="'Ici vous quittez, promis'">
                                        <li class="dropdown-item"><Dropdown title="'Bon, la suivante alors'">
                                            <li class="dropdown-item" t-on-click="notify(ALT_F4)">
                                                <button class="btn">Mdr appuie sur Alt+F4 blaireau</button>
                                            </li>
                                        </Dropdown></li>
                                    </Dropdown></li>
                                </Dropdown></li>
                            </Dropdown></li>
                        </Dropdown></li>
                    </Dropdown></li>
                </Dropdown></li>
                <li class="nav-item">
                    <Dropdown class="nav-link" title="'Mode'" icon="'fas fa-hat-wizard'" direction="'down'">
                        <li class="dropdown-item btn" t-on-click="trigger('change-mode', '${<
                            ModeName
                        >"gandalf"}')">
                            Gandulf
                        </li>
                        <li class="dropdown-item btn" t-on-click="trigger('change-mode', '${<
                            ModeName
                        >"partyhard"}')">
                            Party
                        </li>
                        <li class="dropdown-item btn" t-on-click="trigger('change-mode', '${<
                            ModeName
                        >"chicken"}')">
                            Chicken
                        </li>
                    </Dropdown>
                </li>
                <li class="nav-item">
                    <Dropdown class="nav-link" title="'Musique'" icon="'fas fa-music'" direction="'down'">
                        <li class="dropdown-item btn" t-on-click="trigger('change-music', '${<
                            Music
                        >"lotr"}')">
                            Teh Lord of teh Reings
                        </li>
                        <li class="dropdown-item btn" t-on-click="trigger('change-music', '${<
                            Music
                        >"sax"}')">
                            Epic Sax Guy
                        </li>
                        <li class="dropdown-item btn" t-on-click="trigger('change-music', '${<
                            Music
                        >"unicorn"}')">
                            Flappy Unicorn
                        </li>
                        <li class="dropdown-item btn" t-on-click="notify('MDR')">
                            Arrêter la musique
                        </li>
                    </Dropdown>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#" t-on-click="notify(HELP)">
                        <i class="fas fa-info-circle mr-2"/> Aide
                    </a>
                </li>
            </ul>
            <button t-if="state.closeButton !== 'hidden'"
                class="btn"
                t-att-class="{ 'btn-danger': state.closeButton === 'hover' }"
                t-on-mouseover="state.closeButton = 'hover'"
                t-on-mouseleave="state.closeButton = 'idle'"
                t-on-click="quit"
                >
                <i class="fas fa-times"/>
            </button>
        </nav>`;

    //-------------------------------------------------------------------------
    // Protected
    //-------------------------------------------------------------------------

    /**
     * Removes the button on click and triggers a notification.
     */
    protected quit() {
        this.notify("C'est pas la bonne croix espèce d'handicapé");
        this.state.closeButton = "hidden";
    }

    /**
     * Shorthand method to trigger a notifcation.
     * @param text
     */
    protected notify(text: string) {
        return this.trigger("notify", text);
    }
}

export default Navbar;
