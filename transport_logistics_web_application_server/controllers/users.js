import User from "../models/User.js";

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

export const createUser = async (req, res) => {
    console.log('req', req);
    try {
        const {
            userId,
            firstName,
            familyName,
            email,
            password,
            picturePath,
            gender,
            nationality,
            birthPlace,
            birthDate,
            IDCardNumber,
            validityDateOfIDCard,
            drivingLicenceNumber,
            drivingLicenceCategories,
            validityDateOfDrivingLicence,
            dateOfMedicalVisit,
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
            healthProblem,
            createdAt,
            voicePath,
        } = req.body;
        const newUser = new User({
            userId,
            firstName,
            familyName,
            email,
            password,
            picturePath,
            gender,
            nationality,
            birthPlace,
            birthDate,
            IDCardNumber,
            validityDateOfIDCard,
            drivingLicenceNumber,
            drivingLicenceCategories,
            validityDateOfDrivingLicence,
            dateOfMedicalVisit,
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
            healthProblem,
            createdAt,
            voicePath,
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (req.body.userId) {
            user.userId = req.body.userId;
            user.firstName = req.body.firstName;
            user.familyName = req.body.familyName;
            user.email = req.body.email;
            user.password = req.body.password;
            user.picturePath = req.body.picturePath;
            user.gender = req.body.gender;
            user.nationality = req.body.nationality;
            user.birthPlace = req.body.birthPlace;
            user.birthDate = req.body.birthDate;
            user.IDCardNumber = req.body.IDCardNumber;
            user.validityDateOfIDCard = req.body.validityDateOfIDCard;
            user.drivingLicenceNumber = req.body.drivingLicenceNumber;
            user.drivingLicenceCategories = req.body.drivingLicenceCategories;
            user.validityDateOfDrivingLicence = req.body.validityDateOfDrivingLicence;
            user.dateOfMedicalVisit = req.body.dateOfMedicalVisit;
            user.validityDateOfMedicalVisit = req.body.validityDateOfMedicalVisit;
            user.phoneNumber = req.body.phoneNumber;
            user.country = req.body.country;
            user.postcode = req.body.postcode;
            user.city = req.body.city;
            user.nameOfPublicArea = req.body.nameOfPublicArea;
            user.typeOfPublicArea = req.body.typeOfPublicArea;
            user.houseNumber = req.body.houseNumber;
            user.dateOfRegistration = req.body.dateOfRegistration;
            user.startDateOfContract = req.body.startDateOfContract;
            user.endDateOfContract = req.body.endDateOfContract;
            user.position = req.body.position;
            user.lineManager = req.body.lineManager;
            user.healthProblem = req.body.healthProblem;
            user.createdAt = req.body.createdAt;
            user.voicePath = req.body.voicePath;
        }
        const updatedUser = await user.save();
        res.json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        await user.deleteOne();
        res.json({ message: 'User deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};