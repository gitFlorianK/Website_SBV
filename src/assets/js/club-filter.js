document.addEventListener("DOMContentLoaded", function () {
  var search = document.getElementById("club-search");
  var disciplineFilter = document.getElementById("club-discipline-filter");
  var grid = document.getElementById("clubs-grid");

  if (!search || !grid) return;

  function filterClubs() {
    var query = search.value.toLowerCase();
    var discipline = disciplineFilter ? disciplineFilter.value : "";
    var cards = grid.querySelectorAll(".card");

    cards.forEach(function (card) {
      var title = card.querySelector(".card__title");
      var city = card.getAttribute("data-city") || "";
      var disciplines = card.getAttribute("data-disciplines") || "";
      var text = (title ? title.textContent : "") + " " + city;

      var matchesSearch = !query || text.toLowerCase().indexOf(query) !== -1;
      var matchesDiscipline =
        !discipline || disciplines.indexOf(discipline) !== -1;

      card.style.display = matchesSearch && matchesDiscipline ? "" : "none";
    });
  }

  search.addEventListener("input", filterClubs);
  if (disciplineFilter) {
    disciplineFilter.addEventListener("change", filterClubs);
  }
});
