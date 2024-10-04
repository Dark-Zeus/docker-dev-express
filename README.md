# Docker Dev Template Project

* We do recommend reading the full documentation if you are new to the project. However if you want the details about the specific stack and version [jump to stack documentation:](#docker-dev-react--express-4210base)

The project is intended to provide a dockerized development environments for various projects that uses different stacks. The project is divided into multiple sub-projects, each of which will have a separate docker image and a github repository. For each stack, there are multiple branches, each of which represents a different major version of the stack. The version is the same as the version of the stack the branch is based on.

## WHY?
When starting a new project, developers often need to spend time setting up the development environment—installing packages, configuring settings, and organizing the file structure. This can be tedious and lead to inconsistencies across teams. Git helps manage the code, but it doesn’t handle the environment setup.

This project provides a standardized, pre-configured setup with essential libraries, configurations, and file structures so developers can skip the setup and get straight to coding.

### WHY DOCKER?
Docker makes setting up the environment easy and consistent across all developers, regardless of their operating system. By packaging everything in a container, we eliminate the need for manual installation or configuration. Docker ensures that the same environment is used everywhere regardless of the operating system used, speeding up the development process and preventing issues caused by differences in setups.

## HOW?
The project provides a Docker image for each stack, including the necessary tools, libraries, and configurations. Each stack has multiple branches, representing different major versions. Developers can clone the repository, switch to the required branch, and use the provided script to build and run the Docker image.

For Visual Studio Code users, a Devcontainer configuration is available, allowing you to start developing without manually running scripts—just open the project with a single click.

## DEPLOYMENT
The initial image is only intended for development purposes only. However, the each repository will provide a `production` script that will build a production image and run the container with the production values. The `delevopment` and `production` scripts will be available in the respective repository.

We however do recommend to build your own production image and run the container with the production values as per your requirements as the provided `production` script will only provide a basic standard setup for a given stack.

### Example :
* Stack : 
    * docker-dev-react
* Versions (Branches) : 
    * react-18.3.1/base
    * react-18.3.1/base-ts
    * react-18.3.1/redux

currently, the project has releases for the following stacks:
* React
* Express
* JakartaEE
* SpringBoot
* PHPMVC

for exact versions, details of the stack and the instructions please refer to the README file of the respective branch.

## Pre-requisites

These needs to be installed on your system to use the project:

* [Docker](https://docs.docker.com/get-docker/)
* [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

Additionally if you are using **Windows**, 
* [Windows Subsystem for Linux (WSL)](https://docs.microsoft.com/en-us/windows/wsl/install) - Required for running docker on windows as well as for running the scripts.
* [Docker Desktop using WSL2](https://docs.docker.com/desktop/windows/wsl/) - Required for running docker on windows.
* [Git Bash](https://gitforwindows.org/).

Optional:
* [Visual Studio Code](https://code.visualstudio.com/) - For editing the code with intergrated docker and devcontainer support.

Install Following Extensions in Visual Studio Code:
* [Docker Extension for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker) - For managing docker containers and images from within Visual Studio Code.
* [Devcontainers Extension for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) - For running the project in a devcontainer. This extension will remove the need for running the scripts.
For more information on how to use the devcontainer extension, please refer to the [documentation](https://code.visualstudio.com/docs/remote/containers).  
  
<br/>  

# docker-dev-react : express-4.21.0/base

This version (base) provides a minimal setup for a Express JS 4.21.0 project, including a pre-configured folder structure. It's an ideal starting point for building a new project.

## Usage

### Without Devcontainer Extension
1. Clone the repository with the following command:
    ```bash
    git clone --branch express-4.21.0/base --single-branch https://github.com/Dark-Zeus/docker-dev-react.git
    ```
    this will clone the repository with the specified branch.

2. Change the directory to the cloned repository:
    ```bash
    cd docker-dev-react
    ```

3. Build the docker image:
The repository provides a script for building the docker image for windows and linux. The [scripts](#scripts) contain the neccessary commands and values to build and mount a docker container. Run the following command based on your OS:
    * For Linux and MacOS:
        ```bash
        chmod +x ./docker-dev.sh
        ./docker-dev.sh
        ```
    * For Windows (need WSL installed or a bash terminal):
        ```bash
        bash docker-dev.sh
        ```

### With Devcontainer Extension

The project provides a devcontainer configuration for Visual Studio Code users. To use the devcontainer extension, follow these steps:

**Note:** When using dev container git is automatically installed (not optional). If you don't want git, you can remove the git feature from the `.devcontainer/devcontainer.json` file.
```json
"features": {
    "ghcr.io/cirolosapio/devcontainers-features/alpine-git:0": {}
},
```

1. Follow the first and second steps from the [Without Devcontainer Extension](#without-devcontainer-extension) section.
2. Open the project in Visual Studio Code.
3. Follow the instructions in the [Devcontainer Extension for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) documentation to open the project in a devcontainer.

<br/>

## Development

Run 
```bash
yarn install
``` 
to install the dependencies and start coding.
Yarn is the package manager used in the project. You can use npm as well, but it's recommended to use yarn for consistency.

You can use the preferred IDE in your system to start developing the project.

### Routes

The project provides 2 basic routes for testing the project. The routes are available at `http://localhost:3000/` and `http://localhost:3000/about`, which returns a `Hello World` message and a json response respectively.
  
The files for the routes are available in the `routes` folder. You can add more routes as per your requirements. We recommend using `routes/index.route.js` for the main routes and create separate files for each route and not using the `server.js` file for routes.

The project also provides 2 default routes, a 404 - Not Found route and a 500 - Internal Server Error route. You can modify the routes as per your requirements. 


```javascript
//server.js

app.use((req, res, next) => {
    res.status(404).send('Error 404 - Cannot find the requested URL');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Error 500 - Unknown Internal Server Error');
});
```

for further details on how to add routes, please refer to the [Express Documentation](https://expressjs.com/en/starter/basic-routing.html).

Start the development server with the following command:
```bash
yarn start
```

## Versions

### Docker
* Docker Image : node:20.17.0-alpine3.19
* Yarn : 4.4.1

### Dependencies / Libraries

* "dotenv": ^16.4.5
* "express": ^4.21.0

### Developer Dependancies
* nodemon : ^3.1.5

# Scripts

The repository provides 2 scripts for building the `development docker image` and `production docker image` for windows, mac and linux. The scripts contain the neccessary commands and values to build and mount a docker container. `development` script uses `docker-dev-config.env` and `production` script uses `docker-prod-config.env` as sources. The scripts will build the docker image and run the container with the specified values.

To change the values as per your requirements, you can change the values in the respective `.env` file.

## .env

Following are the default values of the variables in the docker-dev-config.env file:

```env
NODE_ENV=development
PORT=3000

PROJECT_NAME=express-app
TAG=<Random 8 char hex generated by the script>
MOUNT_PATH=/usr/src/app
CONTAINER_PORT=3000
```

* `NODE_ENV` : The environment for the project (will use `development` as default).
* `PORT` : The port to be used for the project (this will be the express listening port as well as the port exposed by the docker container).
* `PROJECT_NAME` : The name of the project.
* `TAG` : The tag for the docker image (will generate a random 8 char hex value upon first run of the script).
* `MOUNT_PATH` : The path the project will be mounted in the docker container
* `HOST_PORT` : The port to be used for the host machine (will use `3000` as default).

## docker-prod-config.env

You can run the scripts with the default values or change the values of the variables as per your requirements.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more details.