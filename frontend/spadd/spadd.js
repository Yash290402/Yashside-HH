document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');

    form.addEventListener('submit', async function (event) {
        event.preventDefault(); // Prevent the default form submission behavior

        // Extracting form data
        const providername = form.querySelector('input[name="providername"]').value;
        const category = form.querySelector('input[name="category"]').value;
        const pincodes = form.querySelector('textarea[name="pincodes"]').value.split(',').map(pin => pin.trim());
        const city = form.querySelector('input[name="city"]').value;
        const charges = form.querySelector('input[name="charges"]').value;
        const avatar = form.querySelector('input[name="file"]').files[0];
        const availability = form.querySelector('select[name="availability"]').value;

        console.log(providername, category, pincodes, city, charges)

        try {
            const formData = new FormData();
            formData.append('providername', providername);
            formData.append('category', category);
            formData.append('pincodes', JSON.stringify(pincodes)); // You may need to adjust this based on your backend's requirements
            formData.append('city', city);
            formData.append('charges', charges);
            formData.append('avatar', avatar);
            formData.append('availability', availability);

            const response = await fetch('http://localhost:5500/api/v1/users/serviceProfile', {
                method: 'POST',
                body: formData, // Use formData instead of JSON.stringify()
            });

            if (!response.ok) {
                throw new Error('Data submission failed');
            }

            const data = await response.json();
            console.log('Data submission successful:', data);
            alert('Data submitted successfully!');

            // Redirect or do other actions as needed
            // window.location.href = '../homepage/home.html';

        } catch (error) {
            console.error('Error submitting data:', error.message);
            alert('Data submission failed');
        }
    });
});
