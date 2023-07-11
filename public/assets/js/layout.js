window.addEventListener("load", function (event) {
  const referenceDate = new Date();
  referenceDate.setDate(referenceDate.getDate() - 30);

  document
    .querySelectorAll("time.bio-common-card-published")
    .forEach((element) => {
      const resourceDate = new Date(element.attributes["datetime"].value);
      if (resourceDate > referenceDate) {
        element
          .closest(".bio-resourcecard")
          .classList.add("has-background-info-light");
        element
          .closest(".content")
          .insertAdjacentHTML(
            "afterbegin",
            '<span class="tag is-warning is-pulled-right">New</span>'
          );
      }
    });
});
