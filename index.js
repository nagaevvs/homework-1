#!/usr/bin/env node

const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");

const today = new Date();

const argv = yargs(hideBin(process.argv))
  .usage(
    "Утилита получения текущей даты и времени с богатым интерфейсом. Usage: $0 <command> [options] "
  )
  .check((argv, options) => {
    const filePaths = argv._;
    if (filePaths.length > 1) {
      throw new Error("Ошибка: введите не более 2 параметров");
    } else {
      argv.check = true;
      return true;
    }
  })
  .command({
    command: "current",
    aliases: ["cur", "c"],
    desc: "Выводит текущую дату в формате ISO",
    builder: (yargs) => yargs.default("value", "true"),
    handler: (argv) => {
      //current
      if (argv.check && argv._.includes("current") && argv.year) {
        console.log(today.getFullYear());
      } else if (argv._.includes("current") && argv.month) {
        console.log(today.getMonth() + 1);
      } else if (argv._.includes("current") && argv.date) {
        console.log(today.getDate());
      } else if (argv._.includes("current")) {
        console.log(today);
      }
    },
  })
  .command({
    command: "add",
    aliases: ["a", "ad"],
    desc: "Позволяет получить дату в будущем ",
    builder: (yargs) => yargs.default("value", "true"),
    handler: (argv) => {
      if (argv.check && argv._.includes("add") && argv.year > 0) {
        const timestamp = new Date(
          today.setFullYear(today.getFullYear() + argv.year)
        );
        console.log(timestamp.getFullYear());
      } else if (argv._.includes("add") && argv.month > 0) {
        const timestamp = new Date(
          today.setMonth(today.getMonth() + 1 + argv.month)
        );
        console.log(timestamp.getMonth());
      } else if (argv._.includes("add") && argv.date > 0) {
        const timestamp = new Date(today.setDate(today.getDate() + argv.date));
        console.log(timestamp.getDate());
      } else if (argv._.includes("add")) {
        console.log("Ошибка: Используйте add c опциями -y -m -d");
      }
    },
  })
  .command({
    command: "sub",
    aliases: ["sub", "s"],
    desc: "Позволяет получить дату в прошлом",
    builder: (yargs) => yargs.default("value", "true"),
    handler: (argv) => {
      if (argv.check && argv._.includes("sub") && argv.year > 0) {
        const timestamp = new Date(
          today.setFullYear(today.getFullYear() - argv.year)
        );
        console.log(timestamp.getFullYear());
      } else if (argv._.includes("sub") && argv.month > 0) {
        const timestamp = new Date(
          today.setMonth(today.getMonth() + 1 - argv.month)
        );
        console.log(timestamp.getMonth());
      } else if (argv._.includes("sub") && argv.date > 0) {
        const timestamp = new Date(today.setDate(today.getDate() - argv.date));
        console.log(timestamp.getDate());
      } else if (argv._.includes("sub")) {
        console.log("Ошибка: Используйте sub c опциями -y -m -d");
      }
    },
  })
  .options({
    year: {
      alias: "y",
      description: "Вывод год",
    },
    month: {
      alias: "m",
      description: "Выводит месяц",
    },
    date: {
      alias: "d",
      description: "Выводит день",
    },
  })
  .alias("v", "version")
  .alias("h", "help")
  .epilog("Copyright 2022").argv;
