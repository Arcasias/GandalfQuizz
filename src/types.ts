import { Env } from "@odoo/owl/dist/types/component/component";

export interface Choice {
    color?: string;
    expected?: boolean;
    id?: string;
    profile: Profile;
    text: string;
}
export interface ClientState {
    answer: string | null;
    laugh: number | null;
    message: string | null;
    mode: ModeName;
    music: Music;
    phase: Phase;
    game: Game | null;
    rgb: number;
}
export interface GandalfEnv extends Env {
    _: (text: string) => string;
}
export interface Game {
    profiles: { [key in Profile]: number };
    score: number;
    stepIndex: number;
    steps: Step[];
}
export interface Mode {
    image: string;
    home: StartPresentation;
    quizz: Quizz;
    end: Presentation;
}
export interface Presentation {
    title: string;
    description: string;
}
export interface Quizz {
    title: string;
    steps: Step[];
}
export interface StartPresentation extends Presentation {
    button?: string;
}
export interface Step {
    choices?: Choice[];
    expected?: string;
    id?: number;
    statement: string;
}

export type Dictionnary<T> = { [cle: string]: T };
export type ModeName = "gandalf" | "partyhard" | "chicken";
export type Music = "lotr" | "unicorn" | "sax";
export type Phase = "home" | "quizz" | "end";
export type Profile = "clown" | "idiot" | "nerd" | "colour" | "chicken";
