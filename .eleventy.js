module.exports = function (eleventyConfig) {
  // Passthrough copy
  eleventyConfig.addPassthroughCopy("src/assets/css");
  eleventyConfig.addPassthroughCopy("src/assets/js");
  eleventyConfig.addPassthroughCopy("src/assets/img");
  eleventyConfig.addPassthroughCopy("src/assets/fonts");
  eleventyConfig.addPassthroughCopy("src/uploads");
  eleventyConfig.addPassthroughCopy("admin");

  // Collections
  eleventyConfig.addCollection("news", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("src/content/news/*.md")
      .sort((a, b) => b.date - a.date);
  });

  eleventyConfig.addCollection("clubs", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("src/content/clubs/*.md")
      .sort((a, b) => a.data.title.localeCompare(b.data.title, "de"));
  });

  eleventyConfig.addCollection("board", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("src/content/board/*.md")
      .sort((a, b) => (a.data.order || 99) - (b.data.order || 99));
  });

  eleventyConfig.addCollection("documents", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("src/content/documents/*.md")
      .sort((a, b) => b.date - a.date);
  });

  eleventyConfig.addCollection("rankings", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("src/content/rankings/*.md")
      .sort((a, b) => b.date - a.date);
  });

  eleventyConfig.addCollection("records", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("src/content/records/*.md")
      .sort((a, b) => a.data.title.localeCompare(b.data.title, "de"));
  });

  // Filters
  eleventyConfig.addFilter("dateFormat", function (date) {
    if (!date) return "";
    const d = new Date(date);
    return d.toLocaleDateString("de-DE", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  });

  eleventyConfig.addFilter("dateISO", function (date) {
    if (!date) return "";
    return new Date(date).toISOString().split("T")[0];
  });

  eleventyConfig.addFilter("limit", function (arr, limit) {
    return arr.slice(0, limit);
  });

  eleventyConfig.addFilter("filterByCategory", function (arr, category) {
    if (!category) return arr;
    return arr.filter((item) => item.data.category === category);
  });

  eleventyConfig.addFilter("excerpt", function (content) {
    if (!content) return "";
    const text = content.replace(/<[^>]*>/g, "");
    return text.length > 200 ? text.substring(0, 200) + "…" : text;
  });

  eleventyConfig.addFilter("year", function () {
    return new Date().getFullYear();
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    templateFormats: ["njk", "md", "html"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
