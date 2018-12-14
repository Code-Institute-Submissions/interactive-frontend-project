# Your Project's Name

The project is to build and interactive dashbard which graphs data to the UI.  
All graphs are interactive and update with new filters on the fly.
 
## UX

As per the guidlines this is a  Single-Page Application (SPA) with all the information flowing down the page.

The original design have some text to the right of each chart but it through the flow of the page off.  
On the redesign the flow was better, with everything under each other in hidden boxes and some accordion buttons.
The header that the top will be fixed and flow down the pages allowing a user to change filters on the fly.

The user story behind the pages is 
AS a user
WHEN I view a chart
AND I change a fiter
THEN I the data in the charts will update

The page is running off bootstrap with some minor alterations to some boxes and using jQuery foor the button behaviours.

Wireframes available in ./static/wireframes/

## Features

Fixed header with filters.
Interactive charts with onClick behaviour with in the chart.

## Future Features

Build automation into project

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

For now, I have buult some manual test using Cucumber (https://docs.cucumber.io/).  This will be expanded later in an automation project.


Feature: Applying filters in headers

Description: We want to make sure charts update correctly when we use the fiters in the header.

Scenario: A01-Using the Filter Selector button
    Given I am a user on the dashbaord page 
    When I click on the Filter Selector button
    Then I will see the filters appear
	
Scenario: A02-Using the Filter Selector button
    Given I am a user on the dashbaord page 
    When I select a [FILTER] in the headers
    Then I will see all the charts update 
	
[FILTER]
Gender
Equipment
Feberation
Meet State
Event

Feature: Interactive Charts

Description: We want to make sure charts are interactive

Scenario: B01-Interactive Charts
    Given I am a user on the dashbaord page 
    When on an [AgeClass] on the [Chart] chart
    Then I will this this chart update
	And I will see all the other charts update

[Chart]
[Gender / Age Class]
[Equipment used by competitors]
[Equipment used per event]
[Shows gender break down for Event]

[Chart]-[Filter]
[Gender / Age Class]-[AgeClass]
13-15
16-17
18-19
20-23
24-34
35-39
40-44
45-49
50-54
55-59
60-64
65-69
70-75
80-99

[Equipment used by competitors]-[Equipment]
Raw
Wraps only
Single-ply only
Multi-ply

[Equipment used per event]-[Event]
[Shows gender break down for Event]-[Event]
B - Bench press
S - Squat
D - Deadlift
SB - Squat and Bench Press
SD - Squat and Deadlift
BD - Bench Press and Deadlift
SBD - Squat and Bench Press and Deadlift


Feature: Legend Buttons

Description: We want to make sure the lengen are working

Scenario: C01-hidden legends
    Given I am a user on the dashbaord page 
    When I am on the Dashboard
    Then All the legends will be hiden

Scenario: C01-show legends
    Given I am a user on the dashbaord page 
    When I am on the Dashboard
	And I click on a Click for legend button
    Then I will see the legend appear underneath


## Deployment

Page deployed on gitHub.  
No dependencies needed to view the page.

To run the code locally, download entire directory and open index.html.


## Credits

Data taken from https://www.openpowerlifting.org/data

### Content
external link to wiki pages on PED's (https://en.wikipedia.org/wiki/Performance-enhancing_substance)

### Media
No photos of extra media needed.

