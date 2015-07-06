[Applied Technical Systems Inc. (ATS)](http://labs.atsid.com/) is proud to submit a prototype redesign of the current FDA [Medwatch](http://www.fda.gov/Safety/MedWatch/) website.  The prototype can be found here: http://labs.atsid.com/18f-RFQ993471-POOL1/

The [project plan](https://github.com/atsid/18f-RFQ993471-POOL1/blob/master/wiki/wiki2projectplan.md) for this prototype was to use an [iterative approach](https://github.com/atsid/18f-RFQ993471-POOL1/blob/master/wiki/wiki7attachmentEitems.md#8---used-an-iterative-approach-where-feedback-informed-subsequent-work-or-versions-of-the-prototype), combining the tenets of [Lean Start-Up](https://github.com/atsid/18f-RFQ993471-POOL1/blob/master/wiki/wiki2projectplan.md#lean-start-up-project-aspects) and [Agile Development](https://github.com/atsid/18f-RFQ993471-POOL1/blob/master/wiki/wiki2projectplan.md#agile-project-aspects).

Our team was made up of [six members](https://github.com/atsid/18f-RFQ993471-POOL1/blob/master/wiki/wiki7attachmentEitems.md#2---assembled-a-multidisciplinary-and-collaborative-team-that-includes-at-a-minimum-of-three-of-the-labor-categories-limited-to-the-design-pool-labor-categories-to-design-the-prototype-as-quoted-in-attachment-c) with a range of backgrounds and experiences. Rick Lee was selected to be the [leader and Product Manager](https://github.com/atsid/18f-RFQ993471-POOL1/blob/master/wiki/wiki7attachmentEitems.md#1---assigned-one-leader-gave-that-person-authority-and-responsibility-and-held-that-person-accountable-for-the-quality-of-the-prototype-submitted) for the prototype development.  In this role he prioritized deliverables, directed actions for each Sprint, held team members accountable, and was held accountable to ensure a quality prototype was submitted on time.  

To begin we looked at what parts of the FDA could generate the open source data, which lead us to discover Medwatch. We then [researched](https://github.com/atsid/18f-RFQ993471-POOL1/blob/master/wiki/wiki3UXDresearch.md) what Medwatch does for the public, talked to medical experts, brainstormed how users interact with the website and looked for relationships between Medwatch search results and data on [Open.FDA.gov](https://open.fda.gov/) making us pivot to more customer research.  After determining the data closely aligned with the Medwatch data, we decided to redesign the page and implement a mobile component.

First the team brainstormed possible redesign ideas and developed user questions and went out to interview members of the public, both [inside ATS](https://github.com/atsid/18f-RFQ993471-POOL1/blob/master/wiki/wiki3UXDresearch.md#initial-internal-ats-user-interview-documentation) and [outside ATS](https://github.com/atsid/18f-RFQ993471-POOL1/blob/master/wiki/wiki3UXDresearch.md#initial-external-ats-user-interview-documentation).  We also engaged a [medical expert](https://github.com/atsid/18f-RFQ993471-POOL1/blob/master/wiki/wiki3UXDresearch.md#june-18-2015-user-subject-matter-expert-research), who gave us great insight into how both professionals and the public engage with the FDA and Medwatch.

This user feedback effort resulted in 50+ responses. Feedback showed a preponderance of interviewees did not know of Medwatch or considered using the FDA as a source for this information.  Interviewees preferred to contact their physician or pharmacist to get recall or adverse effect information on medicines they are taking. News outlets were also a popular choice to receive this information. We also found interest in getting notifications of recalls on mobile devices via personalized alerts.

While gathering this initial customer information and developing our [first wireframes](https://github.com/atsid/18f-RFQ993471-POOL1/blob/master/wiki/wiki3UXDresearch.md#june-23-2015-user-tests) the team began to define the [modern and open-source front end/client-side web technologies](https://github.com/atsid/18f-RFQ993471-POOL1/blob/master/wiki/wiki7attachmentEitems.md#6---used-at-least-three-modern-and-open-source-frontend-or-client-side-web-technologies) we were to use ([ensuring they were openly licensed and free of charge](https://github.com/atsid/18f-RFQ993471-POOL1/blob/master/wiki/wiki7attachmentEitems.md#11---prototype-and-underlying-platforms-used-to-create-and-run-the-prototype-are-openly-licensed-and-free-of-charge)) and our selected [design style guide and/or pattern library](https://github.com/atsid/18f-RFQ993471-POOL1/blob/master/wiki/wiki7attachmentEitems.md#5---created-or-used-a-design-style-guide-andor-a-pattern-library).  For our development tools we utilized AngularJS, JQuery, Bootstrap, Angular-UI & UI-Router, RaphaelJS, Less.JS, HTML5, CSS3, Snazzy Maps, AngularJS-Toaster and Google Maps Javascript API.  Our team also chose to utilize the USPTO pattern library (which ATS helped develop) as our foundation for many of the individual components used in our prototype. 

As we developed our wireframes, the team decided to conduct a [Focus Group](https://github.com/atsid/18f-RFQ993471-POOL1/blob/master/wiki/wiki3UXDresearch.md#june-22-2015-focus-group) following [Sprint 1](https://github.com/atsid/18f-RFQ993471-POOL1/blob/master/wiki/wiki5sprint1.md).   The feedback from the focus group showed that our initial idea for a personalized Medwatch page would go nowhere with the public.  This was a result of users not wanting to provide personal medical information to the Federal Government.   This caused our team to [pivot](https://en.wikipedia.org/wiki/Lean_startup#Pivot) to a new design concept of making multiple pages showing different data information based upon search results as a focus in [Sprint 2](https://github.com/atsid/18f-RFQ993471-POOL1/blob/master/wiki/wiki5sprint2.md) and [Sprint 3](https://github.com/atsid/18f-RFQ993471-POOL1/blob/master/wiki/wiki5sprint3.md).

In keeping with our strategy of having user feedback to [understand what people need by engaging them in the design process](https://github.com/atsid/18f-RFQ993471-POOL1/blob/master/wiki/wiki7attachmentEitems.md#3---understand-what-people-need-by-including-people-in-the-prototype-design-process) we conducted [one-on-one user/usability tests with three ATS employees](https://github.com/atsid/18f-RFQ993471-POOL1/blob/master/wiki/wiki3UXDresearch.md#june-25-2015-user-tests) after the end of [Sprint 4](https://github.com/atsid/18f-RFQ993471-POOL1/blob/master/wiki/wiki5sprint4.md), using qualitative testing using materials and techniques developed by [Steve Krug](http://www.sensible.com/).   This, and [future](https://github.com/atsid/18f-RFQ993471-POOL1/blob/master/wiki/wiki7attachmentEitems.md#7---performed-usability-tests-with-people) usability tests ensured we had a consistent flow of user information to guide our design work.

Based on feedback our next pivot occurred before [Sprint 5](https://github.com/atsid/18f-RFQ993471-POOL1/blob/master/wiki/wiki5sprint5.md), which moved us from a multiple page design to a dashboard and mobile concept based upon [Zillow](http://www.zillow.com/) with phone-only data tracking.  This new [single page application](https://github.com/atsid/18f-RFQ993471-POOL1/blob/master/wiki/wiki3UXDresearch.md#june-26-2015-whiteboards---pivot-to-new-design) would allow a geography-based solution to be completed during [Sprint 6](https://github.com/atsid/18f-RFQ993471-POOL1/blob/master/wiki/wiki5sprint6.md). The goal of the mobile application would be to address consumer pain points of remembering to take and managing medications for a whole family.

At the end of [Sprint 7](https://github.com/atsid/18f-RFQ993471-POOL1/blob/master/wiki/wiki5sprint7.md) we conducted one final user test with a [design expert](https://github.com/atsid/18f-RFQ993471-POOL1/blob/master/wiki/wiki3UXDresearch.md#june-29-2015-final-user-test) that caused our last major pivot within our design.  We also conducted another round of public testing through our mobile prototype.  Overall, the team used numerous [human-centered design techniques](https://github.com/atsid/18f-RFQ993471-POOL1/blob/master/wiki/wiki7attachmentEitems.md#4---used-at-least-three-human-centered-design-techniques-or-tools) or tools throughout the project lifecycle.

Before submission of our prototype after the end of [Sprint 8](https://github.com/atsid/18f-RFQ993471-POOL1/blob/master/wiki/wiki5sprint8.md) the team made sure the prototype worked on [multiple devices and was responsive](https://github.com/atsid/18f-RFQ993471-POOL1/blob/master/wiki/wiki7attachmentEitems.md#9---created-a-prototype-that-works-on-multiple-devices-and-presents-a-responsive-design) and [created sufficient documentation to install and run the prototype on another machine](https://github.com/atsid/18f-RFQ993471-POOL1/blob/master/wiki/wiki7attachmentEitems.md#10---provided-sufficient-documentation-to-install-and-run-their-prototype-on-another-machine) via the [DeveloperREADME](https://github.com/atsid/18f-RFQ993471-POOL1/blob/master/DeveloperREADME.md).  We also solidified our [project backlog](https://github.com/atsid/18f-RFQ993471-POOL1/blob/master/wiki/wiki6medwatchbacklog.md) and ensured all artifacts were present in our [GitHub repository](https://github.com/atsid/18f-RFQ993471-POOL1/tree/master/wiki), which we encourage you to explore. 

Licensed under [Apache 2.0](http://opensource.org/licenses/Apache-2.0).
