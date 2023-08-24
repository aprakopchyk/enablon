module.exports = {
  get: (key) => {
    if (key === "BaseURL") {
      return "https://todomvc.com/examples/angular2/";
    }
  },

  testDataValues: {
    zeroTaskNumber: 0,
    oneTaskNumber: 1,
    twoTaskNumber: 2,
    fiveTasksNumber: 5,
    emptyData: "  ",
    textDecoration: "line-through",
  },
};
