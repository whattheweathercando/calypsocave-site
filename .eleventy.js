const markdownIt = require("markdown-it");

module.exports = function (eleventyConfig) {

    // https://www.11ty.dev/docs/data-deep-merge/
    eleventyConfig.setDataDeepMerge(true);

    
    // Copy `css/` to `dist/img`
    // passthrough file copy paths are relative to the project root
    eleventyConfig.addPassthroughCopy("src/css");
    eleventyConfig.addPassthroughCopy("src/js");
    eleventyConfig.addPassthroughCopy("src/img");
    
    // Layout alias
    eleventyConfig.addLayoutAlias('base', 'layouts/base.njk');

    // https://www.seanmcp.com/articles/send-data-to-the-window-with-eleventy/
    eleventyConfig.addShortcode("expose", data => {
        return `<script>
            window.calypsoData = ${JSON.stringify(data)};
            // console.log(calypsoData);
        </script>`;
    });

    // markdown filter
    // options: https://github.com/markdown-it/markdown-it#init-with-presets-and-options
    const md = new markdownIt({
        html: true,
        breaks: false,
    });
    eleventyConfig.addFilter("parseMarkdown", (content) => {
        return md.render(content);
    });

    

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