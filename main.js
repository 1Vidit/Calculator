const keys = document.querySelectorAll(".key");
const input = document.querySelector(".input");
const output = document.querySelector(".output");
const history = [];

keys.forEach((key) => {
  key.addEventListener("click", () => {
    const keyValue = key.dataset.key;
    const inputText = input.textContent;
    const outputText = output.textContent;

    if (keyValue === "clear") {
      input.textContent = "";
      output.textContent = "";
    } else if (keyValue === "backspace") {
      input.textContent = inputText.slice(0, -1);
    }else if(keyValue == "^2"){
      const num = parseFloat(inputText);
      input.textContent = `${num}^2`;
      outputText.textContent = num ** 2;
      history.push({expression: inputText, result: result});
    } else if (keyValue === "brackets") {
      if (
        input.indexOf("(") == -1 ||
        (input.indexOf("(") != -1 &&
          input.indexOf(")") != -1 &&
          input.lastIndexOf("(") < input.lastIndexOf(")"))
      ) {
        input.textContent += "(";
      } else if (
        (input.indexOf("(") != -1 && input.indexOf(")") == -1) ||
        (input.indexOf("(") != -1 &&
          input.indexOf(")") != -1 &&
          input.lastIndexOf("(") > input.lastIndexOf(")")
        )
      ) {
        input.textContent += ")";
      }
      display_input.innerHTML = CleanInput(input);
    } else if (keyValue === "=") {
      try {
        let result;
        if (inputText.includes("%")) {
          const inputArray = inputText.split("%");
          const num1 = parseFloat(inputArray[0]);
          const num2 = parseFloat(inputArray[1]);
          result = (num1 * num2) / 100;
        } else if (inputText.includes("mod")) {
          const inputArray = inputText.split("mod");
          const num1 = parseFloat(inputArray[0]);
          const num2 = parseFloat(inputArray[1]);
          result = num1 % num2;
        } else {
          result = eval(inputText);
        }
        input.textContent = inputText;
        output.textContent = result;
        history.push({ expression: inputText, result: result });
      } catch (err) {
        output.textContent = "Error";
      }
    } else if (keyValue === "mod") {
      input.textContent += "mod";
    } else if (keyValue === "%") {
      input.textContent += "%";
    } else {
      input.textContent += keyValue;
    }
  });
});

function CleanInput(input) {
  let input_array = input.split("");
  let input_array_length = input_array.length;
  for (let i = 0; i < input_array_length; i++) {
    if (input_array[i] == "(") {
      input_array[i] = `<span class="brackets">(</span>`;
    } else if (input_array[i] == ")") {
      input_array[i] = `<span class="brackets">)</span>`;
    } else if (input_array[i] == "%") {
      input_array[i] = `<span class="percent">%</span>`;
    }
  }
  return input_array.join("");
}
