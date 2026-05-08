let form = document.getElementById("formAluno");

let tabela = document.getElementById("tabelaAluno");

let canvas = document.getElementById("grafico");

let ctx = canvas.getContext("2d");

// Vetor de alunos
let alunos = [];

// Evento formulário
form.addEventListener("submit", function(event){

    event.preventDefault();

    // Valores
    let nome = document.getElementById("nome").value;

    let nota1 = Number(document.getElementById("nota1").value);

    let nota2 = Number(document.getElementById("nota2").value);

    let nota3 = Number(document.getElementById("nota3").value);

    // Média
    let media = (nota1 + nota2 + nota3) / 3;

    // Situação
    let situacao = "";

    if(media >= 7){
        situacao = "Aprovado";
    }
    else if(media >= 5){
        situacao = "Recuperação";
    }
    else{
        situacao = "Reprovado";
    }

    // Objeto aluno
    let aluno = {
        nome,
        nota1,
        nota2,
        nota3,
        media,
        situacao
    };

    // Adicionar vetor
    alunos.push(aluno);

    // Atualizar
    atualizarTabela();

    desenharGrafico();

    // Limpar
    form.reset();
});

// Atualizar tabela
function atualizarTabela(){

    tabela.innerHTML = "";

    for(let i = 0; i < alunos.length; i++){

        tabela.innerHTML += `
            <tr>
                <td>${alunos[i].nome}</td>
                <td>${alunos[i].nota1}</td>
                <td>${alunos[i].nota2}</td>
                <td>${alunos[i].nota3}</td>
                <td>${alunos[i].media.toFixed(1)}</td>
                <td>${alunos[i].situacao}</td>

                <td>
                    <button onclick="editar(${i})">Editar</button>

                    <button onclick="remover(${i})">Remover</button>
                </td>
            </tr>
        `;
    }
}

// Remover
function remover(indice){

    alunos.splice(indice, 1);

    atualizarTabela();

    desenharGrafico();
}

// Editar
function editar(indice){

    let novoNome = prompt("Novo nome:", alunos[indice].nome);

    let novaNota1 = Number(prompt("Nova nota 1:", alunos[indice].nota1));

    let novaNota2 = Number(prompt("Nova nota 2:", alunos[indice].nota2));

    let novaNota3 = Number(prompt("Nova nota 3:", alunos[indice].nota3));

    // Nova média
    let novaMedia = (novaNota1 + novaNota2 + novaNota3) / 3;

    // Nova situação
    let novaSituacao = "";

    if(novaMedia >= 7){
        novaSituacao = "Aprovado";
    }
    else if(novaMedia >= 5){
        novaSituacao = "Recuperação";
    }
    else{
        novaSituacao = "Reprovado";
    }

    // Atualizar objeto
    alunos[indice] = {
        nome: novoNome,
        nota1: novaNota1,
        nota2: novaNota2,
        nota3: novaNota3,
        media: novaMedia,
        situacao: novaSituacao
    };

    atualizarTabela();

    desenharGrafico();
}

// Gráfico
function desenharGrafico(){

    // Limpar canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for(let i = 0; i < alunos.length; i++){

        let altura = alunos[i].media * 20;

        let x = 50 + (i * 100);

        let y = canvas.height - altura;

        // Barra
        ctx.fillStyle = "hotpink";
        ctx.fillRect(x, y, 60, altura);

        // Nome
        ctx.fillStyle = "black";
        ctx.fillText(alunos[i].nome, x, 290);

        // Média
        ctx.fillText(alunos[i].media.toFixed(1), x, y - 5);
    }
}