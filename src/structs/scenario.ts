import { UncompressedHeader } from "./structs/uncompressedHeader";
import { section } from "./types";

export class Scenario {
    uncompressedHeader: any;
    constructor() {
        this.uncompressedHeader = section(UncompressedHeader);
    }
}



class A {
    constructor(public arg1: any, public arg2: any) {
        // Votre code ici
    }
}

function createA(arg1: any, arg2: any): A {
    return new A(arg1, arg2);
}

class B {
    myMember: A;

    constructor(arg1: any, arg2: any) {
        this.myMember = createA(arg1, arg2);
    }
}
