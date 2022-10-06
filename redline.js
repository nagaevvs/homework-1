const readline = require("node:readline");
const { stdin: input, stdout: output } = require("node:process");

const rl = readline.createInterface({ input, output });

const range = 100;
//const range = Math.floor(Math.random() * 300 + 1);
const number = Math.floor(Math.random() * range + 1);

rl.question(
  `Привет! Давайте сыграем) Я загадал число в диапазоне от 0 до ${range}\n`,
  (answer) => {
    if (answer == number) {
      rl.close();
    } else {
      const hint = answer > number ? "МЕНЬШЕ" : "БОЛЬШЕ";
      rl.setPrompt(`А вот и не угадали, попробуйте назвать число ${hint}\n`);
      rl.prompt();
      rl.on("line", (answer) => {
        if (answer == number) {
          rl.close();
        } else {
          const hint = answer > number ? "МЕНЬШЕ" : "БОЛЬШЕ";
          rl.setPrompt(
            `Увы, снова промах! Дам вам еще одну подсказку. Искомое число ${hint}\n`
          );
          rl.prompt();
        }
      });
    }
  }
);

rl.on("close", () => {
  console.log(`Вы угадали число! Это было число - ${number}`);
});
