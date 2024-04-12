document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("form");

    form.addEventListener("submit",async function(event) {
        event.preventDefault(); // Prevent the default form submission

        const Catagory = document.querySelector(".category").value.trim();
        const pincode = document.querySelector(".pincode").value.trim();
        const city = document.querySelector(".city").value.trim();
    
        console.log("Search:", Catagory);
        console.log("Pincode:", pincode);
        console.log("City:", city);

       

        // Send the search query to the backend server using Fetch API
        try {
           const response=await fetch('http://localhost:5500/api/v1/users/serviceProfile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Add any other headers if needed
                },
                body: JSON.stringify({Catagory, city,pincode})
            })

            if(!response.ok){
                throw new Error('Network response was not ok.');
            }

            const data = await response.json();

            console.log('Feedback submission successful:', data);
            
         
            
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);   
        }
    });
});


