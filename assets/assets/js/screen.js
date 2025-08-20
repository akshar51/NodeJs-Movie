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
         updatePrice(); 
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
      renderBookings()

      console.log("Bookings:", bookings);

      // Reset selection for new user
      selectedSeats = [];
      seatElements.forEach(seat => seat.classList.remove("selected"));
      dateSelect.value = "";
      timeSelect.value = "";
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


// Booking in canvas
function renderBookings() {
  const bookingList = document.getElementById("bookingList");
  const totalPrice = document.getElementById('totalPrice')
  bookingList.innerHTML = "";

  if (bookings.length === 0) {
    bookingList.innerHTML = `<p class="text-white text-center">No tickets booked yet.</p>`;
    totalPrice.innerHTML = "";  
    return; 
  }

  bookings.forEach((booking) => {
    bookingList.innerHTML += `
      <div class="ticket-info border p-3 rounded mb-3">
        <div class="d-flex gap-3">
          <img src="/assets/img/tickets-ticket-svgrepo-com.svg" alt="ticket" style="width: 80px; height: 80px;">
          <div class="ticket-detail">
            <h6>${formatDate(booking.date)}</h6>
            <h6>${booking.time}</h6>
            <div class="canvas-seat mt-3 d-flex gap-2 flex-wrap">
              ${booking.seats.map(seat => `
                <div class="bookSeat">${seat}</div>
              `).join("")}
            </div>
          </div>
        </div>
      </div>
    `;

    const grandTotal = bookings.reduce((sum, b) => sum + b.price, 0);
    totalPrice.innerHTML = `
    <div id="priceFooter" class="offcanvas-footer p-3 bg-dark text-white rounded mb-3" data-bs-dismiss="offcanvas">
      <a href="#" id="footerBookBtn" class="btn btn-success w-100">Book ticket 
        <i class="fa-solid fa-arrow-right" style="color: #ffffff;"></i>
        ₹ ${grandTotal}
      </a>
    </div>
  `;
  });
}
renderBookings()

// Update price 
function updatePrice() {
  const total = seatPrice * selectedSeats.length;
  document.getElementById("totalPrice").textContent = `₹${total}`;
}

// boot ticket btn click toast 
document.addEventListener("click", (e) => {
  if (e.target && e.target.id === "footerBookBtn") {
    e.preventDefault(); // stop page reload
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
    toastBootstrap.show();
  }
});

// Date format
function formatDate(dateString) {
  const date = new Date(dateString); // parse yyyy-mm-dd
  const options = { day: "numeric", month: "short", year: "numeric" };
  return date.toLocaleDateString("en-GB", options).replace(/ /g, " ");
}