import { AddressInfo } from "net";
import cors from 'cors'
import express from "express";
import { createClass } from "./endpoints/createClass";
import { getClassActive } from "./endpoints/getClassActive";
import { createStudent } from "./endpoints/createStudent";
import { createTeacher } from "./endpoints/createTeacher";
import { editStudent } from "./endpoints/editStudent";
import { editTeacher } from "./endpoints/editTeacher";
import { editModule } from "./endpoints/editModule";
import { getStudentByName } from "./endpoints/getStudentByName";
import { getAllTeachers } from "./endpoints/getAllTeachers";


const app = express();
app.use(express.json());
app.use(cors());

app.get('/class', getClassActive)
app.post('/class', createClass)
app.put('/class/:id', editModule)


app.get('/estudante', getStudentByName)
app.post('/estudante', createStudent)
app.put('/estudante/:id', editStudent)


app.get('/docente', getAllTeachers)
app.post('/docente', createTeacher)
app.put("/docente/:id", editTeacher)

const server = app.listen(process.env.PORT || 3003, () => {
    if (server) {
        const address = server.address() as AddressInfo;
        console.log(`Server is running in http://localhost:${address.port}`);
    } else {
        console.error(`Failure upon starting server.`);
    }
});;