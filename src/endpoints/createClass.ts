import { Request, Response } from "express"
import { connection } from "../data/connection"
import { Turma } from "../types/class"

export const createClass = async (req: Request, res: Response) => {
    let errorCode = 400
    try {
        const { nome, module } = req.body

        if(!nome || !module) {
            errorCode = 422
            throw new Error("Informações ausentes, preencha os campos necessários.")
        }

        if (module > 6){
            errorCode = 422
            throw new Error('Existem apenas 6 módulos, indique um módulo válido.')
        }

        if(typeof nome !== 'string'){
            errorCode = 422 
            throw new Error('Parâmetro inválido. O campo "nome" deve ser uma string.')
        }

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