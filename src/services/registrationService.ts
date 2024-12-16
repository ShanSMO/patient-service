import { MongoClient } from "mongodb";
import { Patient } from "../modals/patient";
import * as dotevnv from "dotenv";

dotevnv.config()

const connectionUri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASS}@cccw-cluster.r4djh.mongodb.net/?retryWrites=true&w=majority&appName=CCCW-cluster`;
const client = new MongoClient(connectionUri);
const dbName = process.env.DB_NAME;
const collectionName = "patients";
const database = client.db(dbName);
const collection = database.collection(collectionName);

export const registerPatient = async (patient: Patient) => {
    await client.connect();
    const obj = await collection.insertOne(patient);
    console.log(`Added patient - ${patient.name}`, obj.insertedId)
}

export const getAllPatients = async () => {
    await client.connect();
    const patients = await collection.find().toArray();
    return patients;
}

export const getPatient = async (patient: Patient) => {
    const query = {name: patient.name, nic: patient.nic};
    await client.connect();
    const patients = await collection.findOne(query);
    return patients;
}