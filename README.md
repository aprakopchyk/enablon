Hey!

Here's a brief overview of test suite contests: 
Purpose of Tests: The test suite focuses on testing the functionality of "Todo" application. In general test suite ensures that user can successfully add, edit, and delete tasks, more specifically - I verified that task state is changed after the selection, checked that user is able to delete tasks using both delete options and correct number of tasks is displayed after tasks adding and after deletion. Negative scenarios with most common and most suitable for that app verifications are included too. 

Patterns Used: 

Using NodeJS + webdriverIO + mocha + chai library. 
I created two main folders - 'App' and 'Framework'. Files in 'App' are related to the specific project functionality. In 'pageObject' folder you can see the implementation of the Page Object Model (POM) pattern, which allows for better code reusability and reduced maintenance. By encapsulating page-specific behaviors within individual 'page objects', it ensures that changes in the UI will only require updates in one place. 'Framework' folder includes files which contain methods and utils that are common and could be reused in other projects. Creating such files as 'baseElement' and 'basePage' alows us to update webdriverIO methods by adding there specific logic and reporting, the last thing helps whith test cases analyzing. - any exceptions or failures will be logged with a timestamp for easy debugging. The tests pull data from a separate testData module. This allows for easy modifications to test input without altering the test logic.

Test Organization: The tests are organized by functionalities. For instance, tests related to adding tasks are grouped, and those related to editing tasks are bundled together. This modular approach makes it easier to find, add, or modify tests related to specific features. Also cases are visibly separated as 'Positive checks' and 'Negative checks'. 

Reporting: After each test run, a report is generated which show the results of each test case, including detailed logs of any failures. I decided to use 'Allure' for a visual representation of test results. Also 'Winston' is used as versatile logging library which allows to categorize the importance and nature of the information being logged.

Thanks!
