import { Dictionnary, Mode, Presentation, Profile, Step } from "./types";
import { gandalf } from "./utils";

// For generation purpose.
const templateQuestion = [
    {
        statement: ``,
        choices: [
            {
                text: ``,
                profile: "nerd",
                expected: true,
            },
            {
                text: ``,
                profile: "idiot",
            },
            {
                text: ``,
                profile: "colour",
            },
            {
                text: ``,
                profile: "clown",
            },
        ],
    },
];

const gandalfQuestions: Step[] = [
    {
        statement: `Qu'est-ce qu'un Hobbit ?`,
        choices: [
            {
                text: `C'est une race de semi-hommes aux grands pieds vivant dans des contrées reculeés de la Terre du Milieu`,
                profile: "nerd",
                expected: true,
            },
            {
                text: `Un quoi ?`,
                profile: "idiot",
            },
            {
                text: `La réponse rouge`,
                color: "red",
                profile: "colour",
            },
            {
                text: `Bah, écoute... en informatique s'il y a des bas-bits, il y a forcément des hauts-bits`,
                profile: "clown",
            },
        ],
    },
    {
        statement: `Qui est Sauron ?`,
        choices: [
            {
                text: `Le Seigneur des Ténèbres, premier lieutenent de Morgoth, artisan de l'Anneau Unique et souverain des terres du Mordor`,
                profile: "nerd",
                expected: true,
            },
            {
                text: `Gné ?`,
                profile: "idiot",
            },
            {
                text: `La réponse bleue`,
                color: "blue",
                profile: "colour",
            },
            {
                text: `Je ne sais pas, peut-être qu'un jour nous le Sauron`,
                profile: "clown",
            },
        ],
    },
    {
        statement: `Lequel de ces objets est une arme dévastatrice dont le seul but est d'asservir les peuples libres et dominer le monde des vivants ?`,
        choices: [
            {
                text: `L'Anneau Unique`,
                profile: "nerd",
                expected: true,
            },
            {
                text: `Euh... Frodon ? Non, Sam ! Enfin je sais pas...`,
                profile: "idiot",
            },
            {
                text: `Cette jolie réponse jaune`,
                color: "yellow",
                profile: "colour",
            },
            {
                text: `Mon sexe`,
                profile: "clown",
            },
        ],
    },
    {
        statement: `Où se situe Erebor ?`,
        choices: [
            {
                text: `Entre les Monts de Fer et la Forêt Noire`,
                profile: "nerd",
                expected: true,
            },
            {
                text: `Ereb... Quoi ?`,
                profile: "idiot",
            },
            {
                text: `Cette fois-ci j'en suis sûr : c'est la réponse rouge`,
                color: "red",
                profile: "colour",
            },
            {
                text: `Je sais pas mais un petit oiseau vient de se poser sur l'erebor de ma fenêtre...`,
                profile: "clown",
            },
        ],
    },
    {
        statement: `Qui sont les 3 compagnons de l'Anneau qui ont traversé le Rohan, trouvé Gandalf et libéré Theoden ?`,
        choices: [
            {
                text: `Gimli fils de Gloïn, Aragorn fils d'Arathorn et Legolas du Royaume Sylvestre`,
                profile: "nerd",
                expected: true,
            },
            {
                text: `J'ai pas suivi, on est bien dans Harry Potter là hein ?`,
                profile: "idiot",
            },
            {
                text: `On va tenter la réponse bleue alors`,
                color: "blue",
                profile: "colour",
            },
            {
                text: `Grincheux, le Roi-Liche et Bastion`,
                profile: "clown",
            },
        ],
    },
    {
        statement: `Comment s'appelle le vieux barbu qui hoche la tête ?`,
        expected: "gandalf",
    },
    {
        statement: `Comment s'appelle le nain barbu avec une grosse hache ?`,
        expected: "gimli",
    },
    {
        statement: `Comment s'appelle le grand elfe beau gosse avec un arc ?`,
        expected: "legolas",
    },
    {
        statement: `Comment s'appelle le seigneur des ténèbres à l'origine de l'Anneau Unique ?`,
        expected: "sauron",
    },
    {
        statement: `Combien y a-t-il de Nazguls ?`,
        choices: [
            {
                text: `Neuf, correspondant aux 9 rois humains corrompus par la fourberie de Sauron`,
                profile: "nerd",
                expected: true,
            },
            {
                text: `On s'en branle ?`,
                profile: "idiot",
            },
            {
                text: `Cette jolie teinte verte me fait de l'oeil`,
                color: "green",
                profile: "colour",
            },
            {
                text: `Laisser s'enfuire 2 gosses alors qu'ils sont 9, on a effectivement jamais vu aussi naze comme goules`,
                profile: "clown",
            },
        ],
    },
    {
        statement: `Quel magicien se laisse sombrer dans le désespoir et finit par rejoindre les rangs de Sauron ?`,
        choices: [
            {
                text: `Saruman le Blanc`,
                profile: "nerd",
                expected: true,
            },
            {
                text: `Gimli ? C'est pas un magicien ?`,
                profile: "idiot",
            },
            {
                text: `Toujours pas de violet... bon du rouge alors ?`,
                color: "red",
                profile: "colour",
            },
            {
                text: `Dumbledore`,
                profile: "clown",
            },
        ],
    },
    {
        statement: `Quelle épée Aragorn utilise-t-il pour quérir l'allégeance de l'Armée des morts et reprendre Minas Tirith`,
        choices: [
            {
                text: `Andúril, la Flamme de l'Ouest, regorgée à partir des fragments brisés de Narzil`,
                profile: "nerd",
                expected: true,
            },
            {
                text: `Aragog c'est dans Harry Potter hein ? Tu t'es juste gourré de film en fait ?`,
                profile: "idiot",
            },
            {
                text: `J'ai pas encore choisi assez de questions vertes`,
                color: "green",
                profile: "colour",
            },
            {
                text: `Son sexe`,
                profile: "clown",
            },
        ],
    },
    {
        statement: `Pourquoi Gandalf ne fait-il pas appel à Gwaihir, roi des aigles, pour porter l'Anneau en Mordor ?`,
        choices: [
            {
                text: `Les aigles sont des créatures fières et puissantes : ils craignent le pouvoir et la corruption que représente l'Anneau Unique. De plus, les rangs de Sauron comptent également de redoutables créatures volantes, telles les montures ailées des Nazguls.`,
                profile: "nerd",
                expected: true,
            },
            {
                text: `Il y a des aigles dans Star Wars maintenant ?`,
                profile: "idiot",
            },
            {
                text: `Am stram gram... et... bleu !`,
                color: "blue",
                profile: "colour",
            },
            {
                text: `Parce qu'il n'a pas de doigts`,
                profile: "clown",
            },
        ],
    },
    {
        statement: `Quel matériau protège Frodon du coup fatal d'un troll des cavernes dans les mines de la Moria ?`,
        choices: [
            {
                text: `Du mithril`,
                profile: "nerd",
                expected: true,
            },
            {
                text: `La kryptonite ?`,
                profile: "idiot",
            },
            {
                text: `Rouge ! Non, jaune !`,
                color: "yellow",
                profile: "colour",
            },
            {
                text: `Son sexe`,
                profile: "clown",
            },
        ],
    },
    {
        statement: `Qui est Frodon ?`,
        choices: [
            {
                text: `Frodon Sacquet de la Comté, porteur de l'Anneau unique`,
                profile: "nerd",
                expected: true,
            },
            {
                text: `Aucune idée`,
                profile: "idiot",
            },
            {
                text: `Bleu. Définitivement bleu.`,
                profile: "colour",
                color: "blue",
            },
            {
                text: `C'est ce que je dis quand je sors d'un supermarché sans payer`,
                profile: "clown",
            },
        ],
    },
];

const partyhardQuestions: Step[] = [
    {
        statement: "OK EUH... QU'EST-CE QUI SE PASSE ?",
        choices: [
            {
                text: "Tu es probablement ivre.",
                profile: "nerd",
                expected: true,
            },
            {
                text: "JE SAIS PAAAAAAAAAS",
                profile: "idiot",
                expected: true,
            },
            {
                text: "DU JAUNE ! DU BLEU ! DU ROUGE ! WHOOOOOOOP !",
                profile: "colour",
                expected: true,
            },
            {
                text: "Un quizz",
                profile: "clown",
                expected: true,
            },
        ],
    },
];

const chickenQuestions: Step[] = [
    {
        statement: "Bwoooo bwtrlllrl ?",
        choices: [
            {
                text: "Bwot",
                profile: "chicken",
                expected: true,
            },
            {
                text: "Cooot cot cot",
                profile: "chicken",
                expected: true,
            },
            {
                text: "Bodoaaaaaaa bot bwot",
                profile: "chicken",
                expected: true,
            },
            {
                text: "Bwoooooot cot bwwrlllll",
                profile: "chicken",
                expected: true,
            },
        ],
    },
    {
        statement: "Coooot cot bwooooooot ?",
        choices: [
            {
                text: "Bwrollrllloooowll",
                profile: "chicken",
                expected: true,
            },
            {
                text: "Bwot bwot",
                profile: "chicken",
                expected: true,
            },
            {
                text: "BWAARLLALLWLL BWLLLLLLLWOAAAA !",
                profile: "chicken",
                expected: true,
            },
            {
                text: "Cot... bwoa ?",
                profile: "chicken",
                expected: true,
            },
        ],
    },
    {
        statement: "Brwllll bwooot cot ?",
        choices: [
            {
                text: "Bwppaaaaaaa",
                profile: "chicken",
                expected: true,
            },
            {
                text: "Cot bwrlllll bwoaaaaa",
                profile: "chicken",
                expected: true,
            },
            {
                text: "Cot cod bwoo ...",
                profile: "chicken",
                expected: true,
            },
            {
                text: "Bwwrlllll bwoooooaaaa",
                profile: "chicken",
                expected: true,
            },
        ],
    },
];

export const modes: Dictionnary<Mode> = {
    gandalf: {
        image: "gandalf",
        home: {
            title: `Bienvenue sur le ${gandalf("quizz")} !`,
            description: `Le principe est très simple : il te suffit de répondre correctement aux ${gandalf(
                "questions"
            )} qui te seront posées et tu seras reconnu comme un vrai vétéran de la Terre du Milieu !`,
            button: `Clique sur Gandalf pour commencer`,
        },
        quizz: {
            title: `C'est parti pour le ${gandalf("quizz")} !`,
            steps: gandalfQuestions,
        },
        end: {
            title: `Le ${gandalf("quizz")} est terminé !`,
            description: "Allez on retente ! Clique sur Gandalf !",
        },
    },
    partyhard: {
        image: "partyhard",
        home: {
            title: "PARTY HAAAAAAARD",
            description:
                "Qu'est-ce que tu veux poser comme question là-dessus ?",
            button: "JE SAIS PAS, GO !",
        },
        quizz: {
            title: "OUAAAAAAAAAAAAAAAAAAAIS",
            steps: partyhardQuestions,
        },
        end: {
            title: "PUTAIN C'ETAIT GENIAAAAL",
            description: "ON RECOMMENCE TOUT DE SUITE",
        },
    },
    chicken: {
        image: "chicken",
        home: {
            title: "Brwlwwlwlllwlwllwlwl",
            description: "Cot cot cot",
            button: "BWOUAAAAAAAT",
        },
        quizz: {
            title: "Brwllrlllr bwwlllrllll !",
            steps: chickenQuestions,
        },
        end: {
            title: "Coaaaat cooot",
            description: "Bwoot ?",
        },
    },
};

export const scoreResult: Map<number, string> = new Map([
    [100, "Eh ben t'as tout bon. T'es fier hein ?"],
    [75, "Il y a moyen de faire pire je suppose."],
    [50, "Ouais c'est vraiment pas terrible."],
    [25, "Tu te fous de ma gueule ?"],
    [0, "J'y crois pas t'es vraiment con en fait ?"],
    [-999, "Non mais bon si t'essaies mêmes pas..."],
]);

export const profileResult: {
    [key in Profile]: Presentation;
} = {
    idiot: {
        title: `Le Parfait Imbécile`,
        description: `T'es vraiment le dernier des cons toi ! C'est pas comme si j'avais litérallement tracé le putain de chemin vers le score parfait en mettant des réponses EVIDENTES. Mais non, tu étais manifestement obligé de rappeler au monde entier que ton QI tient en un seul chiffre.`,
    },
    colour: {
        title: "L'excité des Couleurs",
        description: `Bon, je crois que t'as un problème avec les couleurs toi... C'est vrai que c'est joli toutes ces petites options colorées mais l'essence du test c'était pas vraiment de recréer un arc-en-ciel. Allez, "A" pour effort.`,
    },
    clown: {
        title: "Le Clown",
        description: `Mesdames et messieurs, nous avons la chance d'avoir parmi nous le plus grand numéro de cirque que le monde ait jamais connu ! Quel sera son prochain numéro ? Peut-être va-t-il enfin réussir quelque chose dans sa pathétique existence plutôt que de pourir celle des autres avec son humour à la con ?`,
    },
    nerd: {
        title: "Le Nerd",
        description: `Je te connais pas mais tu dois quand même être quelqu'un de vachement chiant pour tout prendre autant au sérieux. Tu saurais chier le balai que t'as dans le cul et détendre un peu l'atmosphère ?`,
    },
    chicken: {
        title: "What the fuck ?",
        description: `Je commence à me poser des questions sur ta santé mentale...`,
    },
};
