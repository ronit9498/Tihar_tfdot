// Grab the things we need from the page
const diyos = document.querySelectorAll(".diyo");
const count = document.getElementById("count");

// Runs every time a diyo is clicked
function updateCount() {
  const lit = document.querySelectorAll(".diyo.lit").length;

  if (lit === diyos.length) {
    count.textContent = "All five are lit. Happy Tihar!";
    document.body.classList.add("all-lit");
  } else {
    count.textContent = lit + " of " + diyos.length + " lit";
    document.body.classList.remove("all-lit");
  }
}

// Make each diyo clickable
diyos.forEach(function (diyo) {
  diyo.addEventListener("click", function () {
    const isLit = diyo.classList.toggle("lit");   // turn on/off
    diyo.setAttribute("aria-pressed", isLit);     // helps screen readers
    updateCount();
  });
});
