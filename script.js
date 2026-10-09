const inputTarefa = document.getElementById('inputTarefa');
const botaoAdicionar = document.getElementById('botaoAdicionar');
const listaTarefas = document.getElementById('listaTarefas');
const contadorTarefas = document.getElementById('contadorTarefas');
const botaoLimparTudo = document.getElementById('botaoLimparTudo');

let tarefas = [];

// Adicionar tarefa ao clicar no botão
botaoAdicionar.addEventListener('click', adicionarTarefa);

// Adicionar tarefa ao apertar a tecla "Enter" no teclado
inputTarefa.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        adicionarTarefa();
    }
});

function adicionarTarefa() {
    const textoDigitado = inputTarefa.value.trim();

    if (textoDigitado === "") {
        alert("Por favor, escreve uma tarefa!");
        return;
    }

    const novaTarefa = {
        id: Date.now(),
        texto: textoDigitado,
        concluida: false
    };

    tarefas.push(novaTarefa);
    inputTarefa.value = "";
    renderizarTarefas();
}

// Função principal para desenhar tudo na tela e atualizar contadores
function renderizarTarefas() {
    listaTarefas.innerHTML = "";

    // Atualiza o texto do contador de pendentes
    const pendentes = tarefas.filter(t => !t.concluida).length;
    contadorTarefas.textContent = `Tarefas pendentes: ${pendentes}`;

    tarefas.forEach(function(tarefa) {
        const itemLista = document.createElement('li');
        
        if (tarefa.concluida) {
            itemLista.classList.add('concluida');
        }

        const spanTexto = document.createElement('span');
        spanTexto.textContent = tarefa.texto;
        itemLista.appendChild(spanTexto);

        const divBotoes = document.createElement('div');
        divBotoes.classList.add('botoes-acao');

        // Botão Concluir
        const btnConcluir = document.createElement('button');
        btnConcluir.textContent = "✔";
        btnConcluir.classList.add('btn-concluir');
        btnConcluir.addEventListener('click', function() {
            tarefa.concluida = !tarefa.concluida;
            renderizarTarefas();
        });

        // Botão Remover
        const btnRemover = document.createElement('button');
        btnRemover.textContent = "✖";
        btnRemover.addEventListener('click', function() {
            tarefas = tarefas.filter(t => t.id !== tarefa.id);
            renderizarTarefas();
        });

        divBotoes.appendChild(btnConcluir);
        divBotoes.appendChild(btnRemover);
        itemLista.appendChild(divBotoes);
        listaTarefas.appendChild(itemLista);
    });
}

// Funcionalidade extra: Limpar todas as tarefas da lista
botaoLimparTudo.addEventListener('click', function() {
    if (tarefas.length === 0) {
        alert("A lista já está vazia!");
        return;
    }
    
    if (confirm("Tens a certeza que pretendes apagar todas as tarefas?")) {
        tarefas = [];
        renderizarTarefas();
    }
});