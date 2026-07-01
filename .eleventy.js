const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");

module.exports = function (eleventyConfig) {
  // Passthrough copies
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("public");
  eleventyConfig.addPassthroughCopy("admin");

  // Markdown library
  const md = markdownIt({
    html: true,
    breaks: true,
    linkify: true,
    typographer: true,
  }).use(markdownItAnchor, {
    permalink: false,
  });
  eleventyConfig.setLibrary("md", md);

  // Collections
  eleventyConfig.addCollection("blogPosts", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("content/blog/*.md")
      .filter((item) => !item.data.draft)
      .sort((a, b) => b.date - a.date);
  });

  eleventyConfig.addCollection("approvedStories", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("content/stories/*.md")
      .filter((item) => item.data.approved === true)
      .sort((a, b) => b.date - a.date);
  });

  // content/about.md lives outside the "src" input directory (the CMS writes
  // it to the repo root), so Eleventy never scans it as a template. Read it
  // directly as global data instead.
  eleventyConfig.addGlobalData("about", function () {
    const filePath = path.join(__dirname, "content/about.md");
    if (!fs.existsSync(filePath)) return {};
    return matter(fs.readFileSync(filePath, "utf8")).data;
  });

  eleventyConfig.addCollection("allResources", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("content/resources/*.md")
      .sort((a, b) => {
        if (a.data.title < b.data.title) return -1;
        if (a.data.title > b.data.title) return 1;
        return 0;
      });
  });

  // Filters
  eleventyConfig.addFilter("readingTime", function (content) {
    if (!content) return "1 min read";
    const wordsPerMinute = 200;
    const wordCount = content.trim().split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return minutes === 1 ? "1 min read" : `${minutes} min read`;
  });

  eleventyConfig.addFilter("formatDate", function (date) {
    if (!date) return "";
    const d = new Date(date);
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  });

  eleventyConfig.addFilter("isoDate", function (date) {
    if (!date) return "";
    return new Date(date).toISOString();
  });

  eleventyConfig.addFilter("limit", function (array, limit) {
    if (!Array.isArray(array)) return [];
    return array.slice(0, limit);
  });

  eleventyConfig.addFilter("groupBy", function (array, key) {
    if (!Array.isArray(array)) return {};
    return array.reduce((groups, item) => {
      const val = item.data ? item.data[key] : item[key];
      if (!groups[val]) groups[val] = [];
      groups[val].push(item);
      return groups;
    }, {});
  });

  eleventyConfig.addFilter("keys", function (obj) {
    if (!obj) return [];
    return Object.keys(obj);
  });

  eleventyConfig.addFilter("stripHtml", function (str) {
    if (!str) return "";
    return str.replace(/<[^>]*>/g, "");
  });

  eleventyConfig.addFilter("markdownify", function (str) {
    if (!str) return "";
    return md.render(str);
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
  };
};
