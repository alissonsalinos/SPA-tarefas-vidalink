// açao do botao do formulario
document.getElementById('myForm').addEventListener('submit', saveTarefa);

function saveTarefa(e){

    //pegando as variaveis
    var titTarefa = document.getElementById('titTarefa').value;
    var descTarefa = document.getElementById('descTarefa').value;
    var dataTarefa = document.getElementById('dataTarefa').value;

    if(!titTarefa || !descTarefa || !dataTarefa){
        alert('Por favor, preecha todos os campos!');
        return false;
    }
    
    var tarefa = {
        titulo: titTarefa,
        descricao: descTarefa,
        data: dataTarefa
    }

    // testando se tarefas é null
    if(localStorage.getItem('tarefas') === null){
        //iniciar array
        var tarefas = [];
        //adiciona na array
        tarefas.push(tarefa);
        //setando na localstorage
        localStorage.setItem('tarefas', JSON.stringify(tarefas));

    } else {
        // pegue as tarefas do localstorage
        var tarefas = JSON.parse(localStorage.getItem('tarefas'));
        // adicionar tarefa no array
        tarefas.push(tarefa);
        // reset novamenete para o localstorage
        localStorage.setItem('tarefas', JSON.stringify(tarefas));
        }

    //Apagar form
    document.getElementById('myForm').reset();

    mostrarTarefas();    

    //mantem os dados do form
    e.preventDefault();
}

//delete tarefa
function deleteTarefa(titulo){
    // pegar tarefa do localstorage
    var tarefas = JSON.parse(localStorage.getItem('tarefas'));
    // loop nas tarefas
    for(var i =0; i < tarefas.length; i++){
        if(tarefas[i].titulo == titulo){
            //apaga do array
            tarefas.splice(i, 1);
        }
    }
    // reset novamenete para o localstorage
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
    
    mostrarTarefas();
}

//mostrar tarefas
function mostrarTarefas(){
    var tarefas = JSON.parse(localStorage.getItem('tarefas'));
    // pegando o id para mostrar os resultados
    var tarefasResultados = document.getElementById('tarefasResultados');

    // construindo html do resultado
    tarefasResultados.innerHTML = '';
    for(var i = 0; i < tarefas.length; i++){
        var titulo      = tarefas[i].titulo;
        var descricao   = tarefas[i].descricao;
        var data        = tarefas[i].data;

        tarefasResultados.innerHTML += `
        <div id="card${i}" class="card cartao mb-3 bg-faded">
            <div class="card-block"> 
                <h5 class="card-title text-muted">${titulo}</h5>
                
                <p class="card-text"><strong><span class="text-muted">Descrição:</span> </strong> ${descricao}<br>
                <small class="card-text"><strong><span class="text-muted">Data de execução: </span></strong>${data}</small></p>
                <a onclick="deleteTarefa(\'${titulo}\')" class="btn btn-danger btn-sm text-white apagar align-text-top" style="cursor:pointer">Excluir tarefa</a>
            </div>    
        </div>`        

    }
}

$(document).ready(function(){
    $('#search').keyup(function(){
        search_div($(this).val());
    });

    function search_div(value){
        $('.cartao').each(function(){
            var found = 'false';
            $(this).each(function(){
                if($(this).text().toLowerCase().indexOf(value.toLowerCase()) >= 0)
                {
                    found = 'true';
                }
            });
            if(found == 'true')
            {
                $(this).show();
            }
            else {
                $(this).hide();
            }
        });
    }
});
