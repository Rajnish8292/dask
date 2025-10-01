module.exports = {
  presets: ["@babel/preset-env", "@babel/preset-react"],
  presets: [
    [
      "next/babel",
      {
        "preset-react": {
          runtime: "automatic",
        },
      },
    ],
  ],
};
