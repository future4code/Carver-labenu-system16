import { AddressInfo } from "net";
import cors from 'cors'
import express from "express";
import { createClass } from "./endpoints/createClass";
import { createStudent } from "./endpoints/createStudent";

const app = express();
app.use(express.json());
app.use(cors());

app.post('/class', createClass)
app.post('/estudante', createStudent)


const server = app.listen(process.env.PORT || 3003, () => {
    if (server) {
        const address = server.address() as AddressInfo;
        console.log(`Server is running in http://localhost:${address.port}`);
    } else {
        console.error(`Failure upon starting server.`);
    }
});;