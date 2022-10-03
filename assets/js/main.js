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