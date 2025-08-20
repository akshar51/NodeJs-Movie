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
      };

      // Push to booking
      bookings.push(booking);

      console.log("Bookings:", bookings);

      // Reset selection for new user
      selectedSeats = [];
      seatElements.forEach(seat => seat.classList.remove("selected"));

    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
    toastBootstrap.show();
    });

