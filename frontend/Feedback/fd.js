async function submitFeedback() {
    const name = document.querySelector('.perName').value;
    const email = document.querySelector('.perEID').value;
    const message = document.querySelector('.Message').value;
    console.log(name, email, message);
    const stars = document.querySelectorAll(".stars i");
    let rating = 0; // Initialize count of active stars

    // Count active stars
    stars.forEach(star => {
        if (star.classList.contains('active')) {
            rating++;
        }
    });

    try {
        const response = await fetch('http://localhost:5500/api/v1/users/feedbacks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, message,rating }),
        });

        if (!response.ok) {
            throw new Error('Feedback submission failed');
        }

        const data = await response.json();
        console.log('Feedback submission successful:', data);
        alert('Thank you for your feedback!');

        // Output the count of active stars
        console.log('Number of active stars:', activeStarsCount);

        // Redirect or do other actions as needed
        window.location.href = '../homepage/home.html';

    } catch (error) {
        console.error('Error submitting feedback:', error.message);
        alert('Feedback submission failed');
    }
}
document.querySelector('.sub-btn').addEventListener('click', function (event) {
    event.preventDefault(); // Prevent the default form submission behavior
    submitFeedback();
});