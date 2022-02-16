import { Request, Response } from "express"
import { connection } from "../data/connection"
import { Turma } from "../types/class"

export const createClass = async (req: Request, res: Response) => {
    let errorCode = 400
    try {
        const { nome, module } = req.body
        const id = Date.now().toString()

        const newClass = new Turma(id, nome, module)

        await connection('Turma')
        .insert({
            id: newClass.getId(),
            nome: newClass.getNome(),
            modulo: newClass.getModulo()
        })

        res.status(201).send({ message: "Turma Criada"})
    } catch(err: any) {
        res.status(errorCode).send({message: err.message || err.sqlmessage})
    }
 } 