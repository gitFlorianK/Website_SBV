document.addEventListener("DOMContentLoaded", function () {
  // Document search/filter
  var docSearch = document.getElementById("doc-search");
  var docCategoryFilter = document.getElementById("doc-category-filter");
  var docList = document.getElementById("documents-list");

  if (docSearch && docList) {
    function filterDocs() {
      var query = docSearch.value.toLowerCase();
      var category = docCategoryFilter ? docCategoryFilter.value : "";
      var items = docList.querySelectorAll(".doc-item");

      items.forEach(function (item) {
        var title = item.getAttribute("data-title") || "";
        var itemCategory = item.getAttribute("data-category") || "";

        var matchesSearch = !query || title.indexOf(query) !== -1;
        var matchesCategory = !category || itemCategory === category;

        item.style.display = matchesSearch && matchesCategory ? "" : "none";
      });
    }

    docSearch.addEventListener("input", filterDocs);
    if (docCategoryFilter) {
      docCategoryFilter.addEventListener("change", filterDocs);
    }
  }

  // Result season filter
  var seasonFilter = document.getElementById("result-season-filter");
  var resultsList = document.getElementById("results-list");

  if (seasonFilter && resultsList) {
    seasonFilter.addEventListener("change", function () {
      var season = seasonFilter.value;
      var items = resultsList.querySelectorAll(".doc-item");

      items.forEach(function (item) {
        var itemSeason = item.getAttribute("data-season") || "";
        item.style.display = !season || itemSeason === season ? "" : "none";
      });
    });
  }
});
