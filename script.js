let courses = document.querySelector('#courses-list'),
    clearCart = document.querySelector('#clear-cart'),
    cartContent = document.querySelector('#cart-content tbody'),
    indicator = document.querySelector('.indicator');

let  cart_count = document.getElementById('cart_count');
   


    courses.addEventListener('click', addToCart);
    cartContent.addEventListener('click', removeCourse);
    clearCart.addEventListener('click', removeAllCourses);
    document.addEventListener('DOMContentLoaded', loadFromLocalStorage);

function addToCart(event) {
    event.preventDefault();
    if (event.target.classList.contains('add-to-cart')) {
        let course = event.target.parentElement.parentElement;
        getCourseInfo(course);
    }
}
function getCourseInfo(course) {
    
    const courseDetails = {
        image: course.querySelector('img').src,
        title: course.querySelector('h4').textContent,
        price: course.querySelector('.new-price').textContent,
        id: course.querySelector('a').getAttribute('data-id')
    };
    loadIntoCart(courseDetails);
}

function loadIntoCart(details) {
    const row = document.createElement('tr');
    row.innerHTML = `
         <td> <img src=${details.image} width=100></td>
         <td>${details.title}</td>
         <td>${details.price}</td>
         <td><a href="#" class="remove" id=${details.id}>X</a></td>
    `;
    cartContent.appendChild(row);
    addToLocalStorage(details)
}

function getItemFromLocalStorage() {
    let item = localStorage.getItem('course')
    if(item === null) {
        item = [];
    }
    else {
        item = JSON.parse(item)
    }
    return item;
}

function addToLocalStorage(details) {
    let courseInfo = getItemFromLocalStorage();
    courseInfo.push(details);
    localStorage.setItem('course', JSON.stringify(courseInfo));
    clearCart.style.display ="block"
    cart_count.innerHTML = `${courseInfo.length}`
}

function loadFromLocalStorage() {
    let courseList = getItemFromLocalStorage();
    if(courseList.length>0){
    courseList.forEach(function(course) {
        let entry = document.createElement('tr');

        entry.innerHTML = `
         <td> <img src=${course.image} width=100></td>
         <td>${course.title}</td>
         <td>${course.price}</td>
         <td><a href="#" class="remove" id=${course.id}>X</a></td>
        `;
        cartContent.appendChild(entry);
        clearCart.style.display ="block"
    })
}
else{
    clearCart.style.display ="none"
}
cart_count.innerHTML = `${courseList.length}`
}

function removeCourse(event) {
    if (event.target.classList.contains('remove')) {
        let idCart = event.target.parentElement.parentElement.querySelector('a').getAttribute('id')
        removeCourseLocalStorage(idCart);
        event.target.parentElement.parentElement.remove();
    }
    let courseList = getItemFromLocalStorage();
    cart_count.innerHTML = `${courseList.length}`
}

function removeCourseLocalStorage(idCart) {
    courses = getItemFromLocalStorage();
    courses.forEach(function(obj, index) {
        if (obj.id == idCart)
            courses.splice(index, 1)
    });
    localStorage.setItem('course', JSON.stringify(courses));
    if(courses.length == 0){
        clearCart.style.display ="none";
    }
    cart_count.innerHTML = `${courses.length}`
}


function removeAllCourses() {
    while(cartContent.firstChild) {
        cartContent.removeChild(cartContent.firstChild);
    }
    localStorage.removeItem('course');
    clearCart.style.display ="none";
    cart_count.innerHTML = `0`;
}