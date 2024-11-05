module.exports = {
  "petstore-file": {
    input: "./revenuecat.yaml",
    output: {
      mode: "split",
      target: "./src/_network/revenuecat/__generated__/revenuecat.ts",
      override: {
        mutator: {
          path: "./src/_network/revenuecat/instance/index.ts",
          name: "instance",
        },
      },
    },
  },
};
