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

function deleteUser(id){                    //deleta usuários e retorna a lista dos restantes após um usuário ser deletado
    users = users.filter(user => user.id !== id)
    document.getElementById(`${id}`).remove()
}

function createCurrentUsersTable(currentPage){
    var currentRows = getcurrentRows(currentPage)           //pega os usuários atuais
    return currentRows.map(rows => {
        let userRow = document.createElement('tr')      //identificando a linha da tabela/usuário
        userRow.setAttribute('id', rows.id)

        let userName = document.createElement('td')         //cria o elemento
        userName.appendChild(document.createTextNode(`${rows.first_name} ${rows.last_name}`))       //add o seu respectivo valor, usado para gerar o texto

        let userEmail = document.createElement('td')
        userEmail.appendChild(document.createTextNode(rows.email))

        let userCreationDate = document.createElement('td')
        userCreationDate.appendChild(document.createTextNode(rows.created_at))

        let editAndDelete = document.createElement('td')        //coluna das funções
        editAndDelete.classList.add('action_buttons')           //se encontra na classe de botões de ação, são diferentes por suas colorações
        let deleteButton = createDeleteButton(rows.id)          //redirecionam às suas respectivas funções
        let editButton = createEditButton(rows.id)

        editAndDelete.appendChild(editButton)                   //como os dois estão em uma coluna só, são adicionados a essa coluna
        editAndDelete.appendChild(deleteButton)

        userRow.appendChild(userName)
        userRow.appendChild(userEmail)                          //add cada um à sua coluna
        userRow.appendChild(userCreationDate)
        userRow.appendChild(editAndDelete)

        return userRow
    })
}

const tbody = document.querySelector('tbody')

function createUsersTable(currentPage){
    while (tbody.hasChildNodes()){          //se há outras linhas da página anterior
        tbody.removeChild(tbody.lastChild) //remover as linhas anteriores
      }
    createCurrentUsersTable(currentPage).forEach(row => tbody.appendChild(row))         //vai add cada linha à tabela de acordo com a página atual
}


function editingUserData(){             //mensagem para mostrar que ainda não há como editar usuários
    const message = "Opa! Ainda não há como editar usuários..."
    alert(message)
}

function createEditButton(id){                  //botão para edição
    const editButton = document.createElement('button')
    editButton.classList.add('text_button', 'edit_button')
    editButton.appendChild(document.createTextNode('editar'))
    editButton.addEventListener('click', ()=> editingUserData())
    return editButton
}

function createDeleteButton(id){                //botão para deletar elementos
    const deleteButton = document.createElement('button')       //cria o elemento do botão
    deleteButton.classList.add('text_button', 'delete_button')     //classe do botão
    deleteButton.appendChild(document.createTextNode('excluir'))        //prcoura o botão com o texto 'excluir'
    deleteButton.setAttribute('type', 'button')                 //tipo do atributo
    deleteButton.addEventListener('click', () => deleteUser(id))        //função que ele deve fazer ao ser pressionado
    render()
    return deleteButton
}


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
    if (newPage < 1){     //se a página é abaixo de 1
        currentPage = totalPages    //passa para a última página
        createUsersTable(currentPage)
    }
    if (newPage > totalPages){     //se a página é acima do total de páginas
        currentPage = 1         //passa para a primeira página
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

createUsersTable(currentPage)
render()