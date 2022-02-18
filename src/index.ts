import { AddressInfo } from "net";
import cors from 'cors'
import express from "express";
import { createClass } from "./endpoints/class/createClass";
import { getClassActive } from "./endpoints/class/getClassActive";
import { createStudent } from "./endpoints/students/createStudent";
import { createTeacher } from "./endpoints/teachers/createTeacher";
import { editStudent } from "./endpoints/students/editStudent";
import { editTeacher } from "./endpoints/teachers/editTeacher";
import { editModule } from "./endpoints/class/editModule";
import { getStudentByName } from "./endpoints/students/getStudentByName";
import { getAllTeachers } from "./endpoints/teachers/getAllTeachers";

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