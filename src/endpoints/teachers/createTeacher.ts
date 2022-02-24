import { Request, Response } from "express"
import { connection } from "../../data/connection"
import { Docente } from "../../types/class"

export const createTeacher = async (req: Request, res: Response): Promise<void> => {
    let errorCode = 400
    try {
        const { nome, email, data_nasc, turma_id, especialidades } = req.body

        if (!nome || !email || !data_nasc || !turma_id || !especialidades) {
            errorCode = 422
            throw new Error("Informações ausentes, preencha os campos necessários!")
        }

        const id = Date.now().toString()
        const date = data_nasc.split('/')
        const formatDate = new Date(`${date[2]}-${date[1]}-${date[0]}`)
        const newProfessor = new Docente(id, nome, email, formatDate, turma_id, especialidades)

        await connection('Docente')
            .insert({
                id: newProfessor.getId(),
                nome: newProfessor.getNome(),
                email: newProfessor.getEmail(),
                data_nasc: formatDate,
                turma_id: newProfessor.getTurmaId(),
            })

        const arrayEspecialidades = newProfessor.getEspecialidades()

        for (let especialidade of arrayEspecialidades) {
            const idEspecialidade = Date.now().toString()
            const idEspecDocente = Date.now().toString()

            await connection('Especialidade')
                .insert({
                    id: idEspecialidade,
                    nome: especialidade
                })

            await connection('Docente_Especialidade')
                .insert({
                    id: idEspecDocente,
                    docente_id: newProfessor.getId(),
                    especialidade_id: idEspecialidade
                })
        }

        res.status(201).send({ message: "Professor Criada" })
    } catch (err: any) {
        res.status(errorCode).send({ message: err.message || err.sqlmessage })
    }
} 