
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

>> Note 2: Let's add the mail microservice (nodemailer)

We've just added the first mail microservice, Nodemailer.

Example of the Open-Closed principle can be seen in how we created the interface specifying how exactly implementations of MailServices should be created. 

Specifically, they just need to have that particular method on it.

Note: this could have been done as an abstract class, using an abstract method. There's not really anything wrong with doing that, but in our case, it makes as bit more sense to just do it this way because there's not actually any shared code that we need to have between future implementatinos... at least, we don't know that yet. So... YAGNI. 

Another thing to note here is that we've just pretty much ripped code straight from the nodemailer docs https://nodemailer.com/about/ and created a TEST transport object. This is what's used in order to do testing.

The way that we're using it right now, it doesn't allow for us to actually test this thing properly... so, we can revisit it later and refactor it so that we can use Dependency Injection to inject a transport, whether that be a test transport, or an actual transport.


TODO: for later:
- to demonstrate the Single Responsibility principle, if we wanted to apply styles to our emails, where would we locate that? It would violate SRP to add this into the mailservices themselves, so perhaps we'd want to create a new abstraction, and allow us to create HTML emails.

