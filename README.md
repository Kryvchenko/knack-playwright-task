# Test Automation Framework with Playwright

## Test statuse badge: [![Knack task playwright](https://github.com/Kryvchenko/knack-playwright-task/actions/workflows/playwright.yml/badge.svg)](https://github.com/Kryvchenko/knack-playwright-task/actions/workflows/playwright.yml)

<a href="https://knack.com" target="_blank" rel="noreferrer"> <img src="https://intellyx.com/wp-content/uploads/2022/09/Knack-intellyx-BC-logo-1200x628-1-768x480.png" alt="pecode" width="256" height="160"/></a>

## This repository's was created like a part of technical interview with Knack

### For this task next methods and techniques being used:

1. Page Object Model
2. Constants in a separate file
3. Jenkiinsfile with pipeline script to run tests
4. Dockerfile to run in docker container
5. Pre-commit hook to run Prettier for auto code formatting before commit
6. Github Actions yml file

## Setup:

1. Clone this repository
2. Navigate to the folder of cloned repository and run terminal
3. Install dependencies with `npm install`
4. To run test in headless mode `npm test`

## To run test dockerized:

1. `docker build --tag knack-playwright-task .` (to build image)
2. `docker run --name knack-playwright-task -v $PWD:/tests -w /tests --entrypoint=playwright mcr.microsoft.com/playwright:focal run`
3. `docker image rm ` to remove image

## Jenkins Setup

1. Make sure that NodeJS Plugin is installed
2. Java JDK PATH is added

## Running job in Jenkins locally

- Create a new pipeline
- Pipeline script from SCM
- SCM (Git)
- Change a path to Jenkins file `Jenkinsfile`
- Use the current repo URL
