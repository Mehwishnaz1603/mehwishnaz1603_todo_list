#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";
let todoList: string [] = [];
let conditions = true;
console.log(chalk.bold.magenta('Welcome To _Todo-List App'));
let Todo = async () => {
    while(conditions){
        let option = await inquirer.prompt([
            {
            name: "choices", type: "list",
            message: chalk.italic.yellowBright("Select an option you want todo: "),
            choices: ["Add Task","Delete Task","Update Task","View Todo-List","Exit"]
            }
       ]);
       if (option.choices === "Add Task"){
            await addTask()
       }
       else if (option.choices === "Delete Task"){
            await deleteTask()
       }
       else if (option.choices === "Update Task"){
            await updateTask()
       }
       else if (option.choices === "View Todo-List"){
             await viewTask()
       }
       else if (option.choices === "Exit"){
            conditions = false; 
       }
    }
}

// Function to add new task to the list 
let addTask = async () => {
    let newTask = await inquirer.prompt([
        {
        name: "task", type: "input", message: chalk.italic.bgCyan.red("Enter your new task: "),
        }
    ]);
    todoList.push(newTask.task);
    console.log(chalk.italic.green.underline(`\n ${newTask.task} Task Added Successfully In Todo-List\n`));
}
// Function to view all Todo-List Tasks
let viewTask = () => {
    console.log(chalk.bold.underline.magenta("\n My Todo-List: \n"));
    todoList.forEach((task, index) => {
        console.log(chalk.italic.underline.magenta.bold(`${index + 1}: ${task}\n`))
    })
}
// Function to delete a task from the list 
let deleteTask = async () => {
    await viewTask()
    let taskIndex = await inquirer.prompt([
        {
        name: "index",  type: "number", 
        message: chalk.italic.bgCyan.red("Enter the 'index no. ' of the task you want to delete: "),
        }
    ]);
    let deleteTask = todoList.splice(taskIndex.index - 1, 1);
    console.log(chalk.italic.green.underline(`\n ${deleteTask} This task has been deleted successfully from your Todo-List.\n`));
}
// Function to update a task
let updateTask = async () => {
    await viewTask()
    let update_Task_index = await inquirer.prompt([
        {
            name: "index",  type: "number",
            message: chalk.italic.bgCyan.red("Enter the 'index no.' of the task you want to update: ")
        },
        {
            name: "new_task", type: "input",
            message: chalk.italic.yellowBright("Now Enter new task name: "),
        }
    ]);
    todoList[update_Task_index.index - 1] = update_Task_index.new_task
    console.log(chalk.italic.green.underline(`\n Task at index no. ${update_Task_index.index - 1} 
    updated successfully [For updated list check option: "View Todo-List" ]`)) 
}
Todo();