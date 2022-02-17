import { AddressInfo } from "net";
import cors from 'cors'
import express from "express";
import { createClass } from "./endpoints/createClass";
import { getClassActive } from "./endpoints/getClassActive";
import { createStudent } from "./endpoints/createStudent";
import { createProfessor } from "./endpoints/createProfessor";
import { editStudent } from "./endpoints/editStudant";
import { editProfessor } from "./endpoints/editProfessor";


const app = express();
app.use(express.json());
app.use(cors());

app.get('/class', getClassActive)
app.post('/class', createClass)
app.post('/estudante', createStudent)
app.put('/estudante/:id', editStudent)
app.post('/docente', createProfessor)
app.put("/docente/:id", editProfessor)



const server = app.listen(process.env.PORT || 3003, () => {
    if (server) {
        const address = server.address() as AddressInfo;
        console.log(`Server is running in http://localhost:${address.port}`);
    } else {
        console.error(`Failure upon starting server.`);
    }
});;