import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import nodemailer from "nodemailer";

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

export const requestPasswordReset = async (req, res, next) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User doesn't exist" });

        const secret = process.env.JWT_SECRET + user.password;
        const token = jwt.sign({ id: user._id, email: user.email }, secret, { expiresIn: '1h' });

        const resetURL = `http://localhost:5173/auth/resetPassword?id=${user._id}&token=${token}`;

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'encsi2346',
                pass: 'sqci yomu mouz zrfd',
            },
        });

        const mailOptions = {
            to: user.email,
            from: 'encsi2346',
            subject: 'Password Reset Request',
            text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
      Please click on the following link, or paste this into your browser to complete the process:\n\n
      ${resetURL}\n\n
      If you did not request this, please ignore this email and your password will remain unchanged.\n`,
        };

        await transporter.sendMail(mailOptions).catch(error => {
            console.error('Error sending email:', error);
            throw new Error('Email send failed');
        });

        res.status(200).json({ message: 'Password reset link sent' });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};

export const resetPassword = async (req, res, next) => {
    const { id, token } = req.query;
    const { password } = req.body;

    try {
        console.log('id', req.query);
        const user = await User.findOne({ _id: id });
        if (!user) {
            return res.status(400).json({ message: "User not exists!" });
        }

        const secret = process.env.JWT_SECRET + user.password;



        const verify = jwt.verify(token, secret);
        const encryptedPassword = await bcrypt.hash(password, 10);
        await User.updateOne(
            {
                _id: id,
            },
            {
                $set: {
                    password: encryptedPassword,
                },
            }
        );


        await user.save();

        res.status(200).json({ message: 'Password has been reset' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};