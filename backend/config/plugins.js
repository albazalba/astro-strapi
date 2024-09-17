module.exports = () => ({
//   "strapi-plugin-io": {
//     enabled: true,
//     config: {
//       contentTypes: [
//         // List of content types you want to listen for changes
//         // "api::product.product",
//         // "api::user.user",
//       ],
//       // Add other configurations if needed
//     },
//   },
  io: {
    enabled: true,
    config: {
        // This will listen for all supported events on the article content type
        contentTypes: ['api::product.product'],
    },
},
});
