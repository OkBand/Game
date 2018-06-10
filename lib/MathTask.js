class MathTask {
  constructor() {
    const operators = {
      "+": function (a, b) {return a + b},
      "-": function (a, b) {return a - b},
      "*": function (a, b) {return a * b},
    };

    function getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    };

    let left = getRandomInt(10);
    let right = getRandomInt(10);
    let i = getRandomInt(2);
    let sign = Object.keys(operators)[i];
    let operator = operators[sign];


    this.text = left + " " + sign + " " + right;
    this.result = operator(left, right);
  }
}

export default MathTask;
