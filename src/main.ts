#!/usr/bin/env node

import { Command, Argument, program } from "commander";
import { input } from "@inquirer/prompts";

const answer = await input({ message: "Enter your name" });

console.log(answer);

function collectRepeatable(value, previous) {
  if (previous._isDefault) {
    return [value];
  }
  previous.push(value);
  return previous;
}

function defaultRepeatable(array) {
  array._isDefault = true;
  return array;
}

//...
program
  //...
  .option(
    "--exclude <file>",
    "excludes files in input directory by file or pattern",
    collectRepeatable,
    defaultRepeatable([".gitignore", "codeswing.json"])
  );
//...
