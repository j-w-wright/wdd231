

const navbutton = document.querySelector('#ham-btn'); // # is for an ID
const navBar = document.querySelector('#nav-bar');
// Toggle the show class off and on //
navbutton.addEventListener('click', () => {
    navbutton.classList.toggle('show');
    navBar.classList.toggle('show');
});

// -------------------------------------- Footer Copyright and Last Modified ------------------------------------------- //
const date = new Date();
const currentYear = date.getFullYear();
document.getElementById("currentYear").innerHTML = currentYear;

const lastModified = new Date(document.lastModified);
document.getElementById("lastModified").innerHTML = lastModified.toLocaleDateString();


// --------------------------------------- List of course information --------------------------------------------------- //
const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
]

// --------------------------------------------------------------- Filtering ----------------------------------------------------------------//
// filtering of courses when the buttons are clicked on the website.
// filtering includes subject, number, and whether the course is completed

createCourseCard(courses);

const allCoursesLink = document.querySelector("#all");
const wddCoursesLink = document.querySelector("#wdd");
const cseCoursesLink = document.querySelector("#cse");

allCoursesLink.addEventListener("click", () => {
    createCourseCard(courses.filter(course => course));
});

wddCoursesLink.addEventListener("click", () => {
    createCourseCard(courses.filter(course => course.subject.includes("WDD")));
});

cseCoursesLink.addEventListener("click", () => {
    createCourseCard(courses.filter(course => course.subject.includes("CSE")));
});

function createCourseCard(filteredCourses) {
    const grid = document.querySelector(".course-grid");
    grid.innerHTML = "";
    filteredCourses.forEach(course => {
        let card = document.createElement("section");
        card.classList.add("course-card");
        card.innerHTML = `
            <h3>${course.completed ? "✓" : ""} ${course.subject} ${course.number}</h3>`;
    

        grid.appendChild(card);
        // Update the course credits total
    const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    document.getElementById("courseCredits").textContent = `The total number of credit hours from courses listed below is ${totalCredits}`;
    });

}

