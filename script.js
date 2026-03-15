// 1. Função para Salvar um usuário
function salvarUsuario(id, nome, email, status) {
    // Busca a lista atual ou cria uma vazia
    let usuarios = JSON.parse(localStorage.getItem('meuBancoDeDados')) || [];
    
    // Adiciona o novo objeto
    usuarios.push({ id, nome, email, status });
    
    // Salva de volta no "Banco de Dados" do navegador
    localStorage.setItem('meuBancoDeDados', JSON.stringify(usuarios));
    
    alert("Usuário salvo com sucesso!");
    renderizarTabela();
}

// 2. Função para ler os dados e mostrar na tela
function renderizarTabela() {
    const corpoTabela = document.querySelector('.data-table tbody');
    const usuarios = JSON.parse(localStorage.getItem('meuBancoDeDados')) || [];
    
    // Limpa a tabela antes de desenhar
    corpoTabela.innerHTML = "";
    
    usuarios.forEach(user => {
        corpoTabela.innerHTML += `
            <tr>
                <td>${user.id}</td>
                <td>${user.nome}</td>
                <td>${user.email}</td>
                <td><span class="status active">${user.status}</span></td>
                <td><button class="btn-edit">Editar</button></td>
            </tr>
        `;
    });
}

// Carregar os dados assim que abrir a página
window.onload = renderizarTabela;



const form = document.getElementById('userForm');

// Escuta o evento de "enviar" o formulário
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Impede a página de recarregar

    // Pega os valores dos inputs
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const status = document.getElementById('status').value;
    const id = Math.floor(Math.random() * 1000); // Gera um ID aleatório simples

    salvarUsuario(id, nome, email, status);
    
    form.reset(); // Limpa os campos após salvar
});

function salvarUsuario(id, nome, email, status) {
    let usuarios = JSON.parse(localStorage.getItem('meuBancoDeDados')) || [];
    usuarios.push({ id, nome, email, status });
    localStorage.setItem('meuBancoDeDados', JSON.stringify(usuarios));
    renderizarTabela();
}

function renderizarTabela() {
    const corpoTabela = document.querySelector('.data-table tbody');
    const usuarios = JSON.parse(localStorage.getItem('meuBancoDeDados')) || [];
    
    corpoTabela.innerHTML = "";
    
    usuarios.forEach((user, index) => {
        corpoTabela.innerHTML += `
            <tr>
                <td>${user.id}</td>
                <td>${user.nome}</td>
                <td>${user.email}</td>
                <td><span class="status ${user.status === 'Ativo' ? 'active' : 'pending'}">${user.status}</span></td>
                <td><button onclick="excluirUsuario(${index})" class="btn-edit" style="background-color: #dc3545;">Excluir</button></td>
            </tr>
        `;
    });
}

// Função extra para deletar
function excluirUsuario(index) {
    let usuarios = JSON.parse(localStorage.getItem('meuBancoDeDados')) || [];
    usuarios.splice(index, 1); // Remove o item do array
    localStorage.setItem('meuBancoDeDados', JSON.stringify(usuarios));
    renderizarTabela();
}

window.onload = renderizarTabela;
