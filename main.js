// Initiate variables to track current filter page starts at "all"
let currDisp = "all"
// and whether a student has been sorted yet (disregards hard-coded students)
let firstSort = true

const students = [
  // {
  //   index: 1,
  //   firstname: "Lavender",
  //   lastname: "Brown",
  //   house: "Gryffindor",
  //   expelled: false
  // },
  // {
  //   index: 2,
  //   firstname: "Cedric",
  //   lastname: "Diggory",
  //   house: "Hufflepuff",
  //   expelled: false
  // },
  // {
  //   index: 3,
  //   firstname: "Roger",
  //   lastname: "Davies",
  //   house: "Ravenclaw",
  //   expelled: false
  // },
  // {
  //   index: 4,
  //   firstname: "Millicent",
  //   lastname: "Bulstrode",
  //   house: "Slytherin",
  //   expelled: false
  // }
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

// Function call for building event listeners on student cards, filter buttons, and toggle buttons
// Called in sortStudent() upon firstSort
const eventListeners = () => {
  const studentDisp = document.querySelector("#students")
  studentDisp.addEventListener("click", (e) => {
    // Execute event only if click is on an expel button
    if (e.target.id.includes("expel")) {
      // If the expelled array is empty, show Voldemort's Army and corresponding toggle when student is pushed
      // to the array. 
      // NOTE: If hard-coded student is uncommented in expelled array, the Army and toggle will not be displayed.
      if (expelled.length === 0) {showHide('#expelledStudents', '#armyToggle')}
      // Call expel function
      expelStudent(e.target.id)
    }
  })

  const filterDisp = document.querySelector("#filter-bar")
  filterDisp.addEventListener("click", (e) => {
    // Execute only if click in filter-bar corresponds to a specific filter, and not the whole container.
    // (Container is selected if mouse down on one button and mouse up on another after movement.)
    if (e.target.id !== "filter-bar") {
      // Isolate filter choice (either house or 'all') from event ID
      const [house,] = e.target.id.split('-')
      // Call filter function (which continues through to renderDom)
      filterStudents(house)
    }
  })

  document.querySelector("#formToggle").addEventListener("click", (e) => {
    // Toggle sorting hat visibility
    showHide('#hat')
    // Adjust styling/innerHTML of toggle depending on show/hide status
    toggleStyle('#formToggle')
  })
  // Same but for Voldemort's Army toggle (could be refactored into one Event Listener on toggle bar)
  document.querySelector("#armyToggle").addEventListener("click", (e) => {
    showHide('#expelledStudents')
    toggleStyle('#armyToggle')
  })
}

// Change styling on display toggles according to visibility of corresponding elements
const toggleStyle = (element) => {
  const toggleTab = document.querySelector(element)
  // Add class containing styling
  toggleTab.classList.toggle("toggle-out")
  // Destructure current toggle text into array
  const toggleText = toggleTab.innerHTML.split(' ')
  // Toggle text between "Hide xyz" and "Show xyz"
  if (toggleText[0] === "Hide") {
    toggleText[0] = "Show"
  } else {
    toggleText[0] = "Hide"
  }
  // Rejoin and print new text
  toggleTab.innerHTML = toggleText.join(" ")
} 

// Filter students to display according to user-selected display option
const filterStudents = (house) => {
  // Change current display variable to reflect chosen display
  currDisp = house;
  // Adjust student div display based on number of students for chosen display
  sizeStudents()
  // Change header and background for corresponding filter
  document.querySelector('#top').className = `${house}-header`
  document.querySelector('body').className = `${house}-background`
  // If display is 'all', call HTML for all students; else filter student array to specific house and call HTML
  if (house === "all") {
    studentsHTML()
  } else {
    studentsHTML(students.filter(student => student.house.toLowerCase() === house))
  }
}

// Build HTML for rendering of Voldemort's Army (if no value passed, renders full expelled array)
const expelledHTML = (list = expelled) => {
  // Sort students by last name
  const listSort = list.sort((a, b) => a.lastname.localeCompare(b.lastname))
  // Array definition for suffixes to house name of expelled students
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
  // Pass HTML for Voldemort's Army header
  let htmlString = `<div class="card expelled">
                      <div class="card-body expelled army-header">
                        <h4>Voldemort's Army</h4>
                      </div>
                    </div>`
  htmlString += list.reduce((a, b) => {
    // Add HTML for expelled students, selecting random suffix option from appendages array
    a += `<div class="card expelled">
            <div class="card-body expelled">
              <div class="card-left">
                <h5 class="card-title">${b.firstname} ${b.lastname}</h5>
                <p class="card-text"><i>${b.house + appendages[Math.floor(Math.random() * appendages.length)]}</i></p>
              </div>
            </div>
          </div>`
    return a
  }, '')
  // Call function to render expelled students HTML in proper div
  renderDom('#expelledStudents', htmlString)
}

// Build HTML for rendering of sorted students (if no value passed, renders full students array)
const studentsHTML = (list = students) => {
  // Sort students by last name
  const listSort = list.sort((a, b) => a.lastname.localeCompare(b.lastname))
  //Iterate through input array, converting into HTML for cards
  const htmlString = list.reduce((a, b) => {
    //Determine card class based on house, include index in expel button ID
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
  // Format student div based on number to display
  sizeStudents()
  // Render student HTML in students div
  renderDom('#students', htmlString)
}

// Move student from students array to expelled array, input expel button ID
const expelStudent = (targetId) => {
  // Destructure id to obtain student index
  const [,expelId] = targetId.split('--')
  // Find index in students array of expelled student
  const oustedIndex = students.findIndex(student => student.index == Number(expelId))
  // Pull student object from students array
  const [ousted] = students.splice(oustedIndex, 1)
  // Change expelled key on object to reflect expulsion
  ousted.expelled = true
  // Add expelled student to expelled array
  expelled.push(ousted)
  // Re-render students div to reflect missing student, maintaining current display
  filterStudents(currDisp)
  // Call to render expelled array reflecting added student
  expelledHTML()
}

// Utility function to render HTML to corresponding div
const renderDom = (div, htmlToRender) => {
  targetElement = document.querySelector(div)
  targetElement.innerHTML = htmlToRender
}

// Build and render sorting hat form (called in Event Listener in helloForm())
const sortingForm = () => {
  // HTML representation of sorting hat form
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
  // Render sorting hat form to hat div
  renderDom('#hat', formHTML)
  // Add Event Listener to form's "Sort" button
  document.querySelector('#sortingHat').addEventListener('submit', (e) => {
    // Avoid GET request
    e.preventDefault()
    // Push new student to sorting function (user data accessed therein)
    sortStudent()
    // Clear form
    document.querySelector('#sortingHat').reset()
  })
}


// Initial user greeting, called in startUp() on page load
const helloForm = () => {
  // HTML representation of welcome card
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
  // Render card to hat div
  renderDom('#hat', greetingHTML)
  // Add Event Listener for "Enter Great Hall" button
  document.querySelector('#hello-form').addEventListener('click', (e) => {
    // Executes only if click is on button
    if (e.target.id === "enter-sort") {
      // Change header styling to image of Great Hall
      document.querySelector('#top').className = "great-hall"
      // Replace welcome card with sorting hat
      sortingForm()
    }
  })
}

// Assign student random house and build student object from form data
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
  // Add new student object to students array
  students.push(newStudent)
  // If this is the first student sorted, initialize the remainder of the page
  if (firstSort) {
    // Show filters and student div, sorting hat toggle on left
    showHide('#formToggle', '#filter-bar', '#students')
    // Add event listeners to remaining divs
    eventListeners()
    // Render student div for all students
    filterStudents("all")
    // First sort has been completed
    firstSort = false
  } else {
    // If not first sort, filter students according to house assignment
    filterStudents(randomHouse.toLowerCase())
  }
  // If on display where Sorting Hat floats over screen, hide hat after each sort
  if (window.innerWidth <= 600) {
    showHide('#hat')
    toggleStyle('#formToggle')
  }
}

// Adjust students div according to number of cards to be displayed
// NOTE: Rendered moot on small screens due to media queries; .few, .some, .many equalized
const sizeStudents = () => {
  // Determine number of students to be displayed based on current filtering
  const studentsOn = currDisp !== "all" 
    ? students.filter(student => student.house.toLowerCase() === currDisp).length
    : students.length
  const container = document.querySelector("#students")
  // Change number of grid columns in students div based on number of students to be displayed
  if (studentsOn <= 1) {
    container.className = "few" 
  } else if (studentsOn === 2) {
    container.className = "some"
  } else {
    container.className = "many"
  }
}

// Toggle "hide" class for passed elements, accepts multiple
const showHide = (...elements) => {
  // Iterate through all passed elements, toggling visibility
  elements.forEach(element => document.querySelector(element).classList.toggle("hide"))
}

// Display welcome form on startup
const startUp = () => {
  helloForm()
}

// Call startup tasks
startUp()
