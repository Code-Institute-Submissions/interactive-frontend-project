# Your Project's Name

The project is to build and interactive dashbard which graphs data to the UI.  
All graphs are interactive and update with new filters on the fly.
 
## UX

Taken a single page approach with all the information flowing down the page.

The original design have some text to the right of each chart but it through the flow of the page off.  
On the redesign the flow was better, with everything under each other in hidden boxes and some accordion buttons.
The header that the top will be fixed and flow down the pages allowing a user to change filters on the fly.

The user story behind the pages is 
AS a user
WHEN i view a chart
AND i change a fiter
THEN i the data in the charts will update

The page is running off bootstrap with some minor alterations to some boxes and using jQuery foor the button behaviours.

Wireframes available in ./static/wireframes/

## Features

Fixed header with filters.
Interactive charts with onClick behaviour with in the chart.


In this section, you should go over the different parts of your project, and describe each in a sentence or so.
 
## Technologies Used

- HTML and CSS

- [JQuery] https://jquery.com
    - The project uses **JQuery** to simplify DOM manipulation.

- [dc.js] Dimensional Charting Javascript Library https://dc-js.github.io/dc.js/
    - Creating charts on UI

- [d3.js] Data-Driven Documents https://d3js.org/
    - for data visualization 

- [crossfilter] http://square.github.io/crossfilter/

- [awesome font] https://fontawesome.com/

- [bootstrap] https://bootswatch.com


## Testing

In this section, you need to convince the assessor that you have conducted enough testing to legitimately believe that the site works well. Essentially, in this part you will want to go over all of your user stories from the UX section and ensure that they all work as intended, with the project providing an easy and straightforward way for the users to achieve their goals.

Whenever it is feasible, prefer to automate your tests, and if you've done so, provide a brief explanation of your approach, link to the test file(s) and explain how to run them.

For any scenarios that have not been automated, test the user stories manually and provide as much detail as is relevant. A particularly useful form for describing your testing process is via scenarios, such as:

1. Contact form:
    1. Go to the "Contact Us" page
    2. Try to submit the empty form and verify that an error message about the required fields appears
    3. Try to submit the form with an invalid email address and verify that a relevant error message appears
    4. Try to submit the form with all inputs valid and verify that a success message appears.

In addition, you should mention in this section how your project looks and works on different browsers and screen sizes.

You should also mention in this section any interesting bugs or problems you discovered during your testing, even if you haven't addressed them yet.

If this section grows too long, you may want to split it off into a separate file and link to it from here.

## Deployment

This section should describe the process you went through to deploy the project to a hosting platform (e.g. GitHub Pages or Heroku).

In particular, you should provide all details of the differences between the deployed version and the development version, if any, including:
- Different values for environment variables (Heroku Config Vars)?
- Different configuration files?
- Separate git branch?

In addition, if it is not obvious, you should also describe how to run your code locally.


## Credits

Data taken from https://www.openpowerlifting.org/data

### Content
external link to wiki pages on PED's (https://en.wikipedia.org/wiki/Performance-enhancing_substance)

### Media
No photos of extra media needed.

