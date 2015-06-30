App is running live at: http://labs.atsid.com/18f-RFQ993471-POOL1/

-------

[Applied Technical Systems Inc. (ATS)](http://labs.atsid.com/) is proud to submit a prototype redesign of the current FDA [Medwatch](http://www.fda.gov/Safety/MedWatch/) website.  The prototype can be found here: http://labs.atsid.com/18f-RFQ993471-POOL1/

The team’s [project plan](https://github.com/atsid/18f-RFQ993471-POOL1/wiki/1.-Project-Plan) for this prototype design was to use an [iterative approach](https://github.com/atsid/18f-RFQ993471-POOL1/wiki/6.-Pool-1-Attachment-E-&-Additional-Technical-Approach-Criteria-Evidence#8---used-an-iterative-approach-where-feedback-informed-subsequent-work-or-versions-of-the-prototype), combining the tenets of [Lean Start-Up](https://github.com/atsid/18f-RFQ993471-POOL1/wiki/1.-Project-Plan#lean-start-up-project-aspects) and [Agile Development](https://github.com/atsid/18f-RFQ993471-POOL1/wiki/1.-Project-Plan#agile-project-aspects).   

Our team was made up of [six team members](https://github.com/atsid/18f-RFQ993471-POOL1/wiki/6.-Pool-1-Attachment-E-&-Additional-Technical-Approach-Criteria-Evidence#2---assembled-a-multidisciplinary-and-collaborative-team-that-includes-at-a-minimum-of-three-of-the-labor-categories-limited-to-the-design-pool-labor-categories-to-design-the-prototype-as-quoted-in-attachment-c) with a range of different backgrounds and experiences. From the team, Rick Lee, was selected to be the [leader and Product Manager](https://github.com/atsid/18f-RFQ993471-POOL1/wiki/6.-Pool-1-Attachment-E-&-Additional-Technical-Approach-Criteria-Evidence#1---assigned-one-leader-gave-that-person-authority-and-responsibility-and-held-that-person-accountable-for-the-quality-of-the-prototype-submitted) for the prototype development.  In this role he prioritized deliverables, directed actions for each Sprint, held team members accountable, and was held accountable to ensure a quality prototype was submitted on time.  

To begin we looked at what parts of the FDA could generate the open source data, which lead us to discover Medwatch. We then [researched](https://github.com/atsid/18f-RFQ993471-POOL1/wiki/2.-UXD-Research,-UXD-Wireframes-&-Data-Research-Documentation#medwatch-research) what Medwatch does for the public and brainstormed how users may interact with the website. We also looked for relationships between the Medwatch search results and data provided on  [Open.FDA.gov](https://open.fda.gov/).  After an analysis the team felt confident that the Drugs and Devices data closely aligned with the Medwatch data, propelling us forward to redesign the Medwatch page.

After confirming the data, the team brainstormed possible redesign ideas.  Based upon these ideas the team developed interview questions and went out to interview members of the public, both [inside ATS](https://github.com/atsid/18f-RFQ993471-POOL1/wiki/2.-UXD-Research,-UXD-Wireframes-&-Data-Research-Documentation#initial-internal-ats-user-interview-documentation) and [outside ATS]( https://github.com/atsid/18f-RFQ993471-POOL1/wiki/2.-UXD-Research,-UXD-Wireframes-&-Data-Research-Documentation#initial-external-ats-user-interview-documentation).  We also were able to engage a [medical expert](https://github.com/atsid/18f-RFQ993471-POOL1/wiki/2.-UXD-Research,-UXD-Wireframes-&-Data-Research-Documentation#june-18-2015-user-subject-matter-expert-research), who gave us great insight into how both professionals and the public engage with the FDA and Medwatch.

This first user feedback effort resulted in 50+ responses. The most surprising feedback was the preponderance of interviewees not knowing of Medwatch or considering using the FDA as a source for this information.  Interviewees preferred to contact their physician or pharmacist to get recall or adverse effect information on medicines they are taking. News outlets were also a popular choice to get this information. We also found interest in getting notifications of recalls on mobile devices via personalized alerts.

While we were gathering this initial customer information and developing our [first wireframes](https://github.com/atsid/18f-RFQ993471-POOL1/wiki/2.-UXD-Research,-UXD-Wireframes-&-Data-Research-Documentation#june-23-2015-user-tests) the team also began to define the [modern and open-source front end/client-side web technologies](https://github.com/atsid/18f-RFQ993471-POOL1/wiki/6.-Pool-1-Attachment-E-&-Additional-Technical-Approach-Criteria-Evidence#6---used-at-least-three-modern-and-open-source-frontend-or-client-side-web-technologies) we were to use ([ensuring they were openly licensed and free of charge](https://github.com/atsid/18f-RFQ993471-POOL1/wiki/6.-Pool-1-Attachment-E-&-Additional-Technical-Approach-Criteria-Evidence#11---prototype-and-underlying-platforms-used-to-create-and-run-the-prototype-are-openly-licensed-and-free-of-charge)) and our selected [design style guide and/or pattern library]( https://github.com/atsid/18f-RFQ993471-POOL1/wiki/6.-Pool-1-Attachment-E-&-Additional-Technical-Approach-Criteria-Evidence#5---created-or-used-a-design-style-guide-andor-a-pattern-library).  For our development tools we utilized AngularJS, JQuery, Bootstrap, Angular-UI/UI-Router, RaphaelJS, Less.JS, HTML5, CSS3, and Google Maps Javascript API.  Our team also chose to utilize the USPTO pattern library (which ATS helped develop for the USPTO) as our foundation for many of the individual components used in our prototype. 

As we developed our first wireframes, the team decided to conduct a [Focus Group](https://github.com/atsid/18f-RFQ993471-POOL1/wiki/2.-UXD-Research,-UXD-Wireframes-&-Data-Research-Documentation#june-22-2015-focus-group) before the end of [Sprint 1](https://github.com/atsid/18f-RFQ993471-POOL1/wiki/4.-Sprint-1---June-22,-2015).   The feedback from the focus group showed that our initial idea for a personalized Medwatch page would go nowhere with the public.  This was a result of users not wanting to provide personal medical information to the Federal Government.   This caused our team to [pivot](https://en.wikipedia.org/wiki/Lean_startup#Pivot) to a new design concept of making multiple pages showing different data information based upon search results as a focus in [Sprint 2](https://github.com/atsid/18f-RFQ993471-POOL1/wiki/4.-Sprint-2-June-23,-2015) and [Sprint 3](https://github.com/atsid/18f-RFQ993471-POOL1/wiki/4.-Sprint-3-June-24,-2015).

In keeping with our project strategy of having user feedback to [understand what people need by engaging them in the design process](https://github.com/atsid/18f-RFQ993471-POOL1/wiki/6.-Pool-1-Attachment-E-&-Additional-Technical-Approach-Criteria-Evidence#3---understand-what-people-need-by-including-people-in-the-prototype-design-process) we conducted [one-on-one user/usability tests with three ATS employees](https://github.com/atsid/18f-RFQ993471-POOL1/wiki/2.-UXD-Research,-UXD-Wireframes-&-Data-Research-Documentation#june-25-2015-user-tests) after the end of [Sprint 4](https://github.com/atsid/18f-RFQ993471-POOL1/wiki/4.-Sprint-4---June-25,-2015).   This, and [future](https://github.com/atsid/18f-RFQ993471-POOL1/wiki/6.-Pool-1-Attachment-E-&-Additional-Technical-Approach-Criteria-Evidence#7---performed-usability-tests-with-people) usability tests ensured we had a consistent flow of user information to guide our design work.

Our next pivot after the Sprint 4 user feedback into [Sprint 5](https://github.com/atsid/18f-RFQ993471-POOL1/wiki/4.-Sprint-5-June-26,-2015) moved us away from a multiple page concept to a dashboard concept based upon the [Zillow](http://www.zillow.com/) website.  This new [single page application](https://github.com/atsid/18f-RFQ993471-POOL1/wiki/2.-UXD-Research,-UXD-Wireframes-&-Data-Research-Documentation#june-26-2015-whiteboards---pivot-to-new-design) would allow a geography based solution and would be the focus of the work completed during [Sprint 6](https://github.com/atsid/18f-RFQ993471-POOL1/wiki/4.-Sprint-6-June-27-&-28,-2015). 

At the end of [Sprint 7](https://github.com/atsid/18f-RFQ993471-POOL1/wiki/4.-Sprint-7-June-29,-2015) we conducted one final user test of a [design expert](https://github.com/atsid/18f-RFQ993471-POOL1/wiki/2.-UXD-Research,-UXD-Wireframes-&-Data-Research-Documentation#june-29-2015-final-user-test) that caused our last major pivot, which took our dashboard concept and changed parts of the functionality. Overall, the team used numerous [human-centered design techniques](https://github.com/atsid/18f-RFQ993471-POOL1/wiki/6.-Pool-1-Attachment-E-&-Additional-Technical-Approach-Criteria-Evidence#4---used-at-least-three-human-centered-design-techniques-or-tools) or tools throughout the project lifecycle.

Before submission of our prototype at the end of [Sprint 8](https://github.com/atsid/18f-RFQ993471-POOL1/wiki/4.-Sprint-8-June-30,-2015) the team make sure the prototype worked on [multiple devices and was responsive](https://github.com/atsid/18f-RFQ993471-POOL1/wiki/6.-Pool-1-Attachment-E-&-Additional-Technical-Approach-Criteria-Evidence#9---created-a-prototype-that-works-on-multiple-devices-and-presents-a-responsive-design) and [created sufficient documentation to install and run the prototype on another machine](https://github.com/atsid/18f-RFQ993471-POOL1/wiki/6.-Pool-1-Attachment-E-&-Additional-Technical-Approach-Criteria-Evidence#10---provided-sufficient-documentation-to-install-and-run-their-prototype-on-another-machine) via the [DeveloperREADME](https://github.com/atsid/18f-RFQ993471-POOL1/blob/master/DeveloperREADME.md).  We also solidified our [project backlog](https://github.com/atsid/18f-RFQ993471-POOL1/wiki/5.-MEDWATCH-Project-Backlog) and ensured all of our artifacts were present in our GitHub repository or [wiki](https://github.com/atsid/18f-RFQ993471-POOL1/wiki), which we encourage you to explore. 

-------
For development or to run the app locally, please see the [Developer README](https://github.com/atsid/18f-RFQ993471-POOL1/blob/master/DeveloperREADME.md)
