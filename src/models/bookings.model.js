import mongoose, { Schema } from 'mongoose'

const BookingSchema = new Schema({

    time: {
        type:'String',
        required: true,
    },
    ischecked: {
        type:'Boolean',
        default: false,
    }
}, {
    timestamps: true,
});

export const Booking = mongoose.model('Booking', BookingSchema)
