import defineConfig from "@antfu/eslint-config";

export default defineConfig({
  type: "lib",
  markdown: false
}, {
  rules: {
    "style/semi": ["error", "always"],
    "style/indent": ["error", 2],
    "style/quotes": ["error", "double", {
      avoidEscape: true,
      allowTemplateLiterals: true
    }],
    "style/eol-last": ["error", "never"],
    "style/brace-style": ["error", "1tbs"],
    "style/comma-dangle": ["error", "never"],
    "style/arrow-parens": ["error", "always"],
    "style/member-delimiter-style": ["error", {
      singleline: {
        delimiter: "semi",
        requireLast: true
      },
      multiline: {
        delimiter: "semi",
        requireLast: true
      },
      multilineDetection: "brackets"
    }],
    "vue/block-order": ["error", {
      order: ["template", "script:not([setup])", "script[setup]", "style:not([scoped])", "style[scoped]"]
    }],
    "vue/html-self-closing": ["error", {
      html: {
        void: "any",
        normal: "never",
        component: "never"
      },
      svg: "never",
      math: "never"
    }],
    "vue/first-attribute-linebreak": ["error", {
      singleline: "beside",
      multiline: "beside"
    }],
    "vue/max-attributes-per-line": ["error", {
      singleline: {
        max: 3
      },
      multiline: 1
    }],
    "vue/html-closing-bracket-newline": ["error", {
      singleline: "never",
      multiline: "never"
    }],
    "vue/singleline-html-element-content-newline": ["off"],
    "vue/multiline-html-element-content-newline": ["off"]
  }
});