import mongoose, { Schema } from 'mongoose'

const BookingSchema = new Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        
    },

    serviceproviderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'ServiceInfo'
    },

    date:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'ServiceInfo.PastBooking'

        // YourModel.findById(yourId).populate('date').exec((err, data) => {
        //     console.log(data.date.timestamp); // This will output the timestamp from the referenced ServiceInfo.PastBooking document
        // });
    }


});

export const Booking = mongoose.model('Booking', BookingSchema)
