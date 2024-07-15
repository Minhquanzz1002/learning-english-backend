module.exports = [
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: require("@typescript-eslint/parser"),
    },
    rules: {
      semi: "error",
      "prefer-const": "error"
    }
  }
];