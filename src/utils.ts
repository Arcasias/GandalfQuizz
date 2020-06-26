import { Dictionnary } from "./types";

let attempts = Number(window.localStorage.getItem("gandalf-quizz-attempts"));
let terms: Dictionnary<string> = {};

/**
 * Returns a normalized version of a string.
 * @param term
 */
export function clean(term: string) {
    return term.trim().normalize().toLowerCase();
}

/**
 * Returns a Gandalfified™️ version of a string.
 * @param term "Gandalf <term>™️"
 */
export function gandalf(term: string) {
    return `Gandalf ${term[0].toUpperCase() + term.slice(1)}™️`;
}

/**
 * Translation function returning "Juste Gandalf™️" based on the amount of
 * games the user has played. The more attempts, the higher the chance of
 * displaying "Just Gandalf™️" instead of the actual text.
 * @param text
 */
export function justeGandalf(text: string): string {
    if (!(text in terms)) {
        terms[text] = attempts > Math.random() * 150 ? "Juste Gandalf™️" : text;
    }
    return terms[text];
}

/**
 * Returns a shuffled copy of the given list.
 * @param list
 */
export function shuffle<T>(list: T[]): T[] {
    const copy = list.slice();
    if (list.length < 2) {
        return copy;
    }
    for (let i = copy.length - 1; i >= 0; i--) {
        const randId = Math.floor(Math.random() * i + 1);
        const temp = copy[i];
        copy[i] = copy[randId];
        copy[randId] = temp;
    }
    return copy;
}

/**
 * Increases the game attempts counter and resets the translations.
 */
export function updateJusteGandalf() {
    attempts++;
    window.localStorage.setItem("gandalf-quizz-attempts", String(attempts));
    terms = {};
}
