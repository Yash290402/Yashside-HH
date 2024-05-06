import { Booking } from "../models/bookings.model.js";

const bookTimeSlot = async (req, res) => {
    try {
        const { time,ischecked } = req.body;
        console.log(time,ischecked)
        // if(!ischecked){
        //     booking.ischecked=true;
        // }
        const booking = new Booking({ time ,ischecked: true });
        await booking.save();
        res.status(201).json({ message: 'Slot booked successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


export {
    bookTimeSlot
};
