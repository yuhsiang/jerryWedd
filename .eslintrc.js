module.exports = {
  "env": {
    "browser": true,
    "es6": true
  },
  "extends": "eslint:recommended",
  "globals": {
    "chrome": true
  },
  "parserOptions": {
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true,
      "jsx": true
    },
    "sourceType": "module"
  },
  "plugins": [
    "react"
  ],
  "rules": {
    "indent": [
      "error",
      2,
      {
        "SwitchCase":1,
        "VariableDeclarator":{"var":2,"let":2,"const":3},
      }
    ],
    "jsx-quotes": [
      "error",
      "prefer-double"
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "no-console": ["off"],
    "no-trailing-spaces":["error"],
    "no-unused-vars": [
      "warn",
      {"vars":"all","args":"none"}
    ],
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "always"
    ],
    "react/jsx-uses-vars":["error"],
  }
};



