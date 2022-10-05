const signUp = document.getElementById('sign-up'),
      signIn = document.getElementById('sign-in'),
      loginIn = document.getElementById('login-in'),
      loginUp = document.getElementById('login-up')

signUp.addEventListener('click', ()=> {
    loginIn.classList.remove('block')
    loginUp.classList.remove('none')

    loginIn.classList.add('none')
    loginUp.classList.add('block')
})

signIn.addEventListener('click', ()=> {
    loginIn.classList.remove('none')
    loginUp.classList.remove('block')

    loginIn.classList.add('block')
    loginUp.classList.add('none')
})

const signUpForm = document.querySelector('.signup')
signUpForm.addEventListener('submit', e => {
    e.preventDefault()
    const name = signUpForm['name'].value
    const email = signUpForm['email'].value
    const password = signUpForm['password'].value
    signUpForm.reset()
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        return db.collection('users').doc(cred.user.uid).set({
            Name: name,
            Email: email,
            Password: password
        }).then(() => {
            console.log('User Data Created')
            

            


            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 4500,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
              }
            })
            
            Toast.fire({
              icon: 'info',
              title: `${name}, Your Account Created Successfully, Now Please Login`
            })
            document.querySelector('.swal2-popup').style.background = '#1b1a1a'
            document.querySelector('.swal2-popup').style.color = 'white'
            document.querySelector('.swal2-timer-progress-bar').style.background = '#bebcc5'
            loginIn.classList.remove('none')
            loginUp.classList.remove('block')
            loginIn.classList.add('block')
            loginUp.classList.add('none')
            
        }).catch(err => {
            console.log(err.message)
            console.log('Fail To Create User')
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 4500,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              })
              
              Toast.fire({
                icon: 'info',
                title: `${err.message}`
              })

              document.querySelector('.swal2-popup').style.background = '#1b1a1a'
            document.querySelector('.swal2-popup').style.color = 'white'
            document.querySelector('.swal2-timer-progress-bar').style.background = '#bebcc5'

        })
    }).catch(err => {
        console.log(err.message)
        console.log('Fail To Firebase')
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 4500,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          
          Toast.fire({
            icon: 'info',
            title: `${err.message}`
          })

          document.querySelector('.swal2-popup').style.background = '#1b1a1a'
            document.querySelector('.swal2-popup').style.color = 'white'
            document.querySelector('.swal2-timer-progress-bar').style.background = '#bebcc5'


    })
})

const loginForm = document.querySelector('.signin')
loginForm.addEventListener('submit', e => {
    e.preventDefault()
    const loginEmail = loginForm['loginEmail'].value
    const loginPassword = loginForm['loginPassword'].value
    auth.signInWithEmailAndPassword(loginEmail, loginPassword).then(() => {
        console.log("User Login Successfull")
        location = `../User__Todo/index.html`
    }).catch(err => {
        console.log(err.message)
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 4500,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          
          Toast.fire({
            icon: 'info',
            title: `${err.message}`
          })

          document.querySelector('.swal2-popup').style.background = '#1b1a1a'
            document.querySelector('.swal2-popup').style.color = 'white'
            document.querySelector('.swal2-timer-progress-bar').style.background = '#bebcc5'

        console.log('User Login Fail')
    })
})
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
      

      document.querySelector('.login').style.transform = 'scale(0)'
      

    




  }else{

      document.querySelector('.login').style.transform = 'scale(1)'
  }
}

window.onload = resizeFns;
resizeFns();

window.onresize = resizeFns
