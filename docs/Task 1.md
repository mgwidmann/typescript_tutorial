For this you're going to get your machine setup to be able to write some code without getting too deep into the particulars of the language or any frameworks.

### IDE Setup

The IDE (integrated development environment) I recommend is VSCode, here is the link to it:

https://code.visualstudio.com/

### Developer Tools

If you're unaware, git is the version control system. It's how you'll check your code in and push it so others can use it, it is how all development is done these days.

That command to set up these tools for a Mac is:

```
xcode-select --install
```

Don't copy and paste it, beware that sometimes these can turn the double -- into a longer hyphen which will not work. To run the command, from within VSCode, go to Terminal at the top of the screen and select "New Terminal". You can also hit CMD + J to open the terminal and enter the above command. A dialog will open which will ask if you want to install some stuff. If the dialog doesn't show up it may be behind some windows.

Open VSCode in a new folder where we can start writing some code :) For example, I have a folder called code in my home folder. You should create a folder called HelloWorld using the Finder application since this is your introduction to a new programming language.

### Node.js Install

We can install node directly but I prefer to use something which will make it easier to upgrade later whenever new versions of node come out. There is a tool called nvm which stands for Node Version Manager. Node.js is the runtime which executes the JavaScript code compiled (output by) Typescript. It can also run JavaScript directly. To set up NVM, see their Github project here:

https://github.com/nvm-sh/nvm

You should see a section called "Installing and Updating" which has a command you can copy starting with curl (and another one starting with wget). Curl should already be on your machine but I don't think wget comes with Mac by default, which is why they have both. Curl is a command line tool which will make an HTTPS call to a server for you. The results, if you want to inspect them (and it's generally advisable to do so), is a BASH script. BASH stands for Bourne-Again SHell, named after someone who made it. It is basically one version of the command line interface you're using. The | symbol in bash, sends the output from curl into bash for execution, so this command basically says fetch this website and then execute the code, something you should only do when you trust who is giving it to you and where it is coming from (some people are even security paranoid and won't do this).

Once you do this, you should be able to type nvm help and see a big print out of all the things you can do. To set up node.js, you can see what versions are available by typing nvm list. At this time, version 20 is the latest. To install it, simply type nvm install 20. To test if it's working, just type node in the terminal. It should look like this (don't type the $, that's just a typical symbol for the beginning of the CLI but yours may look different):

```
$  node
Welcome to Node.js v20.12.2.
Type ".help" for more information.
>
```

You should see the version number there (though it can change from day to day so it may not match mine). Here you can type javascript code and it will execute them directly and show you the result. This is known as the JavaScript console or more generally as a REPL which is pronounced "rep-el". It stands for Read-Evaluate-Print-Loop because that is exactly what it does. Reads your code input, evaluates it (i.e. executes it), prints the result and loops back to the beginning. For example here is something you can try:

```
> let greeting = "Hello! Great job!"
undefined
> greeting
'Hello! Great job!'
```

To exit, hit CTRL+C two times or type .exit (notice the . there, just typing exit won't work). Also when you define a new variable with the word "let", it won't give you any output since this command always returns undefined. We will get into what undefined means but you should be aware it's not the same as null (the absence of a value) in JavaScript and that's a source of bugs.

### Typescript

Now that you have node setup, we can set up typescript. To make things easier, we will just install it globally on your machine but it's frequently recommended to only install it into the project you're working on instead. To set it up, we will use the Node Package Manager or npm which comes with Node which you just installed. You can see any packages you might want to use on this website:

https://www.npmjs.com/

To install typescript, it is just:

```
$ npm install -g typescript
```

The `-g` tells npm to install it globally and not here so it will always be available no matter which project you're working on. To get a similar console as the node REPL, there is a tool called ts-node you can install. To install it, just do:

```
$ npm install -g ts-node
```

Then you can do (normally):

```
$ ts-node
```

However, when I tried this and then tried to execute some code it gave me some weird errors and I found online that it might need to be run like this:

```
$ ts-node -O '{"module": "commonjs"}'
> let greeting = "Hello! Wonderful job!"
undefined
> greeting
'Hello! Wonderful job!'
>
```

Let me know if you have this problem running it without the -O part. You'll notice the exact same JavaScript code runs here.

### Set up a New Project

To start, we're going to run the command to initialize a new project. Run the following:

```
$ npm init
```

This will ask you a bunch of questions and you can just hit enter and use all the defaults. In your folder a new file called package.json will be there now. This file describes your project but we don't need to worry about it right now. To set up the project with typescript, you can just run:

```
$ tsc --init
```

This will create a new `tsconfig.json` file. For now we don't need to change anything but we will come back to the settings in here to change some stuff later.

In VSCode create a new folder by right clicking anywhere.

Name the new folder `src` which stands for source and will be where we put all our source code. A folder named lib is also very common, which stands for library. Right click on the `src` folder and click "New File". Name the new file `hello.ts` and hit enter.

In the file you can write something like this:

```
let greeting = "Hello!";
```

Then to compile it to JavaScript, you can do:

```
$ tsc
```

You'll see a new `hello.js` file appear. Later we will configure this to appear in another folder so we don't have to look at it unless we want to. You can delete this file and typescript will regenerate it when you run the tsc command, just don't delete the `hello.ts` file!

Set up a few packages for next time
One fun package is called figlet. You'll see what it does later :)

To install it in our project, you can tell NPM to save it to the project like this:

```
$ npm install figlet --save
```

(Again, type this, the double - gets messed up frequently in copy/paste)

To give VSCode access to typescript we can also install that as a development only dependency:

```
$ npm install typescript --save-dev
```

Figlet also doesn't come with the typescript type information VSCode needs to understand it, so you can install that package with:

```
$ npm install @types/figlet --save-dev
```

Often sometimes packages separate their type information which Typescript needs and the runtime code into two separate packages like this. Sometimes they come all together, it depends (and sometimes there are no typescript files which really sucks! but this is pretty rare nowadays).

In your `hello.ts` file you should be able to write something like this without it giving you any red underlines and errors:

```
import { textSync } from 'figlet';
```

Another package called inquirer should also be installed. It will help you with taking input in the command line interface from whoever is running it (in this case it will be you).

```
$ npm install inquirer --save
```

And the types:

```
$ npm install @types/inquirer --save-dev
```

You can import it like:

```
import inquirer from 'inquirer';
```

If all of that works you're good to go. You'll see there is one new file, package-lock.json, and one new folder, node_modules. The code for figlet and inquirer are inside the node_modules folder and the package-lock.json file says very specifically which version of every package you have in your project.

If all this is done, congratulations! Well done, you've set up a typescript project from scratch!  You can use these packages without an internet connection but if you need to download another one, you'll need an internet connection again. Once we play around with typescript a bit we can move onto making a React application to build a webpage. 

For now if you want more to do, you can read this brief history about JavaScript/Typescript:
https://www.typescriptlang.org/docs/handbook/typescript-from-scratch.html

Also, to read about the primitive types which exist in Typescript (types which are natively part of the language and not created by a library or yourself), you can see here:

https://www.freecodecamp.org/news/an-introduction-to-typescript/

Feel free to try some of the examples. Once you have compiled your typescript into javascript, you can run it by just using node and the file name like so:

```
$ node src/hello.js
```

This is a bit tedious I know, we will make it smoother and less annoying later. For now it will help you to understand what's really happening by doing each step of the process manually.
