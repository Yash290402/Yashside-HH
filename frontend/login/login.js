

const wrap = document.getElementById('wrap');

function toggleForm(formType) {
    if (formType === 'register') {
        wrap.classList.add('active');
    } else {
        wrap.classList.remove('active');
    }
}

async function register() {
    const username = document.getElementById('registerUsername').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    try {
        const response = await fetch('http://localhost:5500/api/v1/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password }),
        });

        if (!response.ok) {
            throw new Error('Registration failed');
        }

        const data = await response.json();
        console.log('Registration successful:', data);
        alert('Registration successful');

         // Redirect to the home page after successful registration
         window.location.href = '../homepage/home.html';

    } catch (error) {
        console.error('Error during registration:', error.message);
        alert('Registration failed');
    }
    
}

async function login() {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const response = await fetch('http://localhost:5500/api/v1/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            throw new Error('Login failed');
        }

        const data = await response.json();
        console.log('Login successful:', data);
        alert('Login successful');

        // Redirect to the home page after successful registration
        window.location.href = '../homepage/home.html';

    } catch (error) {
        console.error('Error during login:', error.message);
        alert('Login failed');
    }
}

