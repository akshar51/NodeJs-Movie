 const dateButtons = document.querySelectorAll(".date-btn");

dateButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      dateButtons.forEach(b => b.classList.remove("selected"));
        btn.classList.add("selected");
      });
  });