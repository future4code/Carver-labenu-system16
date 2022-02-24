export class Turma {
    constructor(
        private id: string,
        private nome: string,
        private modulo: number
    ) { }

    public getId(): string {
        return this.id
    }

    public getNome(): string {
        return this.nome
    }

    public getModulo(): number {
        return this.modulo
    }
}

export abstract class Usuario {
    constructor(
        protected id: string,
        protected nome: string,
        protected email: string,
        protected data_nasc: Date,
        protected turma_id: string
    ) { }

    public getId(): string {
        return this.id
    }

    public getNome(): string {
        return this.nome
    }

    public getEmail(): string {
        return this.email
    }

    public getDataNasc(): Date {
        return this.data_nasc
    }

    public getTurmaId(): string {
        return this.turma_id
    }
}

export class Estudante extends Usuario {
    constructor(
        id: string,
        nome: string,
        email: string,
        data_nasc: Date,
        turma_id: string,
        protected hobbies: string[]
    ) {
        super(id, nome, email, data_nasc, turma_id)
    }

    public getHobbies(): string[] {
        return this.hobbies
    }
}

export class Docente extends Usuario {
    constructor(
        id: string,
        nome: string,
        email: string,
        data_nasc: Date,
        turma_id: string,
        protected especialidades: string[]
    ) {
        super(id, nome, email, data_nasc, turma_id)
    }

    public getEspecialidades(): string[] {
        return this.especialidades
    }
}