import express, {Request, Response} from "express";
import {StatusCodes} from "http-status-codes"
import { getAllPatients, getPatient, registerPatient } from "./services/registrationService";
import { Patient } from "./modals/patient";

export const router = express.Router()
const timeLog = (_req: any, _res: any, next: () => void) => {
    console.log('Time: ', Date.now())
    next()
  }
router.use(timeLog)

router.get('/all', (req, res) => {
    getAllPatients().then((data) => {
        console.log(data);
        res.status(StatusCodes.CREATED).json({message: 'Patient registered successfully !', data: data})
    }).catch((error) => {
        console.log("Error while fetching patient list", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: 'Error while fetching patient list'})
    });
})

router.get('/', (req, res) => {
    const patient: Patient = {
        name: req.query.name as string,
        nic: req.query.nic as string,
    }
    getPatient(patient).then((data) => {
        res.status(StatusCodes.CREATED).json({message: 'Patient registered successfully !', data: data})
    }).catch((error) => {
        console.log("Error while fetching patient list", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: 'Error while fetching patient list'})
    });
})

router.post("/register", (req : Request, res : Response) => {
    try {
        registerPatient(req.body).then(() => {
            res.status(StatusCodes.CREATED).json({message: 'Patient registered successfully !'})
        }).catch((error) => {
            console.log("Error while adding the patient");
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: 'Error while adding the patient'})
        });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error})
    }
});