const spanDate = document.querySelector('#date')
const spanMonth = document.querySelector('#month')
const spanYear = document.querySelector('#year')
const spanWeekDay = document.querySelector('#weekday')


window.addEventListener('load', () => {
    const date = new Date()
    const month = date.toLocaleDateString('default', {month: 'long'})
    const year = date.getFullYear()
    const weekday = date.toLocaleDateString('default', {weekday: 'long'})
    const myDate = date.getDate()

    spanDate.innerText = myDate
    spanMonth.innerText = month
    spanYear.innerText = year
    spanWeekDay.innerText = weekday
})

auth.onAuthStateChanged(user => {
    if(user){
        console.log('User is Sign In')
    }else{
        console.log('User is Sign Out')
        alert('SignOut')
    }
})


auth.onAuthStateChanged(user => {
    if(user){
        const username = document.getElementById('current__user')
        fs.collection('users').doc(user.uid).get().then(snapshot => {
            username.innerText = snapshot.data().Name
        })


    }
})

function logout() {
    auth.signOut();
    location = '../../../index.html'
}
document.querySelector('.signout').addEventListener('click', logout)


let date = new Date();
let time = date.getTime();
let counter = time;
const form = document.querySelector('#new-todo-form')
form.addEventListener('submit', e=> {
    e.preventDefault()
    
    const content =  e.target.elements.content.value
    const category =  e.target.elements.category.value
    const done =  false
   
  
    let id = counter += 1;
   
    auth.onAuthStateChanged(user => {
        if (user) {
            fs.collection(user.uid).doc('_' + id).set({
                id: '_' + id,
                content,
                category,
                done

               
                
            }).then(() => {
            }).catch(err => {
                console.log(err.message);
            })
        }
        else {
        }
    })
    form.reset();
   

    
})

const todoList = document.querySelector('#todo-list')
function renderData(individualDoc){
    // todoList.innerHTML = ''
    {
        const todoItem = document.createElement('div')
        todoItem.classList.add('todo-item')
        todoItem.setAttribute('data-id', individualDoc.id);

        const label = document.createElement('label')
        const input = document.createElement('input')
        const span = document.createElement('span')
        const content = document.createElement('div')
        const actions = document.createElement('div')
        const edit = document.createElement('button')
        const deleteButton = document.createElement('button')

        input.type = 'checkbox'
        input.checked = individualDoc.data().done
        
        span.classList.add('bubble')
        if(individualDoc.data().category == 'personal'){
            span.classList.add('personal')
        }else{
            span.classList.add('business')
        }
        
        content.classList.add('todo-content')
        actions.classList.add('actions')
        edit.classList.add('edit')
        deleteButton.classList.add('delete')

        content.innerHTML = `<input type = "text" value = "${individualDoc.data().content}" readonly>` 
        edit.innerHTML = 'Edit'
        deleteButton.innerHTML = 'Delete'

        label.appendChild(input)
        label.appendChild(span)
        actions.appendChild(edit)
        actions.appendChild(deleteButton)
        todoItem.appendChild(label)
        todoItem.appendChild(content)
        todoItem.appendChild(actions)
        todoList.appendChild(todoItem)
        if(individualDoc.data().done){
            todoItem.classList.add('done')
        }else{
            todoItem.classList.remove('done')

        }

        input.addEventListener('click', e => {
            let id = e.target.parentElement.parentElement.getAttribute('data-id');
         
           
            auth.onAuthStateChanged(user => {

                if(user){
                    let item = fs.collection(user.uid).doc(id)
                    item.get().then(function(doc) {
                        if(doc.data()){
                            if(doc.data().done === false){
                                item.update({
                                    done : e.target.checked
                                    
                                })
                                todoItem.classList.add('done')


                            }else{
                                item.update({
                                    done : e.target.checked
                                    
                                })
                                todoItem.classList.remove('done')



                            }
                            
                    
                            
                        }
                    })
                    
                    
                }
            })
            if(individualDoc.data().done){
                
                todoItem.classList.add('done')
            }else{
                todoItem.classList.remove('done')

            }
           

            
        })

        edit.addEventListener('click', e => {
            const input = content.querySelector('input')
            input.removeAttribute('readonly')
            input.focus()
            input.addEventListener('blur', e => {
                input.setAttribute('readonly', true)
            let id = e.target.parentElement.parentElement.getAttribute('data-id');
         
            auth.onAuthStateChanged(user => {

                if(user){
                    let item = fs.collection(user.uid).doc(id)
                    item.get().then(function(doc) {
                        if(doc.data()){
                           
                            if(doc.data().content){
                                item.update({
                                    content: e.target.value
                                    
                                })
                            }
                            
                    
                            
                        }
                    })
                    
                    
                }
            })
                
            
            })
        })
        deleteButton.addEventListener('click', e => {
            let id = e.target.parentElement.parentElement.getAttribute('data-id');
            auth.onAuthStateChanged(user => {
                if (user) {
                    fs.collection(user.uid).doc(id).delete();
                }
            })
            // DisplayTodos()
            

            

        })

    }
}

function DisplayTodos(){

    auth.onAuthStateChanged(user => {
        if (user) {
            fs.collection(user.uid).onSnapshot((snapshot) => {
                let changes = snapshot.docChanges();
                changes.forEach(change => {
                    if (change.type == "added") {
                        
                        
                        console.log(change.doc)
                        renderData(change.doc);
                    }
                    else if (change.type == 'removed') {
                        
                        let divDelete = todoList.querySelector('[data-id=' + change.doc.id + ']')
                        todoList.removeChild(divDelete)
                    }
                })
            })
        }
    })
}
DisplayTodos()

