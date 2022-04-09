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

function deleteUser(id){
    users = users.filter(user => user.id !== id)
    document.getElementById(`${id}`).remove()
    render()
}

function createCurrentUsersTable(currentPage){
    var currentRows = getcurrentRows(currentPage)           //pega os usuários atuais
    return currentRows.map(rows => {
        let userRow = document.createElement('tr')      //identificando a linha da tabela/usuário
        userRow.setAttribute('id', rows.id)

        let userName = document.createElement('td')
        userName.appendChild(document.createTextNode(`${rows.first_name} ${rows.last_name}`))

        let userEmail = document.createElement('td')
        userEmail.appendChild(document.createTextNode(rows.email))

        let userCreationDate = document.createElement('td')
        userCreationDate.appendChild(document.createTextNode(rows.created_at))

        let editAndDelete = document.createElement('td')
        editAndDelete.classList.add('action_buttons')
        let deleteButton = createDeleteButton(rows.id)
        let editButton = createEditButton(rows.id)

        editAndDelete.appendChild(editButton)
        editAndDelete.appendChild(deleteButton)

        userRow.appendChild(userName)
        userRow.appendChild(userEmail)
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
    createCurrentUsersTable(currentPage).forEach(row => tbody.appendChild(row))
}

function createEditButton(id){
    const editButton = document.createElement('button')
    editButton.classList.add('text_button', 'edit_button')
    editButton.appendChild(document.createTextNode('editar'))
    editButton.addEventListener('click', ()=> deleteUser(user.id, page))
    return editButton
}

function createDeleteButton(id){
    const deleteButton = document.createElement('button')
    deleteButton.classList.add('text_button', 'delete_button')
    deleteButton.appendChild(document.createTextNode('excluir'))
    deleteButton.setAttribute('type', 'button')
    deleteButton.addEventListener('click', () => deleteUser(id, page))
    return deleteButton
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

render()