import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';

const UserSchema = new mongoose.Schema({
    userId: {
        type: String,
        default: uuidv4,
    },
    firstName: { //keresztnév
        type: String,
        required: false,
        min: 2,
        max: 50,
    },
    familyName: { //vezetéknév
        type: String,
        required: false,
        min: 2,
        max: 50,
    },
    email: { //Email
        type: String,
        required: true,
        max: 50,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        min: 5,
    },
    image: String, //profilkép
    gender: String, //nem
    nationality: String, //állampolgárság
    birthPlace: String, //születési hely
    birthDate: Date, //születési idő
    IDCardNumber: String, //Személyigazolvány szám
    validityDateOfIDCard: Date, //Személyigazolvány érvényessége
    drivingLicenceNumber: String, //Jogosítvány száma
    drivingLicenceCategories: String, //Jogosítvány kategóriák
    validityDateOfDrivingLicence: Date, //Jogosítvány érvényessége
    dateOfMedicalVisit: String, //Orvosi alkalmassági érvényessége
    medicalVisitStatus: String, //Orvosi alkalmassági állapota
    phoneNumber: Number, //Telefonszám
    country: String, //Ország
    postcode: Number, //Irányítószám
    city: String, //Település
    nameOfPublicArea: String, //Közterület neve
    typeOfPublicArea: String, //Közterület jellege
    houseNumber: Number, //Házszám
    dateOfRegistration: String, //Regisztráció dátuma
    startDateOfContract: String, //Szerződés kezdete
    endDateOfContract: String, //Szerződés vége
    position: String, //Pozíció/Beosztás
    lineManager: String, //felettes   //TODO: how to do User?
    healthProblem: String, //Egészségügyi problémák
    //createdAt: String, //TODO:iődsor?
    //voicePath: String, //TODO: idősor?
}, { timestamps: true } );

const User = mongoose.model("User", UserSchema);
export default User;