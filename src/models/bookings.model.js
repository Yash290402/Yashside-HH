import mongoose, { Schema } from 'mongoose'

const BookingSchema = new Schema({
    
    bookedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true,
});

export const Booking = mongoose.model('Booking', BookingSchema)
