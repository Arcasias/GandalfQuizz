import { Component, hooks, tags } from "@odoo/owl";
import { OwlEvent } from "@odoo/owl/dist/types/core/owl_event";
import { modes, profileResult, scoreResult } from "../data";
import {
    ClientState,
    GandalfEnv,
    ModeName,
    Music,
    Phase,
    Profile,
} from "../types";
import { clean, gandalf, shuffle, updateJusteGandalf } from "../utils";
import Navbar from "./Navbar";

// Quizz
const RIGHT = +1;
const WRONG = -1;
const MAX_QUESTIONS = 20;
// Misc
const AVAILABLE_COLORS = ["red", "green", "blue", "yellow"];
const TIMEOUT_DELAY = 2500;
// Hooks
const { useExternalListener, useRef, useState } = hooks;

// Vars
let rgbIndex = 0;
let RGB_CLASSES = ["primary", "info", "success", "danger", "warning"];

class ColorSet extends Set<string> {
    public random(): string {
        const index = Math.floor(Math.random() * this.size);
        const values = [...this.values()];
        this.delete(values[index]);
        return values[index];
    }
}

class Ientcli extends Component<{}, GandalfEnv> {
    protected state = useState(<ClientState>{
        answer: null,
        game: null,
        message: null,
        mode: "gandalf",
        music: "lotr",
        phase: "home",
        rgb: 0,
    });
    protected audio = useRef("audio");
    protected messageTimeout = 0;
    protected rgbInterval = 0;
    protected COLOR_CLASS = {
        red: "text-danger",
        green: "text-success",
        blue: "text-primary",
        yellow: "text-warning",
    };

    protected TACRU = "MDR T'AS CRU TOI";

    public static components = { Navbar };
    public static style = tags.css`
        body {
            overflow: hidden;
        }

        .slide-enter {
            left: -100%;
        }
        .slide-leave-to {
            left: 100%;
        }
        .slide-enter-active,
        .slide-leave-active {
            transition: left .15s;
        }
        .slide-enter-to,
        .slide-leave {
            left: 0;
        }

        button {
            user-select: none;
        }

        .ientcli {
            display: flex;
            flex-direction: column;
            height: 100%;
            width: 100%;

            .ientcli-bg {
                align-items: center;
                display: flex;
                flex: 100% 1;
                justify-content: center;
                overflow: hidden;

                .ientcli-bg-img {
                    background-position: center;
                    background-repeat: no-repeat;
                    background-size: cover;
                    filter: blur(15px);
                    min-height: 110%;
                    min-width: 110%;
                }
            }
            .ientcli-banner {
                margin: 0 5%;
                position: absolute;
                top: 5.5rem;
                width: 90%;
            }
            .ientcli-main {
                background-color: white;
                border-radius: 5px;
                display: flex;
                margin: 0 5%;
                max-height: 75%;
                position: absolute;
                top: 10rem;
                width: 90%;

                .controls {
                    display: flex;
                    flex: 1;
                    flex-direction: column;

                    .controls-gif {
                        cursor: pointer;
                        max-height: 664px;
                        min-width: 100%;
                    }
                }

                .quizz {
                    display: flex;
                    flex: 1;
                    flex-direction: column;
                    padding: 1.5rem 2rem;

                    .quizz-body {
                        flex: 1;

                        .choice, .choice > * {
                            cursor: pointer;
                        }
                    }

                    .quizz-footer {
                        align-items: center;
                        display: flex;
                        justify-content: space-between;
                    }
                }
            }
        }`;
    public static template = tags.xml`
        <div class="ientcli">
            <Navbar
                t-on-notify="onNotify"
                t-on-change-music="changeMusic"
                t-on-change-mode="changeMode"
            />
            <div class="ientcli-bg">
                <img class="ientcli-bg-img" t-attf-src="assets/images/{{ mode.image }}.gif"/>
            </div>
            <div t-if="state.message" t-attf-class="ientcli-banner alert alert-dismissible alert-{{ RGB('danger') }}" role="alert" t-transition="slide">
                <t t-esc="state.message"/>
                <button type="button" class="close" aria-label="Fermer" t-on-click="notify('NON')">
                    <span aria-hidden="true">×</span>
                </button>
            </div>
            <div class="ientcli-main">
                <div class="controls">
                    <img class="controls-gif img-fluid"
                        t-attf-src="assets/images/{{ mode.image }}.gif"
                        t-on-click="newGame"
                    />
                    <div class="btn-group">
                        <button t-attf-class="btn btn-{{ RGB('primary') }} rounded-0" t-on-click="notify(TACRU)">
                            <i class="fas fa-stop mr-2"/>Arrêter la ${gandalf(
                                "music"
                            )}
                        </button>
                        <button t-attf-class="btn btn-{{ RGB('primary') }} rounded-0" t-on-click="toggleRGB(!state.rgb)">RGB</button>
                    </div>
                </div>
                <div class="quizz">
                    <t t-if="state.phase === 'end'" t-set="result" t-value="env._(endMessage)"/>
                    <h1 class="quizz-header mb-4" t-esc="env._(title)"/>
                    <form class="quizz-body">
                        <p t-if="state.phase === 'home'" t-esc="env._(mode.home.description)"/>
                        <t t-elif="state.phase === 'quizz'">
                            <div class="form-group">
                                <h5 t-esc="env._(statement)"/>
                            </div>
                            <div class="form-group">
                                <t t-if="step.choices">
                                    <div t-foreach="step.choices" t-as="choice" t-key="choice.id"
                                        class="choice form-check"
                                        >
                                        <input class="form-check-input"
                                            type="radio"
                                            name="choice"
                                            t-attf-id="choice{{ choice.id }}"
                                            t-on-change="state.answer = choice.id"
                                        />
                                        <label class="form-check-label" t-att-class="COLOR_CLASS[choice.color]" t-attf-for="choice{{ choice.id }}" t-esc="env._(choice.text)"/>
                                    </div>
                                </t>
                                <input t-elif="step.expected" type="text" class="form-control" t-model="state.answer"/>
                            </div>
                        </t>
                        <t t-elif="state.phase === 'end'">
                            <h3 class="mb-3">
                                Score final : <t t-esc="result.score"/> / <t t-esc="result.total"/> - <t t-esc="env._(result.title)"/>
                            </h3>
                            <p t-esc="env._(result.description)"/>
                        </t>
                    </form>
                    <div class="quizz-footer">
                        <button t-if="state.phase === 'home' and mode.home.button"
                            type="button"
                            t-attf-class="btn btn-{{ RGB('primary') }}"
                            t-esc="env._(mode.home.button)"
                            t-on-click="notify('Mais clique pas sur le bouton imbécile !')"
                        />
                        <t t-elif="state.phase === 'quizz'">
                            <div class="btn-group">
                                <button class="btn" t-on-click="notify('Bah non tu sais pas revenir en arrière')">
                                    Précédent
                                </button>
                                <button t-if="canSubmit" type="button" t-attf-class="btn btn-{{ RGB('primary') }}" t-on-click="next">
                                    Valider
                                </button>
                            </div>
                            <h5 class="btn">
                                Score : <t t-esc="state.game.score"/>
                            </h5>
                        </t>
                        <button t-elif="state.phase === 'end'" type="button"
                            t-attf-class="btn btn-{{ RGB('primary') }}"
                            t-esc="mode.end.description"
                            t-on-click="notify('Non, toujours pas ce bouton')"
                        />
                    </div>
                </div>
            </div>
            <audio t-if="state.laugh" t-attf-src="assets/sons/laugh_{{ state.laugh }}.mp3" autoplay="autoplay"/>
            <audio t-ref="audio" t-attf-src="assets/sons/{{ state.music }}.wav" autoplay="autoplay" loop="loop"/>
        </div>`;

    constructor() {
        super(...arguments);

        useExternalListener(window, "keydown", this.onWindowKeydown);
    }

    //-------------------------------------------------------------------------
    // Getters
    //-------------------------------------------------------------------------

    /**
     * Returns whether the current step can be submitted.
     */
    protected get canSubmit() {
        return this.state.game && this.state.answer;
    }

    /**
     * Returns the information about the game result
     */
    protected get endMessage() {
        const game = this.state.game!;
        const ratio = (game.score / game.steps.length) * 100;
        let description: string;
        for (const s of scoreResult.keys()) {
            if (ratio >= Number(s)) {
                description = scoreResult.get(s)!;
                break;
            }
        }
        let topProfile: Profile | null = null;
        for (const profile in game.profiles) {
            if (
                !topProfile ||
                game.profiles[topProfile] <= game.profiles[<Profile>profile]
            ) {
                topProfile = <Profile>profile;
            }
        }
        return {
            score: game.score,
            total: game.steps.length,
            title: profileResult[topProfile!].title,
            description: [
                description!,
                profileResult[topProfile!].description,
            ].join(" "),
        };
    }

    /**
     * Shorthand to the current selected mode.
     */
    protected get mode() {
        return modes[this.state.mode];
    }

    /**
     * Shorthand to the current quizz step (or null if not in a quizz).
     */
    protected get step() {
        if (!this.state.game) {
            return null;
        }
        return this.state.game.steps[this.state.game.stepIndex];
    }

    /**
     * Returns the statement of the current step (or null if not in a quizz).
     */
    protected get statement() {
        if (!this.state.game) {
            return null;
        }
        const { stepIndex, steps } = this.state.game!;
        return `${stepIndex + 1}. ${steps[stepIndex].statement}`;
    }

    /**
     * Returns the title of the current mode in the current phase.
     */
    protected get title() {
        return this.mode[this.state.phase]!.title;
    }

    //-------------------------------------------------------------------------
    // Protected
    //-------------------------------------------------------------------------

    /**
     * Starts a new game and plays the current soundtrack if not already
     * playing.
     */
    protected newGame() {
        const audio = <HTMLAudioElement>this.audio.el;
        audio.volume = 0.1;
        audio.play();
        if (this.state.game && this.state.phase === "quizz") {
            return;
        }
        this.switchPhase("quizz");
    }

    /**
     * Switches the current phase between "home", "quizz" and "end".
     * @param phase
     */
    protected switchPhase(phase: Phase) {
        const mode = modes[this.state.mode];
        this.state.answer = null;
        switch (phase) {
            case "home": {
                this.state.game = null;
                this.state.phase = "home";
                break;
            }
            case "quizz": {
                const steps = shuffle(mode.quizz.steps).slice(0, MAX_QUESTIONS);
                steps.forEach((step, stepId) => {
                    step.id = stepId;
                    if (step.choices) {
                        const colors = new ColorSet(AVAILABLE_COLORS);
                        const colorDefined = step.choices.filter(
                            (c) => c.color
                        );
                        for (const defined of colorDefined) {
                            colors.delete(defined.color!);
                        }
                        step.choices = shuffle(step.choices).map(
                            (c, choiceId) => {
                                const choice = Object.assign(
                                    { id: `${stepId}.${choiceId}` },
                                    c
                                );
                                choice.color = choice.color || colors.random();
                                return choice;
                            }
                        );
                    }
                });
                this.state.phase = "quizz";
                this.state.game = {
                    profiles: {
                        clown: 0,
                        chicken: 0,
                        colour: 0,
                        idiot: 0,
                        nerd: 0,
                    },
                    score: 0,
                    stepIndex: 0,
                    steps,
                };
                break;
            }
            case "end": {
                updateJusteGandalf();
                this.state.phase = "end";
                break;
            }
        }
    }

    /**
     * Changes the current soundtrack.
     * @param ev
     */
    protected changeMusic(ev: OwlEvent<Music>) {
        this.state.music = ev.detail;
    }

    /**
     * Changes the current mode.
     * @param ev
     */
    protected changeMode(ev: OwlEvent<ModeName>) {
        this.switchPhase("home");
        this.state.mode = ev.detail;
    }

    /**
     * Goes to the next step if the current answer can be submitted.
     */
    protected next() {
        if (!this.canSubmit) {
            return;
        }
        const game = this.state.game!;
        if (this.step!.choices) {
            const chosen = this.step!.choices.find(
                (c) => c.id === this.state.answer
            )!;
            game.score += chosen.expected ? RIGHT : WRONG;
            game.profiles[chosen.profile]++;
        } else if (this.step!.expected) {
            const correct =
                clean(this.state.answer!) === clean(this.step!.expected);
            game.score += correct ? RIGHT : WRONG;
        }
        this.state.answer = null;
        if (game.stepIndex < game.steps.length - 1) {
            game.stepIndex++;
        } else {
            this.switchPhase("end");
        }
    }

    /**
     * Displays a notification in the notification banner. If a notifcation is
     * already displayed it will be erased by the new text and the timer will
     * be refreshed.
     * @param text
     */
    protected notify(text: string) {
        if (this.messageTimeout) {
            clearTimeout(this.messageTimeout);
        }
        this.state.message = this.env._(text);
        this.state.laugh = this.state.laugh === 1 ? 2 : 1;
        this.messageTimeout = setTimeout(() => {
            this.state.message = null;
            this.state.laugh = null;
        }, TIMEOUT_DELAY);
    }

    /**
     * Returns a randomly chosen color class if "rgb" mode is on, else returns
     * the default class.
     * @param defaultClass
     */
    protected RGB(defaultClass: string) {
        if (this.state.rgb) {
            return RGB_CLASSES[rgbIndex++];
        } else {
            return defaultClass;
        }
    }

    /**
     * Toggles the "rgb" mode on or off depending on the value of "set".
     * @param set
     */
    protected toggleRGB(set: boolean) {
        clearTimeout(this.state.rgb);
        if (set) {
            this.state.rgb = setTimeout(() => {
                rgbIndex = 0;
                RGB_CLASSES = shuffle(RGB_CLASSES);
                this.toggleRGB(true);
            }, 300);
        } else {
            this.state.rgb = 0;
        }
    }

    //-------------------------------------------------------------------------
    // Handlers
    //-------------------------------------------------------------------------

    /**
     * Listens to children triggering a notification request.
     * @param ev
     */
    protected onNotify(ev: OwlEvent<string>) {
        this.notify(ev.detail);
    }

    /**
     * Method handling the keyboard navigation.
     * @param ev
     */
    protected onWindowKeydown(ev: KeyboardEvent) {
        if (ev.key === "Enter") {
            ev.preventDefault();
            if (this.state.game) {
                this.next();
            } else {
                this.newGame();
            }
        }
    }
}

export default Ientcli;
