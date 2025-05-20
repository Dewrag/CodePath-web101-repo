// Step 1: Select the theme button
const themeButton = document.getElementById("theme-button");

// Step 2: Write the callback function
const toggleDarkMode = () => {
  document.body.classList.toggle("dark-mode");
};

// Step 3: Register a 'click' event listener for the theme button
themeButton.addEventListener("click", toggleDarkMode);


let rsvpCount = 0;
const submitBtn = document.getElementById("rsvp-button");
const nameInput = document.getElementById("name-input");
const emailInput = document.getElementById("email-input");
const phoneInput = document.getElementById("phone-input");
const rsvpList = document.querySelector(".rsvp-participants");
const countDisplay = document.getElementById("rsvp-count");
const form = document.getElementById("rsvp-form");

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function isValidPhone(phone) {
  return /^\+?\d{10,15}$/.test(phone);
}

// Step 1-A: Create a reusable validation function that takes a person object
function validateForm(person) {
  let isValid = true;

  // Reset input styling
  nameInput.classList.remove("invalid");
  emailInput.classList.remove("invalid");
  phoneInput.classList.remove("invalid");

  if (person.name === "") {
    nameInput.classList.add("invalid");
    isValid = false;
  }

  if (!isValidEmail(person.email)) {
    emailInput.classList.add("invalid");
    isValid = false;
  }

  if (!isValidPhone(person.phone)) {
    phoneInput.classList.add("invalid");
    alert("Please enter a valid phone number.");
    isValid = false;
  }

  if (!person.attendance) {
    alert("Please select Yes or No for Attendance.");
    isValid = false;
  }

  return isValid;
}

// Step 1-B: Add person to RSVP list if valid
function addParticipant(person) {
  if (person.attendance === "Yes") {
    const entry = document.createElement("p");
    entry.textContent = `🎟️ ${person.name} has RSVP'd.`;
    rsvpList.appendChild(entry);
    rsvpCount++;
    countDisplay.textContent = rsvpCount;
  } else {
    const errMsg = document.createElement("p");
    errMsg.textContent = `Must select 'Yes' to join RSVP List.`;
    errMsg.classList.add("error-msg");
    form.appendChild(errMsg);
  }
}

submitBtn.addEventListener('click', function(event) {
  event.preventDefault();

  // Create person object with input values
  const person = {
    name: nameInput.value.trim(),
    email: emailInput.value.trim(),
    phone: phoneInput.value.trim(),
    attendance: form.elements["attendance"].value
  };

  // Validate and add
  if (validateForm(person)) {
    addParticipant(person);
    toggleModal(person);
    form.reset();
  }
});
const toggleModal = (person) => {
  // Select modal elements
  const modal = document.querySelector('.modal');
  const modalContent = document.querySelector('.model-container');

  // Update modal display to flex
  modal.style.display = 'flex';

  // Set modal timeout to 5 seconds
  setTimeout(() => {
      modal.style.display = 'none';
  }, 5000);
}
let rotateFactor = 0;
const modalImage = document.querySelector('.modal-image');
function animateImage() {
  const x = Math.sin(Date.now() / 200) * 10; // wiggle left/right 10px
  const y = Math.cos(Date.now() / 200) * 5;  // wiggle up/down 5px
  modalImage.style.transform = `translate(${x}px, ${y}px)`;
}
const closeButton = document.getElementById('close-button');

// Create a function to hide the modal
function closeModal() {
  const modal = document.querySelector('.modal');
  modal.style.display = 'none';
}

// Listen for clicks on the Close button
closeButton.addEventListener('click', closeModal);

const music = document.getElementById('background-music');

function toggleMusic() {
    if (music.paused) {
        music.play();
    } else {
        music.pause();
    }
}