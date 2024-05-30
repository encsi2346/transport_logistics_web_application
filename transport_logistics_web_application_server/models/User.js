import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    userId: String,
    firstName: {
        type: String,
        required: false,
        min: 2,
        max: 50,
    },
    familyName: {
        type: String,
        required: false,
        min: 2,
        max: 50,
    },
    email: {
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
    picturePath: {
        type: String,
        default: "",
    },
    gender: String,
    nationality: String,
    birthPlace: String,
    birthDate: String,
    IDCardNumber: String,
    validityDateOfIDCard: String,
    drivingLicenceNumber: String,
    drivingLicenceCategories: String,
    validityDateOfDrivingLicence: String,
    dateOfMedicalVisit: String,
    validityDateOfMedicalVisit: String,
    phoneNumber: Number,
    country: String,
    postcode: Number,
    city: String,
    nameOfPublicArea: String,
    typeOfPublicArea: String,
    houseNumber: String,
    dateOfRegistration: String,
    startDateOfContract: String,
    endDateOfContract: String,
    position: String,
    lineManager: String,
    healthProblem: String,
    createdAt: String,
    voicePath: String,
}, { timestamps: true } );

const User = mongoose.model("User", UserSchema);
export default User;