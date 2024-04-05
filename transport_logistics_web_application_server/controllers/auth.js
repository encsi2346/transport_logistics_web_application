import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/*REGISTER USER*/
export const registration = async (req, res) => {
    try {
        const {
           /* firstName,
            familyName,*/
            email,
            password,
         /*   picturePath,
            gender,
            nationality,
            birthPlace,
            birthDate,
            IDCardNumber,
            validityDateOfIDCard,
            drivingLicenceNumber,
            drivingLicenceCategories,
            dateOfMedicalVisit,
            validityDateOfDrivingLicence,
            validityDateOfMedicalVisit,
            phoneNumber,
            country,
            postcode,
            city,
            nameOfPublicArea,
            typeOfPublicArea,
            houseNumber,
            dateOfRegistration,
            startDateOfContract,
            endDateOfContract,
            position,
            lineManager,
            healthProblem,*/
        } = req.body;

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
          /*  firstName,
            familyName,*/
            email,
            password: passwordHash,
         /*   picturePath,
            gender,
            nationality,
            birthPlace,
            birthDate,
            IDCardNumber,
            validityDateOfIDCard,
            drivingLicenceNumber,
            drivingLicenceCategories,
            dateOfMedicalVisit,
            validityDateOfDrivingLicence,
            validityDateOfMedicalVisit,
            phoneNumber,
            country,
            postcode,
            city,
            nameOfPublicArea,
            typeOfPublicArea,
            houseNumber,
            dateOfRegistration,
            startDateOfContract,
            endDateOfContract,
            position,
            lineManager,
            healthProblem,*/
        })
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
}

/*LOGGING IN*/
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) return res.status(400).json({ msg: "User do not exist."});

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials."});

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        delete user.password;
        res.status(200).json({ token, user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}