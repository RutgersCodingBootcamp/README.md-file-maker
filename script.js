const inquirer = require("inquirer");
const fs = require("fs");
let confirm = false;

let badge = "";

let generateREADME = (response) => `# ${response.title}
${badge}

${response.description}

## Installation
------
${response.installation}

## Usage
------
${response.usage}

## Contributing
------
${response.contributing}


## License
------
This application is covered under the ${response.license}.

## Questions
------
- Github: ${response.github}
- Email: ${response.email}
- ${response.reachMeQs}

`;

inquirer
  .prompt([
    {
      type: "confirm",
      message: "Would you like to create a README.md file?",
      name: "confirm",
    },
  ])
  .then((response) => {
    confirm = response.confirm;

    if (confirm === true) {
      inquirer
        .prompt([
          {
            type: "input",
            message: "What is the Title of your project?",
            name: "title",
          },
          {
            type: "input",
            message: "Type a small overview of what your project is about.",
            name: "description",
          },
          {
            type: "input",
            message: "Type instuctions about the installation of the project?",
            name: "installation",
          },
          {
            type: "input",
            message: "What is the usage of your project?",
            name: "usage",
          },
          {
            type: "input",
            message: "How will you allow contributions to the project?",
            name: "contributing",
          },
          {
            type: "list",
            message: "What license would you like to have for this project?",
            name: "license",
            choices: ["MIT License", "Apache License", "GPLv3 License"],
          },
          {
            type: "input",
            message: "What is your github username?",
            name: "github",
          },
          {
            type: "input",
            message: "What email can you be reached at?",
            name: "email",
          },
          {
            type: "input",
            message: "Type instructions on how you can be reached.",
            name: "reachMeQs",
          },
        ])
        .then((response) => {
          if (response.license === "MIT License") {
            badge =
              "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)";
          } else if (response.license === "Apache License") {
            badge =
              "[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)";
          } else {
            badge =
              "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)";
          }
          console.log(response);
          fs.writeFile("README.md", generateREADME(response), function (err) {
            if (err) throw err;
            console.log("Saved!");
          });
        });
    }
  });
