const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Adicione seus eventos aqui
    },
    viewportHeight: 880,
    viewportWidth: 1280
  },
});