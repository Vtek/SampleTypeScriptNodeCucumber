Feature: Add a Website on Google
  As a user, i want to add a website on Google

  Scenario: Search with a value
    When I add a website on Google with the following information
    | Url | Title | Description |
    | https://www.typescriptlang.org/ | TypeScript - JavaScript that scales. | TypeScript brings you optional static type-checking along with the latest ECMAScript features. |
    Then the website is added