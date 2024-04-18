Scenario:
=========

A developer on our team was working on integrating the TomTom API. They did a great job laying the groundwork, but they've recently been promoted to a new project that requires their full attention.

We are pretty confident the developer managed to complete the majority of the initial part of the integration, however there might be a bug or two to be discovered.

Your task is to finish off this implementation, ensuring the requirements are met with passing tests.


Task:
=====
To take a partial address input and return full address suggestions along with the address broken into its individual components using the TomTom API.


Resources:
==========

Place Search Documentation: https://developer.tomtom.com/search-api/documentation/search-service/search-service
API Key: Oyb0npJAVdRwDauqpFez7zKCy2euUYql

Install:
========
1. yarn install

Test:
=====
1. yarn install
2. yarn test


Requirements:
=============
1. All tests should pass and ensure good coverage for new work
2. We only allow Australian addresses to be returned
3. Code should be maintainable and consistent
4. The result elements should contain important information about the place (country, municipality, etc)
5. The returned result should be typed and easily consumable via users of the library
6. No front-end requirements are necessary, this is purely a backend NodeJS library


Changes:
=============
1. Zod Schema Validation
    - Adding a schema validation for the TomTom API response means that we get several things with 1 change:
        - Safely typed responses from the API
        - Infered types from the schema that can be exported from the library
        - Allows detailed errors with details of exactly how the reponse is malformed
2. Custom Error Type 
    - Used when the API Response is incorrect, errors with extra details like these can be very helpful for library consumers as then can pinpoint exact error details and potential fixes
    - Ideally the error details would not be of type ZodError 
3. Nock
    - The nock testing library allow simple tests for API responses when you either cannot call the API itself in the test or when you want to force unexpected scenarios


Missing:
=============
1. Build script for creating the dist to be published to npm
2. Properly test with `yarn link` the above dist
