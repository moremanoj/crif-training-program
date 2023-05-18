module.exports = {
    root: true,
    env: {
      browser: true,
      es2020: true,
    },
    extends: ["standard", "prettier"],
    parserOptions: {
      ecmaVersion: 11,
      sourceType: "module",
    },
    rules: {
      semi: ["error", "always"],
      "semi-style": ["error", "last"],
      "padded-blocks": ["error", "always"],
    },
    // eslint-disable-next-line eol-last
  };
  