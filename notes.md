
# Email Microservice getting started

>> Services we'll make this work with

- Nodemailer 
- Mailjet = https://app.mailjet.com/transactional/sendapi
- Sendgrid (we'll use all of these)

### Folder structure
- src (we store all of our application code here)
- bin (this is where we put our startup files for when we want to deploy this)

>> Note 1: Added models, unit tests for Mail and EmailAddress.

At this point, we've created the project structure, we've added some unit tests for our models that we identified.

We also realized that we want to encapsulate the EmailAddress field itself, because this is a field that could potentially be invalid. It has invariants, so in order to ensure that an invalid object never even gets created in our app, we'll enforce the invariant rule close to the model. 

Encapsulation is one of the principles of OOP. This is a good way to enforce it.

We also added a Guard and Result class which are two patterns which can help us safely throw errors in a functional way instead of throwing explicit errors that break the flow of the program and create erradic behaviour.

So now that we have the mail model, we can start modeling the email sending service.

Let's do that now with the first service... Nodemailer.