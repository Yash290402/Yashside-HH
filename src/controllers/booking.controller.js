import { Booking } from "../models/bookings.model.js";

const bookTimeSlot = async (req, res) => {
    try {
        const { bookAt } = req.body;
        const booking = new Booking({ bookAt });
        await booking.save();
        res.status(201).json({ message: 'Slot booked successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


export {
    bookTimeSlot
};
