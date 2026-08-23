export type NestingLevel = {
    id: string;
    num: number;
    name: string;
    short: string;
    color: string;
    contenu: string;
    api: string;
    transformation: string;
};

/** Ordered from the innermost doll (the raw information) to the outermost envelope. */
export const LEVELS: NestingLevel[] = [
    {
        id: 'humain',
        num: 1,
        name: 'Humain',
        short: 'Humain',
        color: '#ebdbb2',
        contenu: 'L’intention de cliquer pour envoyer une note',
        api: 'Le doigt sur le bouton de la souris',
        transformation: 'L’intention devient un mouvement physique'
    },
    {
        id: 'hardware',
        num: 2,
        name: 'Matériel',
        short: 'Matériel',
        color: '#fe8019',
        contenu: 'Le mouvement physique',
        api: 'Le capteur mécanique de la souris',
        transformation: 'Le mouvement est encapsulé en impulsion électrique (5 V)'
    },
    {
        id: 'os',
        num: 3,
        name: 'Système d’Exploitation',
        short: 'OS',
        color: '#fb4934',
        contenu: 'L’impulsion électrique',
        api: 'Le port USB / pilote (driver)',
        transformation: 'L’électricité est encapsulée dans un « event » système standardisé'
    },
    {
        id: 'navigateur',
        num: 4,
        name: 'Navigateur (DOM)',
        short: 'DOM',
        color: '#d3869b',
        contenu: 'L’event système',
        api: 'L’API Web (DOM)',
        transformation: 'L’event système est encapsulé dans un objet JavaScript (onClick)'
    },
    {
        id: 'js',
        num: 5,
        name: 'Logique Applicative',
        short: 'JS',
        color: '#fabd2f',
        contenu: 'L’objet JS (l’event)',
        api: 'La fonction fetch()',
        transformation: 'L’objet JS est encapsulé dans une requête HTTP (texte formaté)'
    },
    {
        id: 'tcp',
        num: 6,
        name: 'Transport (TCP)',
        short: 'TCP',
        color: '#b8bb26',
        contenu: 'La requête HTTP',
        api: 'Le port (ex. 443)',
        transformation: 'La requête HTTP est encapsulée dans un segment TCP'
    },
    {
        id: 'ip',
        num: 7,
        name: 'Réseau (IP)',
        short: 'IP',
        color: '#8ec07c',
        contenu: 'Le segment TCP',
        api: 'L’adresse IP source / destination',
        transformation: 'Le segment TCP est encapsulé dans un paquet IP'
    },
    {
        id: 'ethernet',
        num: 8,
        name: 'Physique Réseau (Ethernet)',
        short: 'Ethernet',
        color: '#83a598',
        contenu: 'Le paquet IP',
        api: 'L’adresse MAC de la carte réseau',
        transformation:
            'Le paquet IP est encapsulé dans une trame réseau (signal électrique / ondes radio)'
    }
];
