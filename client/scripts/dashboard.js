window.onload = async function() {
    const response = await fetch('https://recruit-ease-backend.vercel.app/candidate/getAll');
    const candidates = await response.json();

    var rolefiltered = candidates.candidates;
    var alltable = document.getElementById('alltable');
    populateTable(rolefiltered,alltable)

    var locationinput = document.getElementById('location');
    locationinput.addEventListener('keyup', function(event) {
        var locationSearchedData = rolefiltered.filter(a => a.location.match(event.target.value));
        populateTable(locationSearchedData,alltable)
    });

    var selectfiltered = rolefiltered.filter(a => a.selected == true);
    var selecttable = document.getElementById('selecttable');
    populateTable(selectfiltered,selecttable)
    var candidateinput = document.getElementById('candidate');
    candidateinput.addEventListener('keyup', function(event) {
        var candidateSearchedData = selectfiltered.filter(a => a.name.match(event.target.value));
        populateTable(candidateSearchedData,selecttable)
    });

    var uniqueRoles = [];
    var data = candidates.candidates
    for(i = 0; i< data.length; i++){
        if(uniqueRoles.indexOf(data[i].role) === -1){
            uniqueRoles.push(data[i].role);
        }
    }
    const rolesbutton = document.getElementById('roles-button');
    uniqueRoles.forEach( (item) => {
        const btn = document.createElement('button');
        btn.id = item.replace(' ', '');
        btn.innerText = item;
        btn.classList.add("styled-button")
        rolesbutton.appendChild(btn);
    });
    uniqueRoles.forEach( (item) => {
        const button = document.getElementById(item.replace(' ', ''))
        button.onclick =  function () {
            var isClicked = false
            isClicked = !isClicked
            if (isClicked) {
                console.log(isClicked)
                uniqueRoles.forEach((close) => {
                    if (item!==close){
                        console.log(item+close)
                        const button = document.getElementById(close.replace(' ', ''))
                        isClicked = false
                        console.log(isClicked)
                        button.style.backgroundColor = 'white'
                        button.style.color = 'black'
                    }else{
                        isClicked = true
                        button.style.color = 'white'
                        button.style.backgroundColor = '#323232'
                        genFilters(candidates,item)
                    }
                })
            }
            else{
                uniqueRoles.forEach((close) => {
                    if (item!==close){
                        console.log(item+close)
                        const button = document.getElementById(close.replace(' ', ''))
                        isClicked = false
                        console.log(isClicked)
                        button.style.backgroundColor = 'white'
                        button.style.color = 'black'
                    }
                    else{
                        isClicked = true
                        button.style.color = 'white'
                        button.style.backgroundColor = '#323232'
                        genFilters(candidates,item)
                    }
                })
            }
        }
    });
}

function genFilters(candidates,item) {
    var rolefiltered = candidates.candidates.filter(a => a.role == item);
    var alltable = document.getElementById('alltable');
    populateTable(rolefiltered,alltable)
    var locationinput = document.getElementById('location');
    locationinput.addEventListener('keyup', function(event) {
        var locationSearchedData = rolefiltered.filter(a => a.location.match(event.target.value));
        populateTable(locationSearchedData,alltable)
    });
    var selectfiltered = rolefiltered.filter(a => a.selected == true);
    var selecttable = document.getElementById('selecttable');
    populateTable(selectfiltered,selecttable)
    var candidateinput = document.getElementById('candidate');
    candidateinput.addEventListener('keyup', function(event) {
        var candidateSearchedData = selectfiltered.filter(a => a.name.match(event.target.value));
        populateTable(candidateSearchedData,selecttable)
    });
}

function populateTable(tableData,table) {
    table.innerHTML = '';
    for (let data of tableData) {
      let row = table.insertRow(-1);

      let name = row.insertCell(0);
      name.innerHTML = data.name;

      let email = row.insertCell(1);
      email.innerHTML = data.email;

      let age = row.insertCell(2);
      age.innerHTML = data.age;

      let location = row.insertCell(3);
      location.innerHTML = data.location;

      let role = row.insertCell(4);
      role.innerHTML = data.role;

      let selected = row.insertCell(5);
      selected.innerHTML = data.selected;

      let attachments = row.insertCell(6);
      attachments.innerHTML = data.attachments;

      if(!data.selected){
        let select = row.insertCell(7);
        const btn = document.createElement('button');
        btn.id = data._id;
        btn.innerText = 'Select';
        btn.classList.add("select-button")
        btn.onclick = function() {Select(btn.id)}
        select.appendChild(btn);
      }
    }
}

async function Select(id){
    if (confirm("Do you want to select this candidate?") == true) {
        const res = await fetch(`https://recruit-ease-backend.vercel.app/candidate/${id}`, {
        method: 'PATCH',
        body: JSON.stringify( { selected: true } ),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
    })
    console.log(await res.json())
    location.reload();
    }
}