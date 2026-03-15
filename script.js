let modoCadastro = false;
const form = document.getElementById('loginForm');
const titulo = document.getElementById('tituloForm');
const btnAcao = document.getElementById('btnAcao');
const linkCadastro = document.getElementById('linkCadastro');
const textoAlternar = document.getElementById('textoAlternar');

// Função para alternar entre modo Login e modo Cadastro
if (linkCadastro) {
    linkCadastro.onclick = function(e) {
        e.preventDefault();
        modoCadastro = !modoCadastro; // Inverte o valor (true/false)

        if (modoCadastro) {
            titulo.innerText = "Criar Nova Conta";
            btnAcao.innerText = "Cadastrar e Entrar";
            textoAlternar.innerHTML = 'Já tem conta? <a href="#" id="linkCadastro">Fazer Login</a>';
        } else {
            titulo.innerText = "Acesse seu Painel";
            btnAcao.innerText = "Entrar";
            textoAlternar.innerHTML = 'Ainda não tem conta? <a href="#" id="linkCadastro">Cadastre-se aqui</a>';
        }
        // Reatribui o evento ao novo link criado dinamicamente
        document.getElementById('linkCadastro').onclick = linkCadastro.onclick;
    };
}

// Lógica de envio do formulário
if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const usuario = document.getElementById('user').value;
        const senha = document.getElementById('pass').value;

        // Puxa os usuários já existentes no "Banco"
        let usuarios = JSON.parse(localStorage.getItem('bancoUsuarios')) || [];

        if (modoCadastro) {
            // Verifica se o usuário já existe
            const existe = usuarios.find(u => u.usuario === usuario);
            if (existe) {
                alert("Este usuário já existe! Escolha outro nome.");
                return;
            }
            // Adiciona novo usuário
            usuarios.push({ usuario, senha });
            localStorage.setItem('bancoUsuarios', JSON.stringify(usuarios));
            alert("Conta criada com sucesso!");
        } else {
            // Lógica de Login: Verifica se usuário e senha batem
            const userValidado = usuarios.find(u => u.usuario === usuario && u.senha === senha);
            if (!userValidado) {
                alert("Usuário ou senha incorretos!");
                return;
            }
        }

        // Se chegou aqui, deu tudo certo. Redireciona!
        window.location.href = "livros2.html";
    });
}

// Função para carregar os dados na livros4.html
function carregarLogins() {
    const tabela = document.getElementById('listaLogins');
    if (tabela) {
        let usuarios = JSON.parse(localStorage.getItem('bancoUsuarios')) || [];
        tabela.innerHTML = usuarios.map(u => `
            <tr>
                <td>${u.usuario}</td>
                <td>${u.senha}</td> 
            </tr>
        `).join('');
    }
}

window.onload = carregarLogins;
