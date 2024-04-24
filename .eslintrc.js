module.exports = {
    parser: "babel-eslint",
    plugins: ["react", "react-native"],
    env: {
        "react-native/react-native": true
    },
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:react-native/all",
        "prettier",
        "prettier/react",
        "universe/native"
    ],
    rules: {
        "react-hooks/exhaustive-deps": "warn"
    }
};
