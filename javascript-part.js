var currentPage = 1;
var ROWS_PER_PAGE = 5;

function getTotalPages(){
    return Math.ceil(users.length / ROWS_PER_PAGE) //quantidade de páginas
}
function getcurrentRows(currentPage){                    //página atual com os usuários respectivos de suas páginas
    const start = (currentPage - 1) * ROWS_PER_PAGE
    const end = start + ROWS_PER_PAGE
    return users.slice(start, end)                      //retorna a lista de usuários atuais
}
function createUsersTable(currentPage){
    var currentRows = getcurrentRows(currentPage)           //pega os usuários atuais
    var k = '<tbody>'
    for(i = 0;i < currentRows.length; i++){
        k+= '<tr>';
        k+= '<td>' + (currentRows[i].first_name + " " + currentRows[i].last_name) + '</td>';
        k+= '<td>' + currentRows[i].email + '</td>';
        k+= '<td>' + currentRows[i].created_at + '</td>';
        k+= '<td>' + '<button class="text_button edit_button" type="button">editar</button>' + "\t" + 
            '<button class="text_button delete_button" type="button">excluir</button>' +'</td>';
        k+= '</tr>';
    }
    k+='</tbody>';
    document.getElementById('tableUserData').innerHTML = k;
}

createUsersTable(currentPage)

function render(){
    const totalPages = getTotalPages()
    if (currentPage > totalPages){      //se a página estiver acima do valor máximo de páginas existentes, ou seja, não existir
        currentPage = totalPages
    }
    renderPagination(totalPages)        //troca de páginas
}

function changePage(newPage){
    const totalPages = getTotalPages()
    if (newPage >= 1 && newPage <= totalPages){     //se a página existe
        currentPage = newPage
        createUsersTable(currentPage)
    }
    render()            //atualiza depois dos comandos realizados
}

function createNextPageButton(){            //adiciona o botão da próxima página
    const nextPageButton = document.createElement('button')
    nextPageButton.type = 'button'
    nextPageButton.textContent = '>>'
    nextPageButton.addEventListener('click', ()=>
        changePage(currentPage + 1)
    ) //ação de mudar a página
    return nextPageButton
}

function createPreviousPageButton(){ //adiciona o botão pra página anterior
    const previousPageButton = document.createElement('button')
    previousPageButton.type = 'button'
    previousPageButton.textContent = '<<'
    previousPageButton.addEventListener('click', ()=>
        changePage(currentPage - 1)    
    )  //ação de mudar a página
    return previousPageButton
}

function createPaginationButton(page){      //mostra o número de cada página, para melhor navegação
    const paginationButton = document.createElement('button')
    paginationButton.type = 'button'
    paginationButton.textContent = page         //o número da página
    if (page === currentPage){
        paginationButton.classList.add('active')        //mostra em que página o usuário está
    }
    paginationButton.addEventListener('click', ()=>
        changePage(page)
    )  //ação de mudar para a página escolhida, se pressionada
    return paginationButton
}

function renderPagination(totalPages){          //render para a utilização de páginas
    const pagination = document.querySelector('.pagination')
    pagination.replaceChildren()        //troca as páginas

    if (totalPages){            //checa se há páginas
        const previousPageButton = createPreviousPageButton()
        pagination.append(previousPageButton)       //se o botão entrar em ação

        for (let page = 1; page <= totalPages; page++) { //criando o número de cada página no pagination menu
            const pageButton = createPaginationButton(page)
            pagination.appendChild(pageButton)
        }

        const nextPageButton = createNextPageButton()
        pagination.append(nextPageButton)           //se o botão entrar em ação
    }
}

render()