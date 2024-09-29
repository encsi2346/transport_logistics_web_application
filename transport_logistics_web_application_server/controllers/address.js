import Address from '../models/Address.js';

export const getAllAddresses = async (req, res) => {
    try {
        const addresses = await Address.find();
        res.status(200).json(addresses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAddress = async (req, res) => {
    try {
        const { id } = req.params;
        const address = await Address.findById(id);
        res.status(200).json(address);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const createAddress = async (req, res) => {
    console.log('req', req);
    try {
        const {
            addressId,
            country,
            postcode,
            city,
            nameOfPublicArea,
            typeOfPublicArea,
            houseNumber,
        } = req.body;
        const newAddress = new Address({
            addressId,
            country,
            postcode,
            city,
            nameOfPublicArea,
            typeOfPublicArea,
            houseNumber,
        });
        const savedAddress = await newAddress.save();
        res.status(201).json(savedAddress);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateAddress = async (req, res) => {
    try {
        const { id } = req.params;
        const address = await Address.findById(id);
        if (!address) {
            return res.status(404).json({ message: 'Address not found' });
        }
        if (req.body.addressId) {
            address.addressId = req.body.addressId;
            address.country = req.body.country;
            address.postcode = req.body.postcode;
            address.city = req.body.city;
            address.nameOfPublicArea = req.body.nameOfPublicArea;
            address.typeOfPublicArea = req.body.typeOfPublicArea;
            address.houseNumber = req.body.houseNumber;
        }
        const updatedAddress = await Address.save(); //TODO: save vagy update
        res.json(updatedAddress);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteAddress = async (req, res) => {
    try {
        const { id } = req.params;
        const address = await Address.findById(id);
        if (!address) {
            return res.status(404).json({ message: 'Address not found' });
        }
        await address.deleteOne();
        res.json({ message: 'Address deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};