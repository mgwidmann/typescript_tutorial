# Task 2 -- Creating a small CLI application

## One minor change

One mistake I made in the last exercise you'll need internet to fix before moving forward. Luckily, it only takes a few seconds.

We need to downgrade the version of `inquirer` so we get an older version, it will be easier to work with.

```
$ npm install inquirer@^8.2.6 --save
$ npm install @types/inquirer@^8.2.10 --save-dev
$ npm install @types/node@^20.12 --save-dev
```

# Without internet from here on

Now you're going to create a TODO application (a list of things I need to do) that runs from the command line. It will have two basic functions:

* Add a new TODO item
* Show the TODO

Start by making a new file in the `src` folder called `todo.ts`. This will be the main file that we will run in order run our application. To streamline the process of editing and executing we are going to set some things up first.

## `package.json` scripts

Inside the `package.json` file you will see a `"scripts"` key that looks like this:

```
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

We will add to the `"scripts"` by putting the following two helper commands:

```
    "compile": "tsc",
    "todo": "npm run compile && node src/todo.js"
```

You will need to add a comma (`,`) after the `exit 1"` for the `"test"` command and then put the above two commands (compile and todo) into the file. This will allow you to run both by simply doing:

```
$ npm run todo
```

If you add the following line to the `src/todo.ts` file and then rerun it, you should see "Hello Kate!" get printed out:

```
console.log("Hello Kate!");
```

```
$ npm run todo

> helloworld@1.0.0 todo
> npm run compile && node src/todo.js


> helloworld@1.0.0 compile
> tsc

Hello Kate!
```

### About the `package.json` and JSON in general

The `package.json` file is a file with a JSON (prounounced like the name Jason) object inside of it. JSON objects are key and value pairs and we can use the key to get the value out of them. If you use the `ts-node` command you can play with JSON objects to see how it works. Heres some examples you can try:

```
$ ts-node
> let json = {"this-is-a-key": "and a value goes here"};
undefined
```
*(Remember the `let` always returns undefined, you'll have to type `json` to see what you defined)*

You can see what the JSON object looks like by printing it out with `console.log(json)`. `log` is a function, which basically means it defines behavior. The `console` variable is a globally accessible variable provided by the language, so you don't need to import it or worry about where it comes from, its always there. The `.` operator allows you to access properties on an object such as `console` and then when you use parenthesis on something it means you want to call that function. In JavaScript, you can attempt to treat anything like its a function and if it is not when it runs, it will crash and exit. But in Typescript, it won't compile so its not possible, this helps you realize your mistake sooner and is very useful for beginners as well as large projects.

```
> console.log(json)
{ 'this-is-a-key': 'and a value goes here' }
undefined
```
*(`console.log` also always returns undefined so thats why you see undefined after it prints `json` out)*

To access a property on your JSON object, you can simply use the `[]` and put the key inside of the square brackets like this to get the value out:

```
> json['this-is-a-key']
'and a value goes here'
```

If the key is a normal string without things like hypens or other things which are not allowed in the name of properties on an object you can use the `.` dot notation to access it (i.e. things like `-`, `%`, `+`, `*` among others are not legal in the name of anything which identifies something like a property or variable, the name of something is known as an identifier). But you should be aware these are the same things. When you know your key will have these things or if your key is a variable, you'll have to use the `[]` style. Otherwise use `object.theKey` like this:

```
> let ages = {"Kate": 30};
undefined
> ages.Kate
30
```

JSON objects when inside a `.json` file act a bit more strictly than when they are inside a `.js` or `.ts` file. A few things to be aware of:

* Plain JSON objects like the one inside the `package.json` file must **ALWAYS** use double quotes (`"`) and will be considered a syntax error otherwise.
* The last value of a JSON object must **NOT** have a comma (`,`) at the end. For example, the last line of the nested JSON object inside of `"scripts"` or whatever the last thing is at the bottom of the file.


## Start of your app

When your app starts up we want to print out a nice big pretty banner to let everyone know. At the top of the `src/todo.ts` we can import the necessary function from `figlet` like so:

```
import { textSync } from 'figlet';
```

This function takes in a string we give it (like `"Hello"`) and returns another string. Strings are text and they can be long, short, contain unicode characters such as Ukrainian letters and all kinds of things that can mess up your program. If you put your mouse over the `textSync`, you should see something like this:

```
function textSync(txt: string, font?: Fonts): string
```

This says, `textSync` is a function which takes either 1 or 2 parameters and returns a `string`. The first is called `txt` and is a `string`. Note, you should always use the lowercase version of primitive types such as `string`, `number`, `boolean`, etc. The second paramter named `font` has a `?` after it, which means its an optional parameter. The type of this parameter to the function is a `Fonts` type which is custom defined by `figlet`. After the `:` is the return type when you call it. 

You can call this `textSync` function and the result will be returned to you. Put the following in the file after the import line:

```
const banner = textSync("Wonderful Kate's TODO App")
console.log(banner);
```

Now run `npm run todo`! You should be proud, your app is looking great! But it doesn't do anything yet... Lets fix that!

### Using `inquirer` to get data from the user

First we need to setup some bare bones structure so that the code can run when we use `inquirer` otherwise it won't compile. For now, this syntax may seem confusing. Don't worry, its not complicated but you just need time to get used to it.

Define a new function like this and put your banner inside it:

```
// Function definition here
// The name comes after the keyword function and must always have () even if there are no parameters
async function todo() {
  // The code which runs when the todo() function is called goes inside the braces (the { and })
  console.log(textSync("Wonderful Kate's TODO App"));
}
```

You'll notice that if you run your code now, you won't see your banner anymore! This is because we never called the `todo` function. You'll also notice that we defined the function as an `async function`. This simply means that the function might pause or wait on something while its running. If you define it as just a `function` without `async`, the current code will still work, but it won't once we start using `inquirer`.

We need to call the todo function, but because its an `async` function it cannot be called from the top level of the file (i.e. its not inside a function). If you try like this it will give you an error:

```
await todo();
```

Async functions need to have the keyword `await` before them or they won't return the result. They return a different type called a `Promise` and it won't work like you want it to (and won't compile if you try to do stuff with it as if it is whatever result you were expecting). Don't worry too much about `async`, `await` and `Promise`s, they're confusing topics and for now you just need to use them and not worry about how they work. Understanding `async`/`await` properly is something a lot of developers mess up, but Typescript will tell you when you do mess it up so always check if somethings not working the way you want maybe you're missing an `await` or maybe the function is not `async`, its a common gotcha (term for "got you", as if you were tricked).

To make it work, change the code for the `await todo()` to the following:

```
(async () => {
  await todo();
})();
```

This syntax will be confusing at first but let me explain. The basic structure is a function definition but wrapped with parenthesis like in math. The `() => { }` syntax is for anonymous function definitions with the code going between the `{` and `}`. Once that function is defined, we execute it immediately with `()` after the closing parenthesis. If you run it again you should see your banner again.

The code here executes in a strange order that is a little unintuitive. You can see this order if you put `console.log` statements at each step. Put log statements in the following locations:

* Before the `todo()` function definition
* After the `todo()` function definition but before the anonymous async function
* Inside the anonymous async function but before the call to `await todo()`
* Inside the anonymous async function but after the call to `await todo()`
* At the end of the file

The unintuitive part is you will see the order of the print outs execute in this order every time:

```
Before todo
After todo before async
Inside async, before todo
 __        __              _            __       _   _  __     _       _       _____ ___  ____   ___       _                
 \ \      / /__  _ __   __| | ___ _ __ / _|_   _| | | |/ /__ _| |_ ___( )___  |_   _/ _ \|  _ \ / _ \     / \   _ __  _ __  
  \ \ /\ / / _ \| '_ \ / _` |/ _ \ '__| |_| | | | | | ' // _` | __/ _ \// __|   | || | | | | | | | | |   / _ \ | '_ \| '_ \ 
   \ V  V / (_) | | | | (_| |  __/ |  |  _| |_| | | | . \ (_| | ||  __/ \__ \   | || |_| | |_| | |_| |  / ___ \| |_) | |_) |
    \_/\_/ \___/|_| |_|\__,_|\___|_|  |_|  \__,_|_| |_|\_\__,_|\__\___| |___/   |_| \___/|____/ \___/  /_/   \_\ .__/| .__/ 
                                                                                                               |_|   |_|    
Bottom of file
Inside async after todo
```

The "Bottom of file" executes before the anonymous function is done. This is whats weird about `async`/`await` and `Promise`s. For now just know that they're weird, we'll come back to do a deeper dive on it later.

To use inquirer (finally), you can import it like so:

```
import { prompt } from 'inquirer';
```

And then inside your `todo()` function you can use it like this (you'll want to remove all the extra `console.log` lines to make it less cluttered when you run it):

```
  const { choice } = await prompt([
    {
      type: 'list',
      choices: ['Add todo', 'Show todos'],
      message: "Choose",
      name: 'choice'
    }
  ]);

  console.log("Choice was:", choice);
```

When you'll run it, you'll be shown a menu where you can use the arrow keys to move up and down between "Add todo" and "Show todos". Hit enter to pick the one you want and the `console.log("Choice was:", choice);` line will show you what you picked.

Now, make two new functions, one named `addTodo` and another named `showTodos`. The `addTodo` will have to be `async`, `showTodos` can be just a regular function. Next is using `if`/`else if` based upon the choice the user made. An `if`/`else if` looks like this:

```
if (choice === 'Add todo') {
  // call your addTodo function here, remember to use await before it
} else if (choice === 'Show todos') {
  // call your showTodos function here
}
```

Be careful, the strings must match exactly between the property for `choices` passed into `await prompt` and the `if`/`else if` or the check will return false and not work the way you want. Inside the parenthesis, the `choice === 'Add todo'` is a comparison. In Typescript, when you want to check for equality between two things, you'll almost always use **triple** equal. There is a double equal comparison (`==`) but it acts very weird and you pretty much never want to use it. Checking for not equal is similarly something like `choice !== 'Add todo'`. In programming generally, `!` means "not". Same as `==`, avoid the `!=` because it also acts weird. Pretty much always use `===` and `!==`. When comparing against numbers, greater than (`>`), less than (`<`), greater than or equal (`>=`) and less than or equal (`<`) can be used. Another way to use `!` is to use it on a variable. For example, doing `!choice` would mean "not choice" or when choice does not exist (there is nothing in the choice variable).

## Show todos

Starting with show todos since we will need to build the functionality to get our list of todos in order to add to it. For this we will need to import another module, `fs`, but since this one is part of the language we didn't need to download it before.

```
import { existsSync } from 'fs';
```

Make a new function to load the todos and come up with a name for the function, no `async` needed. We can use function this later when adding a new todo by loading them, adding the todo, then saving it to disk. By breaking apart the smaller steps of each function, this helps us to organize the code and helps others to better understand what the code does because we give it a (hopefully) descriptive name of what each of these things do.

Calling this function `existsSync` will tell us if a file exists. This way we won't get an error trying to read a file that doesn't exist (yet). We can use an `if`/`else` to check if it exists. you can call the function like `existsSync("todos.json")` inside of the `if`. Note that the `if` needs parenthesis surrounding the `existsSync` call, so it should look like `if (existsSync("todos.json"))`. For the `else`, its the same as `else if` just without the `if` and everything in the parenthesis following it.

When it exists, the `fs` module also has a function to read files called `readFileSync`. If you type it like `readFileSync("todos.json")` it will underline it with red. If you mouse over it, it will give you an error like "Cannot find name 'readFileSync'.ts(2304)" and you should see a "Quick Fix" link which has the shortcut of CMD+. (hold command plus hit the period key). The keyboard shortcut only works when your cursor is somewhere in the `readFileSync`. The first choice is "Update import from "fs"". If you don't find the quick fix, the change it makes to the import at the top makes it look like this now:

```
import { existsSync, readFileSync } from 'fs';
```

Now, whats coming back from `readFileSync()` is not a `string` but a `Buffer` since the file could be potentially really big. But we know its not, and we don't want to worry about scenarios where someone has Gigabytes of todos but its a scenario we have to consider in every-day programming. Turning the `Buffer` into a string means that the whole file will be loaded into memory. Your computer has probably 8 Gigabytes or 16 Gigabytes of memory. If the file is bigger than that, it wont fit and our program will crash. These kinds of bugs actually very common in the real world. Programmers think, "oh thats silly, who would have so many todos", but then one day it happens and the entire system is broken. This is what I meant about assumptions, we humans are not so great at making accurate judgements on things like this so we must always verify our assumptions, even when we think they may be ridiculous or highly unlikely. Theres a saying in the development community, whatever can happen will happen in production (the common name for the live system everyone uses whether thats a website or a program).

But since we're not worrying about that now, we can turn it into a string by calling `.toString()` on it, you can create a new variable inside the `if` statement to capture this result. Then we will take that and create a new variable and pass it into `JSON.parse(file)` (if you called your variable `file` for example) and capture the result. We haven't yet talked about what this file will look like. So heres an example:

```
{
  "todos": ["Mow the lawn", "Take out the trash", "Tell Kate she's amazing and doing wonderful so far!"]
}
```

Its a JSON file with a single key, `"todos"`. The result which came back from `JSON.parse()` will be the whole JSON object, so if you named that variable `todos`, to access the array of strings, you'll need to do `return todos.todos;` inside the function's `if` block which checks for `existsSync("todos.json")`. If you named it something else like `data`, it would be `return data.todos;`

The `else` of this function is simple, just `return []` because we have no todos yet, so we can just return an empty array. An array, denoted by `[]`, is an ordered list of any type. In our case, we have an array of strings. 

Your `showTodos` function can then be updated to look something like this:

```
function showTodos() {
  const todos: string[] = loadTodos();

  // for loop to print out each todo
}
```

You'll notice a new piece of syntax here. The variable declaration now includes its type. After the colon (`:`) and before the `=` the type `string[]` is used. This means its an array of strings. This is one of the biggest differences between JavaScript and Typescript, typescript can include types as well.

We'll need a for loop to print out all the todos. In fact, there are much simpler ways of printing them out, but its a good exercise for you to use a for loop. A for loop can take two forms, the standard type and whats known as the enhanced for loop. For now, we'll use the enhanced version as its simpler to read and understand:

```
console.log();
console.log("Your todos:");
for (const todo of todos) {
  // Inside here, you can print out the todo using console.log
}
```

Now if you run it with `npm run todo` and you chose `Show todos`, you should see it tell you that you have no todos like this:

```
? Choose Show todos
Choice was: Show todos

Your todos:
```

**Congrats! Your first piece of functionality is completed!**

## Add todo

To add a todo, we will need to let the user type something in. Inside the `addTodo` function you created before, call inquirer like this:

```
  const { newTodo } = await prompt([
    {
      type: 'input',
      message: "New Todo",
      name: 'newTodo'
    }
  ]);
```

This will wait for the user to type something in and hit enter. You can print out the `newTodo` variable after to confirm its all working. Then, call your `loadTodos()` function like before. Since it is an array, we can use the array's `.push()` function to add an item to it. You'll call it like `todos.push(newTodo)`. You can print out the `todos` after doing this to see that its part of the array. Now you just need to save it.

Creating a new variable which is what it will look like when its written to disk, it should look like `{ todos: todos }`. You can then use `JSON.stringify()` on that and capture that result to change the JSON object into its string representation so it can be written to disk. After that, to write it to the disk you'll need to add `writeFileSync` to the `fs` import and pass in 2 parameters. First is the name of the file, `"todos.json"`, and the second is the string you want to write (in this case the result of `JSON.stringify()`)

# Test it out

You now have a completed TODO command line utility program! And before we started you hadn't even used the CLI before. Try it out in various ways, add a todo, show the todos, add another, etc. There aren't many different variations but try different things you can think of. Play around with it and try to do something to make it break. What happens if you delete the `todos.json` file, does it crash when you run it again or does it just forget all the todos? And what happens if someone changes the contents of the todo.json file? Is there a malicious way someone could change that file to break your application? The assumption that no one changed it and it was only your program is another source of bugs in the real world, especially security related ones. Bonus points for preventing it from crashing and acting like there are no todos when someone renames the "todos" key inside the file to "tadas".

# Congratulations!

Wonderful job, you should be proud to make it this far. If you can get to this point, then I am certain you can be a very good Software Engineer. Pat yourself on your back and have a relaxing glass of wine or listen to some music. You're doing great, keep it up!