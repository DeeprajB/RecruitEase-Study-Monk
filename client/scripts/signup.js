window.onload = function () {
    let tab = 0 // Initial Tab Value
    document.getElementById('signup-title').innerHTML = 'Welcome!'
    showTab(tab)
    document.getElementById('next-button').addEventListener("click", function(){
        tab += 1
        nextTab(tab)
    })
    document.getElementById('prev-button').addEventListener("click", function(){
        tab -= 1
        prevTab(tab)
    })

}

const showTab = n => {
    var x = document.getElementsByClassName("tab");
    x[n].style.display = "block";
}

const nextTab = n => {
    var x = document.getElementsByClassName("tab");
    x[n].style.display = "block";
    x[n-1].style.display = "none";
    switch(n) {
        case 1:
            document.getElementById('signup-title').innerHTML = 'Enter Contact Details'
            document.getElementById('prev-button').style.display = "block"
            break
        case 2:
            document.getElementById('signup-title').innerHTML = 'Enter Company Details'
            break
        case 3:
            document.getElementById('signup-title').innerHTML = 'Enter Few More Details'
            document.getElementById('next-button').style.display = "none"
            document.getElementById('signup-button').style.display = "block"
            break
        default:
            console.log('Error')
    }
}

const prevTab = n => {
    var x = document.getElementsByClassName("tab");
    x[n+1].style.display = "none";
    x[n].style.display = "block";
    switch(n) {
        case 0:
            document.getElementById('signup-title').innerHTML = 'Welcome!'
            document.getElementById('prev-button').style.display = "none"
            break
        case 1:
            document.getElementById('signup-title').innerHTML = 'Enter Contact Details'
            break
        case 2:
            document.getElementById('signup-title').innerHTML = 'Enter Company Details'
            document.getElementById('next-button').style.display = "block"
            document.getElementById('signup-button').style.display = "none"
            break
        default:
            console.log('Error')
    }
}
