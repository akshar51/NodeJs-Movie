const seatPrice = 200; 
let selectedSeats = [];
let bookings = [];

const checkoutBtn = document.getElementById("checkoutBtn");
const seatElements = document.querySelectorAll(".seat");
const toastLiveExample = document.getElementById('liveToast')
const AtleastOneSeat = document.getElementById('seatSelect')


    // Handle seat selection
seatElements.forEach(seat => {
      seat.addEventListener("click", () => {
        const seatNumber = seat.dataset.seat;

        if (selectedSeats.includes(seatNumber)) {
          // Remove if already selected
          selectedSeats = selectedSeats.filter(s => s !== seatNumber);
          seat.classList.remove("selected");
        } else {
          selectedSeats.push(seatNumber);
          seat.classList.add("selected");
        }
      });
    });

// checkout
checkoutBtn.addEventListener("click", () => {
      if (selectedSeats.length === 0) {
        const toastBootstrap = bootstrap.Toast.getOrCreateInstance(AtleastOneSeat);
        toastBootstrap.show();
        return;
      }

      let booking = {
        seats: [...selectedSeats],
        price : seatPrice * selectedSeats.length,
        date: dateSelect.value,
      time: timeSelect.value  
      };

      // Push to booking
      bookings.push(booking);

      console.log("Bookings:", bookings);

      // Reset selection for new user
      selectedSeats = [];
      seatElements.forEach(seat => seat.classList.remove("selected"));
      dateSelect.value = "";
  timeSelect.value = "";

    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
    toastBootstrap.show();
    });

// date & time
const dateSelect = document.getElementById("showDate");
const timeSelect = document.getElementById("showTime");

function populateDates() {
  const today = new Date();
  for (let i = 0; i <= 2; i++) {
    const date = new Date();
    date.setDate(today.getDate() + i);

    const options = { weekday: 'short', day: 'numeric', month: 'short' };
    const formatted = date.toLocaleDateString(undefined, options);

    const opt = document.createElement("option");
    opt.value = date.toISOString().split("T")[0]; // yyyy-mm-dd
    opt.textContent = formatted;
    dateSelect.appendChild(opt);
  }
}
populateDates();