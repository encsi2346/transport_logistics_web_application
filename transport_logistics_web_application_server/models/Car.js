import mongoose from 'mongoose';
import CarType from "./CarType.js";
import {v4 as uuidv4} from "uuid";
import CarTypeOfTransportation from "./CarTypeOfTransportation.js";

const carSchema = new mongoose.Schema({
    carId: {
        type: String,
        default: uuidv4,
    },
    name: String,
    type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CarType", //kiválasztott típus
    },
    licencePlate: String, //rendszám
    numberOfRegistrationLicence: String, //forgalmi engedély száma
    chassisNumber: String, //alvázszám
    yearOfProduction: Date, //gyártási év //TODO: date vagy int?
    dateOfFirstRegistration: Date, //első nyilvántartásba vétel
    //images: [String], //képek
    dateOfDatabaseRegistration: Date, //adatbázis regisztráció dátuma
    dateOfLastTechnicalExamination: Date, //legutóbbi műszaki vizsga időpontja
    dateOfLastService: Date, //legutóbbi szervíz időpontja
    totalDrivenKm: Number, //összes megtett km
    totalTransport: Number, //összes végrehajtott szállítás
    image: String, //kép
});

const Car = mongoose.model('Car', carSchema);

// Post hook to update the countOfCars when a car is added
carSchema.post('save', async function() {
    if (this.type) {
        try {
            const carType = await CarType.findById(this.type);
            const carTypeOfTransportation = carType ? carType.carTypeOfTransportationId : null;
            if (carTypeOfTransportation) {
                await CarTypeOfTransportation.findByIdAndUpdate(
                    carTypeOfTransportation,
                    { $inc: { countOfCars: 1 } } // Increment the countOfCars by 1
                );
            }
        } catch (error) {
            console.error('Error updating countOfCars:', error);
        }
    }
});

// Post hook to update the countOfCars when a car is deleted
carSchema.post('remove', async function() {
    if (this.type) {
        try {
            const carType = await CarType.findById(this.type);
            const carTypeOfTransportation = carType ? carType.carTypeOfTransportationId : null;
            if (carTypeOfTransportation) {
                await CarTypeOfTransportation.findByIdAndUpdate(
                    carTypeOfTransportation,
                    { $inc: { countOfCars: -1 } } // Decrement the countOfCars by 1
                );
            }
        } catch (error) {
            console.error('Error updating countOfCars after delete:', error);
        }
    }
});

// Pre hook to update countOfCars when car type changes
carSchema.pre('save', async function(next) {
    if (this.isModified('type')) {
        try {
            // Decrease the count for the old type
            const oldCarType = await CarType.findById(this._previousTypeId);
            const oldCarTypeOfTransportation = oldCarType ? oldCarType.carTypeOfTransportationId : null;
            if (oldCarTypeOfTransportation) {
                await CarTypeOfTransportation.findByIdAndUpdate(
                    oldCarTypeOfTransportation,
                    { $inc: { countOfCars: -1 } } // Decrement for the old type
                );
            }

            // Increment the count for the new type
            const newCarType = await CarType.findById(this.type);
            const newCarTypeOfTransportation = newCarType ? newCarType.carTypeOfTransportationId : null;
            if (newCarTypeOfTransportation) {
                await CarTypeOfTransportation.findByIdAndUpdate(
                    newCarTypeOfTransportation,
                    { $inc: { countOfCars: 1 } } // Increment for the new type
                );
            }
        } catch (error) {
            console.error('Error updating countOfCars on type change:', error);
        }
    }
    next();
});

// Post hook to update the countOfCars in CarType when a car is added
carSchema.post('save', async function() {
    if (this.type) {
        try {
            const carType = await CarType.findById(this.type);
            if (carType) {
                await CarType.findByIdAndUpdate(
                    carType._id,
                    { $inc: { countOfCars: 1 } } // Increment the countOfCars by 1
                );
            }
        } catch (error) {
            console.error('Error updating CarType countOfCars:', error);
        }
    }
});

// Post hook to update the countOfCars in CarType when a car is deleted
carSchema.post('remove', async function() {
    if (this.type) {
        try {
            const carType = await CarType.findById(this.type);
            if (carType) {
                await CarType.findByIdAndUpdate(
                    carType._id,
                    { $inc: { countOfCars: -1 } } // Decrement the countOfCars by 1
                );
            }
        } catch (error) {
            console.error('Error updating CarType countOfCars after delete:', error);
        }
    }
});

// Pre hook to update countOfCars when car type changes
carSchema.pre('save', async function(next) {
    if (this.isModified('type')) {
        try {
            // Decrease the count for the old car type
            const oldCarType = await CarType.findById(this._previousTypeId);
            if (oldCarType) {
                await CarType.findByIdAndUpdate(
                    oldCarType._id,
                    { $inc: { countOfCars: -1 } } // Decrement the old car type's count
                );
            }

            // Increment the count for the new car type
            const newCarType = await CarType.findById(this.type);
            if (newCarType) {
                await CarType.findByIdAndUpdate(
                    newCarType._id,
                    { $inc: { countOfCars: 1 } } // Increment the new car type's count
                );
            }
        } catch (error) {
            console.error('Error updating countOfCars on car type change:', error);
        }
    }
    next();
});

export default Car;