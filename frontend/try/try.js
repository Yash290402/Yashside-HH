async function registerServiceProvider() {
    
    const fullname = document.getElementById('helloname').value;
    const email = document.getElementById('helloemail').value;
    const Phoneno = document.getElementById('hellophone').value;
    console.log(fullname + ' ' + email + ' ' + Phoneno)
    try {

        const response = await fetch('http://localhost:5500/api/v1/users/serviceprovider', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ fullname, email, Phoneno }),

        });

        if (!response.ok) {
            const errorData = await response.json(); // Get error details from response
            throw new Error(`Registration failed: ${errorData.message}`);
        }

        const data = await response.json();
        console.log('Registration successful:', data);
        alert('Registration successful');

        // Redirect to the home page after successful registration
        window.location.href = '../homepage/home.html';

    } catch (error) {
        console.error('Error during registration:', error.message);
        alert(error.message); // Display specific error message to user
    }
}

document.querySelector('.sub-btn').addEventListener('click', function (event) {
    event.preventDefault(); // Prevent the default form submission behavior
    registerServiceProvider();
});
