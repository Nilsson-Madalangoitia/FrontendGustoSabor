function sendEmail() {
    const serviceID = 'service_0615fr8';
    const templateID = 'template_8wc9r7f';
    const publicKey = 'bJsNmt4nyh0RWpd04';
  
    emailjs.init(publicKey);
  
    const form = document.getElementById('service-form');
    const formData = new FormData(form);
  
    emailjs.sendForm(serviceID, templateID, form)
      .then(() => {
        alert('Mensaje enviado correctamente!');
        form.reset();
      }, (error) => {
        alert('Error al enviar el mensaje:', error);
      });
  }