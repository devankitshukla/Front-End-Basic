document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('registrationForm');
    const successMessage = document.getElementById('successMessage');

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        if (validateForm()) {
            submitForm();
        }
    });

    function validateForm() {
        // Your validation logic here
        return true;
    }

    function submitForm() {
        const formData = {
            fullName: document.getElementById('fullName').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            address: document.getElementById('address').value.trim(),
            gender: document.getElementById('gender').value,
            dob: document.getElementById('dob').value,
        };

        fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then(response => response.json())
        .then(data => {
            // Handle the response from the server
            console.log(data);
            if (data.success) {
                showSuccessMessage();
                form.reset();
            } else {
                alert(data.message);
            }
        })
        .catch(error => {
            // Handle errors here
            console.error('Error:', error);
            alert('There was an error processing your registration. Please try again later.');
        });
    }

    function showSuccessMessage() {
        form.style.display = 'none';
        successMessage.style.display = 'block';
    }
});
