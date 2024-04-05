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
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import {registration} from "./controllers/auth.js";
import swaggerUI from 'swagger-ui-express';
import {swaggerSpec} from './swagger.js';
import bookRoutes from "./routes/books.js";

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

/*FILE STORAGE*/
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets");
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage });

/*ROUTES WITH FILES*/
app.post("/auth/register", upload.single("picture"), registration);
//app.post("/posts", verifyToken, upload.single("picture"), createPost);

/*ROUTES*/
app.use(authRoutes);
app.use(userRoutes);
app.use(bookRoutes);
//app.use("/dashboard", dashboardRoutes);
//app.use("/transportations", transportationRoutes);
//app.use("/requests", requestRoutes);
//app.use("/car-types", carTypeRoutes);
//app.use("/products-categories", productCategoryRoutes);

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


/*MANGOOSE SETUP*/
const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
    /*ADD DATA ONE TIME*/
    //User.insertMany(users);
    //Post.insertMany(posts);
}).catch((error) => console.log(`${error} did not connect`));