import { Request, Response } from "express"
import { connection } from "../data/connection"
import { Docente } from "../types/class"

export const createProfessor = async (req: Request, res: Response) => {
    let errorCode = 400
    try {
        const { nome, email, data_nasc, turma_id, especialidades } = req.body
        const id = Date.now().toString()

        const newProfessor = new Docente(id, nome, email, data_nasc, turma_id, especialidades)

        await connection('Docente')
        .insert({
            id: newProfessor.getId(),
            nome: newProfessor.getNome(),
            email: newProfessor.getEmail(),
            data_nasc: newProfessor.getDataNasc(),
            turma_id: newProfessor.getTurmaId(),
            especialidades: newProfessor.getEspecialidades()
        })

        res.status(201).send({ message: "Professor Criada"})
    } catch(err: any) {
        res.status(errorCode).send({message: err.message || err.sqlmessage})
    }
 } 