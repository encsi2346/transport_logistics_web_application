import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import {registration} from "./controllers/auth.js";
import swaggerUI from 'swagger-ui-express';
import {swaggerSpec} from './utils/swagger.js';
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import bookRoutes from "./routes/productCategories.js";
import answerOptionTypeRoutes from "./routes/enums/answerOptionType.js";
import answerObjectTypeRoutes from "./routes/enums/answerObjectType.js";
import commentTypeRoutes from "./routes/enums/commentType.js";
import drivingLicenceTypeRoutes from "./routes/enums/drivingLicenceType.js";
import fuelTypeRoutes from "./routes/enums/fuelType.js";
import genderTypeRoutes from "./routes/enums/genderType.js";
import positionTypeRoutes from "./routes/enums/positionType.js";
import rolesTypeRoutes from "./routes/enums/rolesType.js";
import documentStatusRoutes from "./routes/states/documentStatus.js";
import invoiceStatusRoutes from "./routes/states/invoiceStatus.js";
import medicalVisitStatusRoutes from "./routes/states/medicalVisitStatus.js";
import orderStatusRoutes from "./routes/states/orderStatus.js";
import productStatusRoutes from "./routes/states/productStatus.js";
import requestStatusRoutes from "./routes/states/requestStatus.js";
import routeStatusRoutes from "./routes/states/routeStatus.js";
import technicalExamStatusRoutes from "./routes/states/technicalExamStatus.js";
import addressRoutes from "./routes/address.js";
import answerRoutes from "./routes/answer.js";
import calendarRoutes from "./routes/calendar.js";
import carRoutes from "./routes/car.js";
import carTypeRoutes from "./routes/carType.js";
import commentRoutes from "./routes/comment.js";
import companyRoutes from "./routes/company.js";
import dockingPointRoutes from "./routes/dockingPoint.js";
import documentRoutes from "./routes/document.js";
import invoiceRoutes from "./routes/invoice.js";
import orderRoutes from "./routes/order.js";
import productRoutes from "./routes/product.js";
import productCategoriesRoutes from "./routes/productCategories.js";
import requestRoutes from "./routes/request.js";
import resultRoutes from "./routes/result.js";
import routeRoutes from "./routes/route.js";
import selectedProductRoutes from "./routes/selectedProduct.js";
import serviceRoutes from "./routes/service.js";
import transportationRoutes from "./routes/transportation.js";
import carTypeOfTransportationRoutes from "./routes/carTypeOfTransportation.js";
import ImageDetails from "./models/ImageDetails.js";
import {updateCountOfCars, updateTransportationTypeCounts} from "./controllers/car.js";


/*CONFIGURATIONS*/
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, 'public/assets')));

const Images = mongoose.model("ImageDetails");

/*FILE STORAGE*/
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "../transport_client/src/images");
    },
    filename: function(req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + "-" + file.originalname);
    }
});
const upload = multer({ storage });

/*app.post("/api/upload-image", upload.single("image"), async (req, res) => {
    console.log(req.body);
    const imageName = req.file.filename;

    try {
        await Images.create({ image: imageName });
        res.json({ status: "ok" });
    } catch (error) {
        res.json({ status: error });
    }
});*/

/*ROUTES WITH FILES*/
app.post("/auth/register", upload.single("picture"), registration);
//app.post("/posts", verifyToken, upload.single("picture"), createPost);

/*ROUTES*/
app.use(authRoutes);
app.use(userRoutes);
app.use(bookRoutes);
app.use(answerOptionTypeRoutes);
app.use(answerObjectTypeRoutes);
app.use(commentTypeRoutes);
app.use(drivingLicenceTypeRoutes);
app.use(fuelTypeRoutes);
app.use(genderTypeRoutes);
app.use(positionTypeRoutes);
app.use(rolesTypeRoutes);
app.use(documentStatusRoutes);
app.use(invoiceStatusRoutes);
app.use(medicalVisitStatusRoutes);
app.use(orderStatusRoutes);
app.use(productStatusRoutes);
app.use(requestStatusRoutes);
app.use(routeStatusRoutes);
app.use(technicalExamStatusRoutes);
app.use(addressRoutes);
app.use(answerRoutes);
app.use(calendarRoutes);
app.use(carRoutes);
app.use(carTypeRoutes);
app.use(commentRoutes);
app.use(companyRoutes);
app.use(dockingPointRoutes);
app.use(documentRoutes);
app.use(invoiceRoutes);
app.use(orderRoutes);
app.use(productRoutes);
app.use(productCategoriesRoutes);
app.use(requestRoutes);
app.use(resultRoutes);
app.use(routeRoutes);
app.use(selectedProductRoutes);
app.use(serviceRoutes);
app.use(transportationRoutes);
app.use(carTypeOfTransportationRoutes);


app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))

/**
 * @swagger
 * /:
 *  get:
 *      summary: This api is used to check if get method is working or not
 *      description: This api is used to check if get method is working or not
 *      responses:
 *          200:
 *              description: To test Get method
 */
app.get('/', (req, resp) => {
    resp.send('Welcome to mongodb API')
})

//TODO: shared image handling functions
app.get("/api/get-image", async (req, res) => {
    const { userId } = req.query; // Extract userId from query parameters
    try {
        // Find images where the userId matches the provided userId
        const images = await ImageDetails.find({ userId: userId });
        res.status(200).json({ status: "ok", data: images });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
});

app.put("/api/update-image", async (req, res) => {
    const { image, userId } = req.body;

    try {
        // Check if an image with this userId already exists
        const existingImage = await ImageDetails.findOne({ userId: userId });

        if (existingImage) {
            // Update the existing image
            existingImage.image = image;
            await existingImage.save();
            res.status(200).json({ msg: "Image updated successfully!" });
        } else {
            // Create a new image entry if it doesn't exist
            const newImage = await ImageDetails.create({ image, userId });
            await newImage.save();
            res.status(201).json({ msg: "New image uploaded successfully!" });
        }
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
});

app.delete("/api/delete-image", async (req, res) => {
    const { userId } = req.query; // Extract userId from query parameters

    try {
        // Find and delete the image by userId
        const deletedImage = await ImageDetails.findOneAndDelete({ userId: userId });

        if (deletedImage) {
            res.status(200).json({ msg: "Image deleted successfully!" });
        } else {
            res.status(404).json({ msg: "Image not found for this user." });
        }
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
});




/*const multer = require('multer');
const fs = require('fs');
const { User, VerificationScore } = require('./VerificationScore');
const { loadModel, verifySpeaker } = require('./voiceVerificationModel');

const upload = multer({ dest: 'uploads/' });
*/
// Modell betöltése
//loadModel();

// Hangfájl feltöltése
/*app.post('/upload', upload.single('file'), async (req, res) => {
    const { name, email } = req.body;
    const filePath = req.file.path;

    let user = await User.findOne({ email });
    if (!user) {
        user = new User({ name, email, filePath });
    } else {
        user.filePath = filePath;
    }

    await user.save();
    res.status(200).json({ message: 'File uploaded successfully' });
});*/

// Hangfájl verifikálása
/*app.post('/verify', upload.single('file'), async (req, res) => {
    const tempFilePath = req.file.path;
    const users = await User.find();

    let highestScore = -1;
    let verifiedUser = null;

    for (const user of users) {
        const threshold = await calculateDynamicThreshold(user._id);
        const score = await verifySpeaker(tempFilePath, user.filePath);

        if (score > threshold && score > highestScore) {
            highestScore = score;
            verifiedUser = user;
        }
    }

    if (verifiedUser) {
        res.status(200).json({ verified: true, score: highestScore, user: verifiedUser });
    } else {
        res.status(200).json({ verified: false, score: highestScore });
    }
});*/

// Dinamikus küszöbérték számítása
/*async function calculateDynamicThreshold(userId) {
    const scores = await VerificationScore.find({ userId });
    if (scores.length > 0) {
        const avgScore = scores.reduce((sum, score) => sum + score.value, 0) / scores.length;
        return avgScore * 0.8;
    }
    return 0.5;
}*/

/*MANGOOSE SETUP*/
const PORT = process.env.PORT || 5173;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
    /*ADD DATA ONE TIME*/
    //User.insertMany(users);
    //ProductCategory.insertMany(books);

    // Run the script
    updateCountOfCars();
    updateTransportationTypeCounts();

}).catch((error) => console.log(`${error} did not connect`));