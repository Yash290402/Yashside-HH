document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("form");

    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent the default form submission

        const serviceInput = document.querySelector(".service");
        const pincodeInput = document.querySelector(".pincode");
        
        const service = serviceInput.value.trim();
        const pincode = pincodeInput.value.trim();

        console.log("Search:", service);
        console.log("Pincode:", pincode);

        // Construct the search query data to be sent to the server
        const search = {
            service: service,
            pincode: pincode
        };

        // Send the search query to the backend server using Fetch API
        fetch('http://localhost:5500/api/v1/users/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Add any other headers if needed
            },
            body: JSON.stringify(search)
        })
        .then(response => {
            // Handle the response from the server
            if (response.ok) {
                return response.json(); // Parse the JSON response
            }
            throw new Error('Network response was not ok.');
        })
        .then(searchResults => {
            // Handle the search results received from the server
            console.log('Search results:', searchResults);
            // You can display the search results on the frontend here
        })
        .catch(error => {
            // Handle errors that occur during the fetch
            console.error('There was a problem with the fetch operation:', error);
        });
    });
});


