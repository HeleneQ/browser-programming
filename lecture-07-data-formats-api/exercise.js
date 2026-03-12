const output = document.getElementById("output");

const list = document.getElementById("userList");
list.innerHTML = "";

function log(text){
    output.textContent += text + "\n";
}

function clearOutput(){
    output.textContent = "";
}

document.getElementById("btnLoadUsers").onclick = loadUsers;

async function loadUsers(){

    clearOutput();

    // C: Add error handling
    try{
        // A: fetch Data
        const response = await fetch("https://jsonplaceholder.typicode.com/users");

        if(!response.ok){
            throw new Error("HTTP error: " + response.status);
        }


        const data = await response.json();
        console.log(data);

        // B: print user information

        data.forEach(function(user){
            // E: change for display in webpage
            
            // log(user.name + " - " + user.email + " - " + user.address.city);

            const li = document.createElement("li");
            li.innerText = user.name + " - " + user.email + " - " + user.address.city;
            list.appendChild(li);
        })

    } catch(error) {
        log("Error: "+error.message);

    }

    //
}