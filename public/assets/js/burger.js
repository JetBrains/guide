const navbarBurger = document.getElementById("navbarBurger");
const navMenuIndex = document.getElementById("navMenuIndex");
if (navbarBurger) {
  navbarBurger.addEventListener("click", ({ currentTarget }) => {
    if (navMenuIndex) {
      currentTarget.classList.toggle("is-active");
      navMenuIndex.classList.toggle("is-active");
    }
  });
}
