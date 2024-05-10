
// Les types conditionnels dans TypeScript permettent de définir un type 
// en fonction d'une condition. C'est une fonctionnalité avancée et peut être utilisée 
// pour créer des types de retour dynamiques basés sur des entrées.

type ConditionalType<T> = T extends string ? string[] : T;

function process<T>(input: T): ConditionalType<T> {
    if (typeof input === 'string') {
        return [input, input.toUpperCase()] as ConditionalType<T>;
    }
    return input as ConditionalType<T>;
}

const processedString = process("hello");  // Type est string[]
const processedNumber = process(123);      // Type est number


//================================================================================

// Pour les fonctions qui doivent renvoyer des types différents basés sur leurs arguments, 
// vous pouvez utiliser des signatures de fonction surchargées ou des types conditionnels.
function getValue(key: string): string;
function getValue(key: number): number;
function getValue(key: any): any {
    if (typeof key === 'string') {
        return `Value for ${key}`;
    } else if (typeof key === 'number') {
        return key * 10;
    }
}

const stringValue = getValue("myKey");  // Renvoie une string
const numberValue = getValue(42);       // Renvoie un number



//================================================================================

// Les unions de types vous permettent de dire qu'une valeur peut être d'un certain nombre de types.

function formatInput(input: string | number) {
    if (typeof input === 'string') {
        return input.toUpperCase();
    }
    return input.toFixed(2);
}


//================================================================================

// Les types génériques permettent de créer des composants qui peuvent travailler avec différents 
// types de données plutôt qu'un seul type de données. Cela vous permet de capturer le type donné 
// lors de la création ou de l'utilisation de l'instance du composant.

function identity<T>(arg: T): T {
    return arg;
}

let outputString = identity<string>("myString");
let outputNumber = identity<number>(100);


//================================================================================
