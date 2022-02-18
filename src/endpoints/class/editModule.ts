import { Request, Response } from "express"
import { connection } from "../../data/connection"

export const editModule = async (req: Request, res: Response): Promise<void> => {
    let errorCode = 400
    try {
        const id = req.params.id
        const module = req.body.module

        if (!module) {
            errorCode = 422
            throw new Error('Ausência de parâmetro, preencha o campo necessário.')
        }

        if (module > 6) {
            errorCode = 422
            throw new Error('Existem apenas 6 módulos, indique um módulo válido.')
        }

        const [checkId] = await connection('Turma')
            .where('id', id)

        if (!checkId) {
            errorCode = 404
            throw new Error('Id inválido, turma não encontrada')
        }

        await connection('Turma')
            .update({
                modulo: module
            })
            .where('id', id)

        res.status(200).send({ message: 'Módulo alterado!' })

    } catch (err: any) {
        res.status(errorCode).send({ message: err.message || err.sqlmessage })
    }

}