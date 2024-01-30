const students = [
  {
    index: 1,
    firstname: "Lavender",
    lastname: "Brown",
    house: "Gryffindor",
    expelled: false
  },
  {
    index: 2,
    firstname: "Cedric",
    lastname: "Diggory",
    house: "Hufflepuff",
    expelled: false
  },
  {
    index: 3,
    firstname: "Roger",
    lastname: "Davies",
    house: "Ravenclaw",
    expelled: false
  },
  {
    index: 4,
    firstname: "Millicent",
    lastname: "Bulstrode",
    house: "Slytherin",
    expelled: false
  }
]

const expelled = [
  {
    index: 5,
    firstname: "Newton",
    lastname: "Scamander",
    house: "Hufflepuff",
    expelled: true
  }
]

const eventListeners = () => {
  const studentDisp = document.querySelector("#students")
  studentDisp.addEventListener("click", (e) => {
    if (e.target.id.includes("expel")) {
      expelStudent(e.target.id)
    }
  })
}

const studentsHTML = (list = students) => {
  //Iterate through input array, converting into HTML for cards
  const htmlString = list.reduce((a, b) => {
    //Determine card class based on house and expulsion status
    const dispClass = b.expelled ? "expelled" : b.house.toLowerCase()
    a += `<div class="card ${dispClass}" style="width: 18rem;">
            <div class="card-body">
              <h5 class="card-title">${b.firstname} ${b.lastname}</h5>
              <p class="card-text"><i>${b.house}</i></p>`
    //Include expel option if student has not yet been expelled
    if (!b.expelled) {
      a += `<a href="#" class="btn btn-outline-dark" id="expel--${b.index}">Expel</a>`
    }
    //Close divs on card
    a += `</div></div>`
    return a
  }, '')
  renderDom('#students', htmlString)
}

const expelStudent = (targetId) => {
  const [,expelId] = targetId.split('--')
  const oustedIndex = students.findIndex(student => student.index == Number(expelId))
  const [ousted] = students.splice(oustedIndex, 1)
  ousted.expelled = true
  expelled.push(ousted)
  studentsHTML(students)
}

const renderDom = (div, htmlToRender) => {
  targetElement = document.querySelector(div)
  targetElement.innerHTML = htmlToRender
}

const startUp = () => {
  eventListeners()
  studentsHTML()
}

startUp()
