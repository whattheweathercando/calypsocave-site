const markdownIt = require("markdown-it");

module.exports = function (eleventyConfig) {

    // https://www.11ty.dev/docs/data-deep-merge/
    // defaults to true in 1.0, use false to opt-out
    // eleventyConfig.setDataDeepMerge(true);

    
    // Copy `css/` to `dist/img`
    // passthrough file copy paths are relative to the project root
    eleventyConfig.addPassthroughCopy("src/css");
    eleventyConfig.addPassthroughCopy("src/js");
    eleventyConfig.addPassthroughCopy("src/img");
    eleventyConfig.addPassthroughCopy("src/data");
    
    // Layout alias
    eleventyConfig.addLayoutAlias('base', 'layouts/base.njk');

    // https://www.seanmcp.com/articles/send-data-to-the-window-with-eleventy/
    // eleventyConfig.addShortcode("expose", data => {
    //     return `<script>
    //         window.calypsoData = ${JSON.stringify(data)};
    //         // console.log(calypsoData);
    //     </script>`;
    // });    

    return {
        dir: {
            input: "src",
            includes: "_includes",
            data: "_data",
            output: "dist",
        },
        templateFormats: [
            "njk",
            "liquid",
            "md",
            "html"
        ],
        htmlTemplateEngine: "njk",
        markdownTemplateEngine: "njk",
        // dataTemplateEngine: "11ty.js",
        passthroughFileCopy: true
    };
};