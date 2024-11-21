function consultar() {
    const email = document.querySelector('input[name="email"]').value;
    const password = document.querySelector('input[name="password"]').value;
  
    // Enviando a requisição POST para o back-end (Node.js)
    fetch('/check-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password }) 
    })
    .then(response => response.json())  
    .then(data => {
      if (data.exists) {
        alert('Usuário encontrado!');
      } else {
        alert('Usuário não encontrado!');
      }
    })
    .catch(error => {
      console.error('Erro:', error);
    });
  }
  