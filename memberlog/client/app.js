console.log("connected")

let body = document.querySelector("body")
let addMemButton = document.getElementById("addMem")
let membersbox = document.getElementById("membersbox")
let userform = document.getElementById("userform")

userform.style.display = "none"

function load() {
    document.querySelectorAll(".member").forEach(el => el.remove())

    fetch("http://127.0.0.1:5000/members")
        .then(response => response.json())
        .then(data => {
            console.log(data);
            data.forEach(member => load_members(member))
    })
}

function load_members(member) {
    let div = document.createElement("div")
    div.classList.add("member")

    let memberbanner = document.createElement("div")
    memberbanner.classList.add("memberbanner")

    // h3 = member name
    let h3 = document.createElement("h3")
    let h3Input = document.createElement("input")
    h3Input.style.display = "none"

    // label1 = member age
    let label1 = document.createElement('label')
    let item1 = document.createElement('label')
    let item1Input = document.createElement('input')
    item1Input.style.display = "none"

    // label2 = member date of birth
    let label2 = document.createElement('label')
    let item2 = document.createElement('label')
    let item2Input = document.createElement('input')
    item2Input.style.display = "none"

    // label3 = member email
    let label3 = document.createElement('label')
    let item3 = document.createElement('label')
    let item3Input = document.createElement('input')
    item3Input.style.display = "none"

    // label4 = member phone number
    let label4 = document.createElement('label')
    let item4 = document.createElement('label')
    let item4Input = document.createElement('input')
    item4Input.style.display = "none"


    // adds classes to items and item inputs
    h3.classList.add("h3")
    h3Input.classList.add("h3Input")

    label1.classList.add("label1")
    item1.classList.add("item1")
    item1Input.classList.add("item1Input")

    label2.classList.add("label2")
    item2.classList.add("item2")
    item2Input.classList.add("item2Input")

    label3.classList.add("label3")
    item3.classList.add("item3")
    item3Input.classList.add("item3Input")

    label4.classList.add("label4")
    item4.classList.add("item4")
    item4Input.classList.add("item4Input")

    // delete member button
    let delButton = document.createElement("button")
    delButton.classList.add("delbutton")

    // edit member button
    let seditButton = document.createElement("button")
    seditButton.classList.add("seditbutton")

    // save edits made to member button
    let editButton = document.createElement("button")
    editButton.classList.add("editbutton")
    editButton.style.display = "none"

    // when delete button is pressed
    delButton.onclick = function () {
        do_delete(member.id)
    }

    // when edit member button is pressed
    seditButton.onclick = function () {
        start_edit(member.id)
        seditButton.style.display = "none"
        editButton.style.display = ""

        h3.style.display = "none"
        h3Input.style.display = ""

        item1.style.display = "none"
        item1Input.style.display = ""

        item2.style.display = "none"
        item2Input.style.display = ""

        item3.style.display = "none"
        item3Input.style.display = ""

        item4.style.display = "none"
        item4Input.style.display = ""

    }

    // when save edit button is pressed
    editButton.onclick = function () {
        do_edit(member.id)
        seditButton.style.display = ""
        editButton.style.display = "none"

        h3.style.display = ""
        h3Input.style.display = "none"

        item1.style.display = ""
        item1Input.style.display = "none"

        item2.style.display = ""
        item2Input.style.display = "none"

        item3.style.display = ""
        item3Input.style.display = "none"

        item4.style.display = ""
        item4Input.style.display = "none"
    }

    h3.textContent = member.name
    h3Input.value = h3.textContent // puts members name into input field for editing

    label1.textContent = "Age: "
    item1.textContent = member.age
    item1Input.value = item1.textContent // puts members age into input field for editing

    label2.textContent = "Date of Birth: "
    item2.textContent = member.dob
    item2Input.value = item2.textContent // puts members date of birth into input field for editing
    item2Input.type = "date"

    label3.textContent = "Email: "
    item3.textContent = member.email
    item3Input.value = item3.textContent // puts members email into input field for editing

    label4.textContent = "Phone Number: "
    item4.textContent = member.pnumber
    item4Input.value = item4.textContent // puts members phone number into input field for editing

    delButton.innerHTML = "Delete Member"
    seditButton.innerHTML = "Edit Member"
    editButton.innerHTML = "Save Edit"

    // appends items, inputs, and buttons to div
    memberbanner.appendChild(h3)
    memberbanner.appendChild(h3Input)
    div.appendChild(memberbanner)
    div.appendChild(label1)
    div.appendChild(item1)
    div.appendChild(item1Input)

    div.appendChild(label2)
    div.appendChild(item2)
    div.appendChild(item2Input)

    div.appendChild(label3)
    div.appendChild(item3)
    div.appendChild(item3Input)

    div.appendChild(label4)
    div.appendChild(item4)
    div.appendChild(item4Input)
    
    div.appendChild(delButton)
    div.appendChild(seditButton)
    div.appendChild(editButton)

    div.setAttribute("data-id", member.id)

    membersbox.append(div)
    
}

// DELETE method
function do_delete(id) {
    console.log("Your are going to delete member: ", id)
    fetch("http://127.0.0.1:5000/members/"+id, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    })
        .then(function(response) {
            console.log("Deleted")
            load()
        })
}

function start_edit(id) {
    console.log("Started editing member: ", id)
    
}

// PUT method
function do_edit(id) {
    console.log("Edited member: ", id)
    let memberDiv = document.querySelector(`.member[data-id="${id}"]`)
    
    let nameInput = memberDiv.querySelector(".h3Input")
    let ageInput = memberDiv.querySelector(".item1Input")
    let dobInput = memberDiv.querySelector(".item2Input")
    let emailInput = memberDiv.querySelector(".item3Input")
    let pnumberInput = memberDiv.querySelector(".item4Input")

    let name = nameInput.value
    let age = ageInput.value
    let dob = dobInput.value
    let email = emailInput.value
    let pnumber = pnumberInput.value

    let data = "name=" + encodeURIComponent(name)
    data += "&age=" + encodeURIComponent(age)
    data += "&dob=" + encodeURIComponent(dob)
    data += "&email=" + encodeURIComponent(email)
    data += "&pnumber=" + encodeURIComponent(pnumber)
    
    fetch("http://127.0.0.1:5000/members/"+id, {
        method: "PUT",
        body: data,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    })
        .then(function(response) {
            console.log("Edited: ", id)
            load()
        })
        .catch(error => {
            console.error("Edit failed:", error)
        })
}

let submit = document.querySelector("#submit")

// POST method
function addMember() {
    let name = document.querySelector("#member_input_name").value || "missing or NA"
    let age = document.querySelector("#member_input_age").value || "missing or NA"
    let dob = document.querySelector("#member_input_dob").value || "missing or NA"
    let email = document.querySelector("#member_input_email").value || "missing or NA"
    let pnumber = document.querySelector("#member_input_pnumber").value || "missing or NA"

    console.log("name: ", name)
    console.log("age: ", age)
    console.log("dob: ", dob)
    console.log("email: ", email)
    console.log("pnumber: ", pnumber)

    let data = "name=" + encodeURIComponent(name)
    data += "&age=" + encodeURIComponent(age)
    data += "&dob=" + encodeURIComponent(dob)
    data += "&email=" + encodeURIComponent(email)
    data += "&pnumber=" + encodeURIComponent(pnumber)
    console.log(data)

    fetch("http://127.0.0.1:5000/members", {
        method: "POST",
        body: data,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    })
        .then(function(response) {
            console.log("saved")
            load()
        })
        .catch(error => {
            console.error("Saving failed:", error)
        })
}

addMemButton.onclick = function () {
    userform.style.display = ""
    addMemButton.style.display = "none"
}

submit.onclick = function() {
    addMember()
    addMemButton.style.display = ""
}
load()