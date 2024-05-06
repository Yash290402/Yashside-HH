
// document.addEventListener('DOMContentLoaded', function () {
//     const timeSlots = document.querySelectorAll('.time-slot');

//     // Add event listeners to each time slot button
//     timeSlots.forEach(slot => {
//         slot.addEventListener('click', function () {
//             const selectedTime = this.getAttribute('data-time');
//             const ischecked = this.getAttribute('checked');
//             bookTimeSlot(selectedTime, ischecked);
//         });
//     });

//     // Function to book a time slot
//     async function bookTimeSlot(date, ischecked) {
//         try {
//             const response = await fetch('http://localhost:5500/api/v1/users/book', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({ date, ischecked })
//             });

//             if (!response.ok) {
//                 throw new Error('Failed to book time slot');
//             }

//             const data = await response.json();
//             console.log(data.message); // Log the response message from the server
//         } catch (error) {
//             console.error('An error occurred:', error);
//         }
//     }
// });


document.addEventListener("DOMContentLoaded", function () {
    const timeSlots = document.querySelectorAll('.time-slot');

    timeSlots.forEach(slot => {
        slot.addEventListener('click', function () {
            if (!this.classList.contains('booked')) {
                const bookAt = this.classList.add('booked');
                this.disabled = true; // Disable the button after booking
                bookTimeSlot(bookAt);
            }
        });
    });

    //  Function to book a time slot
    async function bookTimeSlot(bookAt) {
        try {
            const response = await fetch('http://localhost:5500/api/v1/users/book', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({bookAt})
            });

            if (!response.ok) {
                throw new Error('Failed to book time slot');
            }

            const data = await response.json();
            console.log(data.message); // Log the response message from the server
        } catch (error) {
            console.error('An error occurred:', error);
        }
    }

});



