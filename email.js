function sendEmail() {
    const serviceID = 'service_0615fr8';
    const templateID = 'template_l71quq1';
    const publicKey = 'bJsNmt4nyh0RWpd04';
  
    emailjs.init(publicKey);
  
    const form = document.getElementById('contact-form');
    emailjs.sendForm(serviceID, templateID, form)
      .then(() => {
        alert('Mensaje enviado correctamente!');
        form.reset();
      }, (error) => {
        alert('Error al enviar el mensaje:', error);
      });
  }