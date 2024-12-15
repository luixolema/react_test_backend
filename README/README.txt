*** Backend Architecture:

NestJS is a framework that natively uses TypeScript and promotes modular development, providing dependency injection. This results in a much better architecture by default.
I also applied the principles of Clean Architecture to ensure modules are independent from each other (following the SRP—Single Responsibility Principle).
I defined the "Books" and "User" modules to serve as internal dependencies for the "Web" module. This separation can provide flexibility in the future, as these modules could eventually become independent services.
The "Web" module is responsible for orchestrating the web API for external clients, handling the interaction between books and users.
Inside each module, you’ll find services that expose the module’s functionalities through an open API.
I also used inheritance to define useful interfaces and base classes that provide foundational functionality and definitions, such as abstract.repository.ts and abstract.schema.ts.


***Frontend Architecture:

I focused on separating concerns by defining distinct features and making them as independent as possible.
For better and more predictable data flow in React, I used React-Redux (which I consider crucial).


***Frontend UI:

I used Ant Design and Tailwind CSS to achieve responsiveness and a clean design, aiming for a good overall UX/UI.


***DB Design:
I chose MongoDB for simplicity (just because, why not?). However, considering the project’s description, a relational database might actually be a better choice for a larger or more complex scenario.
The "Author" could also be a separate document, but I left it inside the "Book" document to simplify things for this basic use case. That said, I’m aware that separating it could bring more flexibility for future feature development (in which case, a relational database could be a better fit).


***Bonus Points:

DONE: Implemented user authentication for login and registration using Amazon Cognito.
DONE*: Implemented a "Favorites" list where users can save and manage their favorite books. This feature was integrated directly into the book list for a better UX.
NOT DONE: Verified work with unit tests.
EXPLANATION: I would have created Cypress E2E tests (to test the whole system), but due to time constraints, I couldn’t get to it.
NOT DONE: Used a monorepo build system to structure the project.
EXPLANATION: While I personally think monorepos are overvalued, I am open to studying the benefits and drawbacks of this approach.


***Considerations:

For simplicity, the user's favorite books are stored within the user document (as a reference). However, for a more complex scenario, it could be worth considering a separate document for user "extra data," which would include their favorite books.
The environment variables for authentication with Cognito in the frontend project are hardcoded. In a real scenario, these should be defined as environment variables and passed to the Docker Compose file, similar to how I handled the database, URLs, etc.
To run the project:


*** To run the project:

1- run in your console 
    docker-compose up --build
2- Navigate to:
    http://localhost:3000 in your browser.
    testUser: test@test.test password: Test123.
