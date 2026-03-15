// Função para simular Registro e Login
const loginForm = document.getElementById('loginForm');

if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const usuario = document.getElementById('user').value;
        const senha = document.getElementById('pass').value;

        // Salva no nosso "Banco de Dados" LocalStorage
        let usuarios = JSON.parse(localStorage.getItem('bancoUsuarios')) || [];
        usuarios.push({ usuario, senha });
        localStorage.setItem('bancoUsuarios', JSON.stringify(usuarios));

        // Redireciona para a página de livros
        window.location.href = "livros2.html";
    });
}

// Função para listar os dados na página livros4.html
function carregarLogins() {
    const tabela = document.getElementById('listaLogins');
    if (tabela) {
        let usuarios = JSON.parse(localStorage.getItem('bancoUsuarios')) || [];
        tabela.innerHTML = usuarios.map(u => `
            <tr>
                <td>${u.usuario}</td>
                <td>********</td>
            </tr>
        `).join('');
    }
}

window.onload = carregarLogins;
