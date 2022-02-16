import {Request , Response} from "express"
import { connection } from "../data/connection"
import { Estudante } from "../types/class"

export const createStudent = async (req :Request, res: Response) => {
    let errorCode = 400
    try{
        const { nome, email, data_nasc, turma_id, hobbies } = req.body
        const id = Date.now.toString()

        const newStudent = new Estudante (id, nome, email, data_nasc, turma_id, hobbies)
        await connection ('Estudante')
        .insert({
            id: newStudent .getId(),
            nome: newStudent .getNome(),
            email: newStudent .getEmail(),
            data_nasc: newStudent.getDataNasc(),
            turma_id: newStudent.getTurmaId()
        })

        const arrayHobbies = newStudent.getHobbies()

        for (let hobbies of arrayHobbies){
            const idHobby = Date.now().toString()
            const idHobbyStudent  = Date.now().toString()


            await connection('Hobby')
            .insert({
                id : idHobby,
                nome: hobbies

            })

            await connection('Estudante_Hobby')
            .insert({
                id: idHobbyStudent,
                estudante_id: newStudent.getId(),
                hobby_id: idHobby
            })
        }

        res.status(201).send({ message: "Estudante Criado"})
    }catch (err :any){
        res.status(errorCode).send({message: err.message || err.sqlmessage})
    }
}
