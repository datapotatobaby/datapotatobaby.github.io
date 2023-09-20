document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    let formElement = e.target;
    let formData = new FormData(formElement);
  
    // Validate that all fields are filled
    if (!formData.get('name') || !formData.get('email') || !formData.get('subject') || !formData.get('message') || !formData.get('verify')) {
      alert('All fields are required.');
      return;
    }
  
    // Validate email
    const email = formData.get('email');
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }
  
    // Basic input sanitization
    const sanitizedMessage = encodeURIComponent(formData.get('message'));
    
    // If all validations pass, then proceed with form submission
    fetch('https://hook.us1.make.com/4f9n5m9igu8bn1uo4mf1pz682td7rd7o', {
      method: 'POST',
      body: formData
    })
    .then(response => response.text())
    .then(data => {
      console.log('Success:', data);
      alert('Thanks for reaching out! Your message has been sent.');
      formElement.reset();
    })
    .catch((error) => {
      console.error('Error:', error);
      alert('Temporary form submission error. Please contact me via one of the social media profiles below.');
    });
  });
  