# README

Welcome to Crushed It!

> **Prerequisites**
>
> - Redwood requires [Node.js](https://nodejs.org/en/) (>=14.19.x <=16.x) and [Yarn](https://yarnpkg.com/) (>=1.15)
> - Are you on Windows? For best results, follow our [Windows development setup](https://redwoodjs.com/docs/how-to/windows-development-setup) guide

Start by installing dependencies:

```
yarn install
```

Then change into that directory and start the development server:

```
cd my-redwood-project
yarn redwood dev
```

Your browser should automatically open to http://localhost:8910.

# Project Overview

The CS490 project is designed to introduce students to the experience of a professional software engineer. The student will function as a member of a team adding features to a core codebase in creation of a SaaS product. The student will be onboarded to the product codebase and will use Git and GitHub to manage their work. Development will follow an Agile software development lifecycle (SDLC).

The product is a productivity tool called *Crushed*. *Crushed* is a time and task management system that is inspired by Franklin-Covey, Free-to-Focus, and Motion planning software. *Crushed* provides a means of planning each day's tasks, prioritizing work, and giving a history of what has been done.

Implementation of *Crushed* will use the RedwoodJS framework. Redwood is a JavaScript framework that includes an entire tech stack. That tech stack includes React, GraphQL, Prisma, Jest, Storybook and an RDBMS. RedwoodJS is targeted at start-up companies, and our class will function as a start-up building an MVP (minimal viable product).

## Project Rubric

The project is accounts for 60% (or 120 points) of your course grade. Each student is graded separately regardless of their team.

Project grading breaks down as follows:

| Item                                             | Percentage | Points |
| ------------------------------------------------ | ---------- | ------ |
| Coding habits (comments, commits, pull requests) | 30%        | 36     |
| Robust unit testing                              | 30%        | 36     |
| Working software (including completing on-time)  | 30%        | 36     |
| Final presentation (and reflection)               | 10%        | 12     |

## Team Foundation

All tasks will be completed in a team of three or four students. The very first deliverable (this is homework #4) for the project will be a team formation survey: you will be able to indicate your preferences for teammates. The instructor will assign students to teams based on a number of factors including your responses to the survey. All students in each team must be in the same section of the class.

## Working with Git and GitHub

The project code will be source managed on GitHub. The instructor will host the repository. Work is managed using the [GitHub Flow](https://docs.github.com/en/get-started/quickstart/github-flow) methodology. Students will create feature branches for their work and make changes on their local device. After testing the changes they will issue a pull request to have their code merged into the main code branch. Students will not commit nor merge into the main branch directly.

Pull Requests will be peer reviewed by other students. Performing code reviews and giving helpful comments will be part of the project grade. When reviewing code, students will use the [Google JavaScript Styleguide](https://google.github.io/styleguide/jsguide.html) as the standard. Code will not be merged until it the PR has been accepted by the reviewers.

## Agile SDLC with GitHub Project

The project will be developed using Agile principles borrowed from Scrum and Kanban. The class will use GitHub Project boards to manage development. Individual cards will represent tasks and will contain the use case and requirements for the task. Cards will be assigned to students during Sprint Planning. It is the students responsibility to document progress with their cards. The Agile process will have two ceremonies; Sprint Planning where tasks are assigned to students; and Sprint Demo where students will show their work.

## Project Implementation and Documentation

At two week intervals student will participate in Sprint Demos and Sprint Planning. There will also be opportunity for peer evaluation. Teams will deliverable will be a “release” of each new feature on GitHub (with tests), and will be accompanied by a demo. Each team is expected to contribute a minimum of two features.

Your final team deliverable will include:

* The implementation of your new features
* Automated tests for your new features
* A short presentation describing your work

Accompanying the final team deliverable will be an _individual reflection_, which every student must submit on their own, which will include your reflections on:

* The evolution of your project concept: How does the project that you delivered compare to what you originally planned to deliver? What caused these deviations?
* The software engineering processes that you feel could have been improved in your project: were there any procesess that in hindsight, you wish that you followed, or wish that you followed better?
* Your team dynamic: Provide a frank (and ideally, blameless) postmortem of your and your teammates collaborative performance and participation. If you had to do this same project over with the same teammates, what would _you_ have done differently (or not) to improve your team’s overall performance?

# RedwoodJS
Here is move information about this project's tech-stack provided by the RedwoodJS framework.

> **The Redwood CLI**
>
> Congratulations on running your first Redwood CLI command!
> From dev to deploy, the CLI is with you the whole way.
> And there's quite a few commands at your disposal:
> ```
> yarn redwood --help
> ```
> For all the details, see the [CLI reference](https://redwoodjs.com/docs/cli-commands).

## Prisma and the database

Redwood wouldn't be a full-stack framework without a database. It all starts with the schema. Open the [`schema.prisma`](api/db/schema.prisma) file in `api/db` and replace the `UserExample` model with the following `Post` model:

```
model Post {
  id        Int      @id @default(autoincrement())
  title     String
  body      String
  createdAt DateTime @default(now())
}
```

Redwood uses [Prisma](https://www.prisma.io/), a next-gen Node.js and TypeScript ORM, to talk to the database. Prisma's schema offers a declarative way of defining your app's data models. And Prisma [Migrate](https://www.prisma.io/migrate) uses that schema to make database migrations hassle-free:

```
yarn rw prisma migrate dev

# ...

? Enter a name for the new migration: › create posts
```

> `rw` is short for `redwood`

You'll be prompted for the name of your migration. `create posts` will do.

Now let's generate everything we need to perform all the CRUD (Create, Retrieve, Update, Delete) actions on our `Post` model:

```
yarn redwood g scaffold post
```

Navigate to http://localhost:8910/posts/new, fill in the title and body, and click "Save":

Did we just create a post in the database? Yup! With `yarn rw g scaffold <model>`, Redwood created all the pages, components, and services necessary to perform all CRUD actions on our posts table.

## Frontend first with Storybook

Don't know what your data models look like?
That's more than ok—Redwood integrates Storybook so that you can work on design without worrying about data.
Mockup, build, and verify your React components, even in complete isolation from the backend:

```
yarn rw storybook
```

Before you start, see if the CLI's `setup ui` command has your favorite styling library:

```
yarn rw setup ui --help
```

## Testing with Jest

It'd be hard to scale from side project to startup without a few tests.
Redwood fully integrates Jest with the front and the backends and makes it easy to keep your whole app covered by generating test files with all your components and services:

```
yarn rw test
```

To make the integration even more seamless, Redwood augments Jest with database [scenarios](https://redwoodjs.com/docs/testing.md#scenarios)  and [GraphQL mocking](https://redwoodjs.com/docs/testing.md#mocking-graphql-calls).

## Ship it

Redwood is designed for both serverless deploy targets like Netlify and Vercel and serverful deploy targets like Render and AWS:

```
yarn rw setup deploy --help
```

Don't go live without auth!
Lock down your front and backends with Redwood's built-in, database-backed authentication system ([dbAuth](https://redwoodjs.com/docs/authentication#self-hosted-auth-installation-and-setup)), or integrate with nearly a dozen third party auth providers:

```
yarn rw setup auth --help
```

## Next Steps

The best way to learn Redwood is by going through the comprehensive [tutorial](https://redwoodjs.com/docs/tutorial/foreword) and joining the community (via the [Discourse forum](https://community.redwoodjs.com) or the [Discord server](https://discord.gg/redwoodjs)).

## Quick Links

- Stay updated: read [Forum announcements](https://community.redwoodjs.com/c/announcements/5), follow us on [Twitter](https://twitter.com/redwoodjs), and subscribe to the [newsletter](https://redwoodjs.com/newsletter)
- [Learn how to contribute](https://redwoodjs.com/docs/contributing)
