// Procurar o botão, qunado click button 
document.querySelector("#add-time").addEventListener('click', cloneField)
document.querySelector("#delete").addEventListener('click', deleteList)
    // Executar action
function cloneField() {
    var selectElementWeekday = document.getElementsByName('weekday[]');
    var selectElementTimeFrom = document.getElementsByName('time_from[]');
    var selectElementTimeTo = document.getElementsByName('time_to[]');

    if (validarCampoVazio(selectElementTimeTo) || validarCampoVazio(selectElementTimeFrom) || validarCampoVazio(selectElementWeekday)) {
        dialog('Campo não pode ser vazia <font size="5"><strong>(☉д⊙)<strong></font>');
    } else {
        // Duplicar campos
        const newFieldContainer = document.querySelector('.schedule-item').cloneNode(true);

        //pegar os campos
        const fields = newFieldContainer.querySelectorAll('input');

        //para cada campo, limpar 
        fields.forEach(function(field) {
            //pegar o field do momento
            field.value = "";
            field.classname
        });
        // Colocar a pagina
        document.querySelector('#schedule-items').appendChild(newFieldContainer);
    }
}

function validarCampoVazio(arrayCampo) {
    let vazio = false;

    arrayCampo.forEach(function(campo) {
        if (!campo.value) {
            vazio = true;
        }
    });

    return vazio;
}

function deleteList() {
    var field = document.querySelectorAll('.schedule-item');
    var lastfield = field[field.length - 1];
    //Primeira item não remove
    if (field.length == 1) {
        dialog('Primeira item não pode ser removidas <font size="5"><strong>(☉д⊙)<strong></font>');
    } else {
        lastfield.parentNode.removeChild(lastfield);
    }
}

function dialog(text) {
    return $.confirm({
        title: 'Aviso !',
        content: text,
        type: 'green',
        icon: 'fas fa-exclamation-circle',
        width: 'auto',
        useBootstrap: false // desabilitar o tema de bootstrap 
    });
}