let currDisp = "all"
let firstSort = true

const students = [
//   {
//     index: 1,
//     firstname: "Lavender",
//     lastname: "Brown",
//     house: "Gryffindor",
//     expelled: false
//   },
//   {
//     index: 2,
//     firstname: "Cedric",
//     lastname: "Diggory",
//     house: "Hufflepuff",
//     expelled: false
//   },
//   {
//     index: 3,
//     firstname: "Roger",
//     lastname: "Davies",
//     house: "Ravenclaw",
//     expelled: false
//   },
//   {
//     index: 4,
//     firstname: "Millicent",
//     lastname: "Bulstrode",
//     house: "Slytherin",
//     expelled: false
//   }
]

const expelled = [
//   {
//     index: 5,
//     firstname: "Newton",
//     lastname: "Scamander",
//     house: "Hufflepuff",
//     expelled: true
//   }
]

const eventListeners = () => {
  const studentDisp = document.querySelector("#students")
  studentDisp.addEventListener("click", (e) => {
    if (e.target.id.includes("expel")) {
      if (expelled.length === 0) {showHide('#expelledStudents', '#armyToggle')}
      expelStudent(e.target.id)
    }
  })

  const filterDisp = document.querySelector("#filter-bar")
  filterDisp.addEventListener("click", (e) => {
    if (e.target.id !== "filter-bar") {
      const [house,] = e.target.id.split('-')
      filterStudents(house)
    }
  })

  document.querySelector("#formToggle").addEventListener("click", (e) => {
    showHide('#hat')
    toggleStyle('#formToggle')
  })
  document.querySelector("#armyToggle").addEventListener("click", (e) => {
    showHide('#expelledStudents')
    toggleStyle('#armyToggle')
  })
}

const toggleStyle = (element) => {
  const toggleTab = document.querySelector(element)
  toggleTab.classList.toggle("toggle-out")
  const toggleText = toggleTab.innerHTML.split(' ')
  if (toggleText[0] === "Hide") {
    toggleText[0] = "Show"
  } else {
    toggleText[0] = "Hide"
  }
  toggleTab.innerHTML = toggleText.join(" ")
} 

const filterStudents = (house) => {
  currDisp = house;
  sizeStudents()
  document.querySelector('#top').className = `${house}-header`
  document.querySelector('body').className = `${house}-background`
  if (house === "all") {
    studentsHTML()
  } else {
    studentsHTML(students.filter(student => student.house.toLowerCase() === house))
  }
}

const expelledHTML = (list = expelled) => {
  const listSort = list.sort((a, b) => a.lastname.localeCompare(b.lastname))
  const appendages = [
    "'s Shame",
    "'s Misery",
    "'s Wolfsbane",
    "'s Worst",
    "'s Darling Cheater",
    "'s Own Dolores",
    "'s Snallygaster Snot",
    "'s Slug-eater",
    "'s Noxed Wand"]
  let htmlString = `<div class="card expelled" style="width: auto;">
                      <div class="card-body expelled army-header">
                        <h4>Voldemort's Army</h4>
                      </div>
                    </div>`
  htmlString += list.reduce((a, b) => {
    //Determine card class based on house and expulsion status 
    a += `<div class="card expelled" style="width: 16rem;">
            <div class="card-body expelled">
              <div class="card-left">
                <h5 class="card-title">${b.firstname} ${b.lastname}</h5>
                <p class="card-text"><i>${b.house + appendages[Math.floor(Math.random() * appendages.length)]}</i></p>
              </div>
            </div>
          </div>`
    return a
  }, '')
  renderDom('#expelledStudents', htmlString)
}

const studentsHTML = (list = students) => {
  const listSort = list.sort((a, b) => a.lastname.localeCompare(b.lastname))
  //Iterate through input array, converting into HTML for cards
  const htmlString = list.reduce((a, b) => {
    //Determine card class based on house and expulsion status 
    a += `<div class="card ${b.house.toLowerCase()}">
            <div class="card-body">
              <div class="card-left">
                <h5 class="card-title">${b.firstname} ${b.lastname}</h5>
                <p class="card-text"><i>${b.house}</i></p>
              </div>
              <div class="card-right">
                <a href="#" class="btn btn-dark expelled-btn" id="expel--${b.index}">Expel</a>
              </div>
            </div>
          </div>`
    return a
  }, '')
  sizeStudents()
  renderDom('#students', htmlString)
}

const expelStudent = (targetId) => {
  const [,expelId] = targetId.split('--')
  const oustedIndex = students.findIndex(student => student.index == Number(expelId))
  const [ousted] = students.splice(oustedIndex, 1)
  ousted.expelled = true
  expelled.push(ousted)
  filterStudents(currDisp)
  expelledHTML()
}

const renderDom = (div, htmlToRender) => {
  targetElement = document.querySelector(div)
  targetElement.innerHTML = htmlToRender
}

const sortingForm = () => {
  const formHTML = `<form class="form-floating sortingHat" id="sortingHat">
                      <div class="card hat-header-card" style="width: auto;">
                        <div class="card-body hat-header">
                          <h4>Sorting Hat</h4>
                        </div>
                      </div>
                      <div class="form-floating mb-3">
                        <input type="text" class="form-control" id="hatFirstName" placeholder="First Name" required>
                        <label for="hatFirstName">First Name</label>
                      </div>
                      <div class="form-floating mb-3">
                        <input type="text" class="form-control" id="hatLastName" placeholder="Last Name" required>
                        <label for="hatLastName">Last Name</label>
                      </div>
                      <p><i>The sorting hat requires your name</i></p>
                      <button type="submit" class="btn btn-light">Sort</button>
                    </form>`
  renderDom('#hat', formHTML)
  document.querySelector('#sortingHat').addEventListener('submit', (e) => {
    e.preventDefault()
    sortStudent()
    document.querySelector('#sortingHat').reset()
  })
}

const helloForm = () => {
  const greetingHTML = `<div class="hello-card" style="width: 18rem;" id="hello-form">
                          <div class="hello">
                            <h5 class="card-title">Welcome to Hogwarts</h5>
                            <p class="card-text"><i>The start-of-term banquet will begin shortly, but before
                            you take your seats in the Great Hall, you will be sorted
                            into your houses.</i></p>
                            <p class="card-text"><i>The four houses are called Gryffindor, Hufflepuff,
                            Ravenclaw and Slytherin. Each house has its own noble
                            history and each has produced outstanding witches and
                            wizards.</i></p>
                            <p class="card-text"><i>The Sorting Ceremony will take place in a few minutes
                            in front of the rest of the school. I suggest you all
                            smarten yourselves up as much as you can.</i></p>
                            <a href="#" class="btn btn-light" id="enter-sort">Enter Great Hall</a>
                          </div>
                        </div>`
  renderDom('#hat', greetingHTML)
  document.querySelector('#hello-form').addEventListener('click', (e) => {
    if (e.target.id === "enter-sort") {
      document.querySelector('#top').className = "great-hall"
      sortingForm()
    }
  })
}

const sortStudent = () => {

  const houses = ["Gryffindor", "Hufflepuff", "Ravenclaw", "Slytherin"]
  //Choose random house from houses array...
  let randomHouse = houses[Math.floor(Math.random() * 4)]
  //But sort all Weasleys into Gryffindor
  if (document.querySelector('#hatLastName').value.toLowerCase() === "weasley") {
    randomHouse = "Gryffindor";
  }
  //Create new Student object from user entry and random house assignment
  const newStudent = {
    index: students.length + expelled.length + 1,
    firstname: document.querySelector('#hatFirstName').value,
    lastname: document.querySelector('#hatLastName').value,
    house: randomHouse,
    expelled: false
  }
  
  students.push(newStudent)
  if (firstSort) {
    showHide('#formToggle', '#filter-bar', '#students')
    eventListeners()
    studentsHTML()
    expelledHTML()
    document.querySelector('#top').innerHTML = ""
    filterStudents("all")
    firstSort = false
  } else {
    filterStudents(randomHouse.toLowerCase())
  }
}

const sizeStudents = () => {
  const studentsOn = currDisp !== "all" 
    ? students.filter(student => student.house.toLowerCase() === currDisp).length
    : students.length
  const container = document.querySelector("#students")
  if (studentsOn <= 1) {
    container.className = "few" 
  } else if (studentsOn === 2) {
    container.className = "some"
  } else {
    container.className = "many"
  }
}

const showHide = (...elements) => {
  elements.forEach(element => document.querySelector(element).classList.toggle("hide"))
}

const startUp = () => {
  helloForm()
}

startUp()
