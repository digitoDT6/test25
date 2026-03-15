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
