// =================Loader=====================

onload = () => {
    const load =document.getElementById('load')
    setTimeout(() =>{
        load.style.display='none'
    },3333)

    
}
function loader(){
    const load =document.getElementById('load')
    setTimeout(() =>{
        load.style.display='none'
    },3333)
}

loader()



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
        
    }
})



auth.onAuthStateChanged(user => {
    if(user){

        const username = document.querySelector('#current__user')
        fs.collection('users').doc(user.uid).get().then(snapshot => {
            username.innerText = `Hello, ${snapshot.data().Name}`
        })
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 5400,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
          icon: 'info',
          title: `Please wait while we fetch your saved Data `
        })
        
        document.querySelector('.swal2-popup').style.background = '#1b1a1a'
        document.querySelector('.swal2-popup').style.color = 'white'
        document.querySelector('.swal2-timer-progress-bar').style.background = '#bebcc5'

        setTimeout(() => {
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 4800,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          
          Toast.fire({
              icon: 'info',
              title: `Automatic updates Enabled `
            })
            
            document.querySelector('.swal2-popup').style.background = '#1b1a1a'
            document.querySelector('.swal2-popup').style.color = 'white'
            document.querySelector('.swal2-timer-progress-bar').style.background = '#bebcc5'
            console.log('User is Sign In')
            
        }, 6000);
        
    }else{
        console.log('User is Sign Out')
        setTimeout(() => {
            
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                confirmButtonColor: 'red',
                allowOutsideClick: false,
                
                confirmButtonText: 'Close',
                text: 'It Seems no User is Sign, Please First Sign In',
                footer: 'If user has Sign In and showing this error Contact Developer'
              }).then((result) => {
                if (result.isConfirmed) {
                 
                  location = `../../../index.html`
                }
              })
    
    
            document.querySelector('.app').style.transform = 'scale(0)'
        }, 300);
       
       

        
    }
})

function logout() {
    Swal.fire({
        title: 'Are you sure?',
        
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Sign Out!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Signing off!',
            ' ',
            'success'
          )
          document.querySelector('.swal2-popup').style.background = '#1b1a1a'
            document.querySelector('.swal2-popup').style.color = 'white'

            document.querySelector('.swal2-success-circular-line-left').style.background = '#1b1a1a'
            document.querySelector('.swal2-success-circular-line-left').style.color = '#white'
            document.querySelector('.swal2-success-circular-line-right').style.background = '#1b1a1a'
            document.querySelector('.swal2-success-circular-line-right').style.color = '#white'
            document.querySelector('.swal2-success-fix').style.background = '#1b1a1a'
            document.querySelector('.swal2-success-fix').style.color = '#white'
            
          setTimeout(() => {
            auth.signOut();
            location = '../../../index.html'
          }, 963);
        }
      })

      document.querySelector('.swal2-popup').style.background = '#1b1a1a'
      document.querySelector('.swal2-popup').style.color = 'white'
    
    
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

var widths = [0, 369, 3840];
function resizeFns() {
  if (window.innerWidth<widths[1]) {
     
      Swal.fire({
          icon: 'error',
          title: 'Oops...',
          confirmButtonColor: 'red',
          
          confirmButtonText: 'Close',
          text: 'Your Screen Size must be greator than 369px to run the Todo',
          footer: 'Please Try on a device whose width Greator than 369px '
        }).then((result) => {
          if (result.isConfirmed) {
            location = `../../../index.html`
          }
        })
      

      document.querySelector('.app').style.transform = 'scale(0)'
      

    




  }else{

      document.querySelector('.app').style.transform = 'scale(1)'
  }
}

window.onload = resizeFns;
resizeFns();

window.onresize = resizeFns



window.history.pushState(null, null, window.location.href);
window.onpopstate = function () {
    window.history.go(1);
};