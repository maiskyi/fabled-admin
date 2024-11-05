module.exports = {
  "petstore-file": {
    input: "./revenuecat.yaml",
    output: {
      prettier: true,
      mode: "split",
      target: "./src/_network/revenuecat/__generated__/revenuecat.ts",
      override: {
        mutator: {
          disableComments: true,
          path: "./src/_network/revenuecat/instance/index.ts",
          name: "instance",
        },
      },
    },
  },
};
