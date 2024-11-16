import User from "../models/User.js";
import ImageDetails from "../models/ImageDetails.js";

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
            medicalVisitStatus,
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
            //createdAt,
            //voicePath,
        } = req.body;
        const newUser = new User({
            userId,
            firstName,
            familyName,
            email,
            password,
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
            medicalVisitStatus,
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
            //createdAt,
            //voicePath,
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
            user.medicalVisitStatus = req.body.medicalVisitStatus;
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
            //user.createdAt = req.body.createdAt;
            //user.voicePath = req.body.voicePath;
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

export const searchUsers = async (req, res) => {
    const { firstName, position } = req.query;

    const query = {};
    if (firstName) query.firstName = { $regex: firstName, $options: 'i' };
    if (position) query.position = { $regex: position, $options: 'i' };

    try {
        const users = await User.find(query).limit(1000);
        res.json({ content: users });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

export const getUserImage = async (req, res) => {
    /*const { userId } = req.query;
    try {
        const images = await User.find({ userId: userId });
        res.status(200).json({ status: "ok", data: images });
    } catch (error) {
        res.json({ status: error });
    }*/
    const { userId } = req.query;
    try {
        const user = await User.findOne({ userId });
        if (user && user.image) {
            res.status(200).json({ status: "ok", image: user.image });
        } else {
            res.status(404).json({ status: "error", message: "Image not found for this user." });
        }
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};

export const uploadUserImage = async (req, res) => {
    /*const { image, userId } = req.body;

    try {
        // Check if an image with this userId already exists
        const existingImage = await User.findOne({ userId: userId });

        if (existingImage) {
            // Update the existing image
            existingImage.image = image;
            await existingImage.save();
            res.status(200).json({ msg: "Image updated successfully!" });
        } else {
            // Create a new image entry if it doesn't exist
            const newImage = await User.create({ image, userId });
            await newImage.save();
            res.status(201).json({ msg: "New image uploaded successfully!" });
        }
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }*/
    const { image, userId } = req.body;

    try {
        const user = await User.findOne({ userId });

        if (user) {
            // Update the existing user's image
            user.image = image;
            await user.save();
            res.status(200).json({ msg: "Image updated successfully!" });
        } else {
            res.status(404).json({ status: "error", message: "User not found." });
        }
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};

export const removeUserImage = async (req, res) => {
    /*const { userId } = req.query; // Extract userId from query parameters

    try {
        // Find and delete the image by userId
        const deletedImage = await User.findOneAndDelete({ userId: userId });

        if (deletedImage) {
            res.status(200).json({ msg: "Image deleted successfully!" });
        } else {
            res.status(404).json({ msg: "Image not found for this user." });
        }
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }*/
    const { userId } = req.query;

    try {
        const user = await User.findOne({ userId });

        if (user && user.image) {
            // Remove the user's image
            user.image = null; // Set image to null
            await user.save();
            res.status(200).json({ msg: "Image removed successfully!" });
        } else {
            res.status(404).json({ status: "error", message: "Image not found for this user." });
        }
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};
