function handleSubmit(event) {
  event.preventDefault(); // Prevent the form from submitting through the traditional way

  // Get form data
  const formData = {
    firstName: document.getElementById('firstname').value,
    lastName: document.getElementById('lastname').value,
    email: document.getElementById('email').value,
    section: document.getElementById('section').value,
  };

  // Basic form validation (you can add more specific validations)
  if (
    !formData.firstName ||
    !formData.lastName ||
    !formData.email ||
    !formData.section
  ) {
    Swal.fire(
      'Oops...?',
      'Please fill out all the fields before submitting.',
      'question'
    );
    return;
  }

  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, submit it!',
  }).then((result) => {
    if (result.isConfirmed) {
      // Make the API request
      fetch('https://enrfx5ls5s76.x.pipedream.net', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          // Handle the API response here if needed
          console.log(data);
          Swal.fire({
            title: 'Success',
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'ok',
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = 'information.html';
            }
          });
        })
        .catch((error) => {
          console.error('Error submitting the form:', error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'An error occurred while submitting the form. Please try again later.',
          });
        });
    }
  });
}

// Add event listener to the submit button
document.querySelector('.submit').addEventListener('click', handleSubmit);
