
I Built an AI System That Automates My Job Applications (n8n tutorial)
The AI system scrapes job listings from LinkedIn and customizes your resume for each job. It then creates a public resume link and tracks job details in a database. Finally, you can apply directly using the tailored resume through the automated workflow.
youtube.com
Michele Torti
46:21
3:36 pm

More
Remove from Inbox
Move to Later
Archive
How to write a great agents.md: Lessons from over 2,500 repositories
GitHub Copilot’s new agents.md files let you create specialized AI helpers with clear roles and rules. Successful agents have specific commands, code examples, and strict boundaries to avoid mistakes. Start simple, give your agent a clear persona, and improve it over time for better results.
github.blog
Matt Nigh
7 mins
10:31 am
Minions: Stripe’s one-shot, end-to-end coding agents
Stripe created Minions, unattended coding agents that write and prepare code changes without human input. Engineers start Minions easily from tools like Slack, and Minions handle tasks fully before human review. Minions use Stripe’s unique tools and context to ensure safe, efficient coding at large scale.
stripe.dev
Alistair Gray
6 mins
Mar 21st
AI in QA: What I Actually Use (and What’s Still Hype)
AI helps QA teams by generating test cases, prioritizing tests, and spotting flaky tests, but it still needs human judgment. Many AI claims like self-healing tests and scriptless automation are overhyped and not reliable yet. In 2025, AI is a tool that supports skilled testers, not a replacement for them.
medium.com
Abhishek Verma
1min left
Mar 20th
The Brand Age
Swiss watches once focused on accuracy and thinness but lost ground to cheaper Japanese watches and quartz technology. Today, luxury watches sell mostly on brand and status, not engineering or function. Mechanical watches survive as symbols of wealth and tradition, though their practical use has faded.
paulgraham.com
Paul Graham
29 mins
Mar 16th
What Doesn't Kill Us
Modern life is too comfortable, making our bodies weak and less capable. Scott Carney shows that controlled stress like cold, breathwork, and physical challenge can reactivate lost health and strength. Learning to handle discomfort helps both body and mind become stronger and healthier.
PDF
Scott Carney
6 mins
Mar 14th
What is DevSecOps?
Cookies are small files stored on your device to help websites work and improve your experience. Red Hat uses cookies to enable site features, analyze use, and show relevant ads, while respecting your choices. You can manage your cookie preferences anytime, but clearing cookies will erase these settings.
redhat.com
redhat.com
2 mins
Mar 12th
Understanding DevOps
Cookies are small data files that Red Hat and its partners use to help the website work and improve your experience. You can choose to allow all cookies or only the required ones, which affects personalization and ads. Your cookie choices apply across Red Hat websites but will be reset if you clear your browser cookies.
redhat.com
redhat.com
2 mins
Mar 12th
To inbox
To previous document
To next document
toggleLeftPanelIcon
Appearance
Tag
Video
Bug
Remove from Inbox
Move to Later
Archive

More
up
SearchNavIcon
Find in document...
Clear
Previous result
Next result
Done

Hey, in this video I'm going to build an AI system that allows me to apply to thousands of jobs [music] just within a matter of minutes. It starts by pulling in a resume, then scraping the different jobs that we want from LinkedIn, checking if they're relevant, then making a tailored resume for each job based on what we do before adding it to our tracking database.

Now, [music] in case it's your first time here, my name is Mikuel, and over the past 12 months, I've personally helped over 40 businesses implement [music] these sorts of AI solutions and taught over 20,000 people in the process. All starting with zero technical knowledge.

So, I'm going to build a whole system step by step, show you all the detours and the mistakes I make along the way, [music] so you get to see what an actual real development process of an actual project looks like. With that being said, let's dive in. All right, so this right here is the full system. I'm going to run This right here, so you get to see exactly how it works. The first step is actually getting a resume, which is in a Google document right here, which is my current resume. Then what we do is we actually go to Apify, which is a platform to scrape jobs using LinkedIn.

So we go inside LinkedIn, we take out all the jobs for a specific search. So we search for sales reps in the United States, and it scrapes all the jobs. So about 100, uh, for that search. As you can see here that now it's crawling. So crawling just means that it's going inside the actual platform, LinkedIn, um to get the jobs. It got about 47 so far.

All right. Now that this is finished, it then loops over five different runs at once. It then checks the relevance of that job to see, "Hey, is it relevant to what we do?" If it's relevant, then it goes to the next step, which is a pretty sick step. Um, that basically customizes a resume. Now, again, is just a place where you basically put, hey, I worked Here, I worked there, so you can apply for a job, and they know exactly what you did. And so, what this does is that it looks at the description of the job.

It looks at your current resume, and it makes a new resume to match that job. And so, that's what this AI does. Number four, before adding it to a Google document, which is where we're going to make all the CVs. Then it adds a text in a way where it's actually formatted, right? Then it makes the link of the actual resume public before adding it to our jobs tracker database here, with the job post link, job title, seniority level, posted at, company name, company website, salary, which sometimes most times it doesn't show up, but sometimes

it does. Uh, the description of the actual job, the number of applicants that applied, the resume URL, which is the URL of the resume that it made based on the actual job that we're applying for, this right here, [Music], and then the actual application URL, which some Jobs, it doesn't show up, but for most, it does, and I can go here and take the resume that I made, and then actually apply to the job right here, attach the resume, and so on. And so that [music] there is the full system step by step.

Now, as always, I'm going to build this from scratch, show you everything that I do step by step, so you can eventually build it with me. All right, so we're going to start from scratch right here. And as always, guys, when you build something, an automation or an AI system, you don't actually start building here, but you go to your platform, Miro, in this case, we start mapping everything out. So, uh, job application AI system. Let's put this here and make this yellow and then bold. Cool. And by the way, what I'm doing right now is something that you should always be doing before you're mapping any sort of project out because it allows you to see it as a Plan of action, and then you can build it. It's so much easier doing it this way, uh, rather than just going to the actual platform and start building it.

So, okay. So, every automation that we build, whether that's an AI agent, a workflow, it doesn't really matter, has an input.

So, input — not input [snorts] — and has an output. Okay. Now, between the input and the output, there are a series of steps.

Correct. This one thing that comes in and this one thing that comes out. Now, the input, in this case, yeah, would be the search. So, LinkedIn jobs search URL. So, let me show you what I mean. If I go to LinkedIn, I can go to jobs right here. And if I go look at, so SDR, SDR is just a sales rep person who calls calls in Italy on the top right.

Here, this is the job search URL, and so what we're doing here is based on this job search URL, the system will go and scrape all of this, all of this, all of this.

and so on for each exact job posting that we can then use to then apply and so the input in this case would be the LinkedIn job search URL, and the output would be a database. And again, when I say database, I just mean a Google sheet, right? It's just a fancy way to say it. Um, so, a database with all jobs and resumes for that job. Okay, so between here and here, there are different steps. So let's map them out. Um, LinkedIn job search URL. Then, what we want to do is, we [music] want to send it to a scraper. So actually, extract, yeah, scrape jobs. From the URL, and scrape just means we go inside the actual platform here, and we start scraping, extracting all the information like this. I can just copy this and extract it, and then actually before this here, and then what we would do is, you would have your resume. So, get your current resume, and then feed this into AI. AI to check.

Whether the job is relevant. I think that's how you spell it. No, never mind. Okay. And then if it's relevant, obviously I'm going to push this a bit back here. And then if the job is relevant, then what we do is we write customized resume. And here in the middle we'll do the relevant. Boom. And then write a customized resume. And then we want to add the using AI. So AI writes a custom resume. And then we add this. So, add resume to Google doc.

And then finally, we have this write a database with all the jobs and resumes for that job. Cool. I think this is a pretty, pretty easy build. Maybe not easy, but you get to see exactly a lot of fundamentals when it comes to automation, putting Different softwarees together, seeing how it works, seeing why we do it the way we do it. Um, and you'll see exactly how it works. So, without further ado, let's get straight into it. Um, LinkedIn job search URL in NAN right here. The first step is a trigger, right? A trigger is a thing that starts the automation. Now, in this case, I’m going to set a manual trigger, which means that I get to manually start the automation. So, as I mentioned before, the first step is going inside LinkedIn getting the URL and then scraping it.

Now, the thing is, there’s no step of going inside LinkedIn itself to get the URL. We just manually go inside. We just go inside ourselves, copy this, and then we use it for the next step, and I’ll show you exactly what to do. [music] Uh but the first step is actually adding the requirements. So SDR in the US, uh experience level, let’s do entry level, company, that’s fine. Remote, yeah, remote is fine.

And now we have 410 results of SDRs in the US which are remote. And so if I go back here, the first step is actually using a platform called Apify. And if you've never heard of API, stop this video, watch this video up here. Um, but if I go here to Apify, api.com, this is a place sort of like the Amazon for scrapers, right? It’s a place where we get to use different scrapers. And a scraper is just something, a piece of code that someone built, god knows who, um, that allows us to be able to go inside a platform like Instagram or LinkedIn or Facebook or Amazon and so on.

to extract information to then use it for automations. All you have to do now is make your account, go to console, and if you go to the Apify store now, we can look for the LinkedIn jobs scraper. So it’s sort of like we’re looking for an Amazon product. This is the Amazon product, uh, LinkedIn job scraper. And now we’re introduced to this page. Now I already know that I’m going to use this One right here. But the way to know is really just to look at the number of people that have used it and the amount of stars. So in this case, this has almost double the amount of people that used it, but this one has higher stars.

If I go inside here real quick, let me see this.

I can see that this is 29.99. So, $30 a month plus usage. [Music] So, you have to subscribe to this, pay this monthly, and then use it. Meanwhile, this one right here, because obviously each product has a different way of pricing things, this is just $1 for 1,000 results. And so, if you scrape 1,000 jobs, you only have to pay [Music] $1.

Now, the good thing about APFI is that right here on the bottom, you see, we actually get, on a free plan, $5 for free, right? And so, with $5, you can scrape about 5,000 jobs every month. And the next month, it reintroduces it, which is great because 5,000 jobs is more than enough. I don't think a [Music] A normal human would apply even to a thousand jobs only if they really want the job. But right here is the scraper that we're going to use. So really, the only thing that we have to do here is actually start. So, test this, and as you can see, the input—the only input that it needs—is like the thing that goes inside the scraper saying, “Hey, here's a link of the actual job search URL,” and turn the link into a list of jobs.

Um, now I [Music] think to explain that this, so the input is this, and then the output—be, scraper—goes inside LinkedIn and pulls in job one and everything about job one, then job two, everything about job two, then job three, everything about job three, XYZ, right, for like 100 jobs. And so, with these jobs, then we can go to the next step—right of getting the current resume, seeing if it is even a good fit for us, and then later on. So, cool. So, we have this, and let's actually paste the SDR, um.

URL. So copy this and you can paste it here. Let me zoom out. And now it's asking us to scrape company details. This is optional. Yes, we do because now we know the company website, company name, company description, all that stuff, which is great. And then number of jobs needed. So, this is saying, hey, how many jobs do you want to extract from the actual uh URL? Now you can't do less than 100. Let’s just do 100. [music] And let's save and start. So, if I press save and start, what this will now do is going to start to run the actor.

Which means that now, the actor itself, and this might look complicated if it's the first time that you look at this, uh even if it's not the first time you look at this, but just know that now the actual thing is going inside 25 jobs. So, it's going inside here and it's starting to pull all the text from here, the company, all that stuff that it needs to do over 100 applicants. So, this is the amount of applicants, uh, the time, the Location, the name of the actual company, the name of the role, all that stuff that we need. And then it's going to give it to us on here. Okay. Now, for the sake of time, I'm not going to wait.

Never mind. I'm going to wait and see you when it's finished. As you can see, this now finished. I know this because it says succeeded script request, number of records, and I paid a total of 0.101, which is insane. And it took about a minute and 20 seconds, right? In the output here, if you want to look at it as a normal person, you'll be able to see the apply URL, which isn't for everyone. So, this is going to be a filter that we have to put saying, hey, only go forward if we have an apply URL, a URL to apply. And then benefits. Okay. Company description, company LinkedIn URL. If I go here, I can see the company LinkedIn URL. Cool. company logo, company name, website, uh description, HTML, description text, fulltime ID, industry, input URL. Yeah.

Okay, cool. And a bunch more other stuff. Amazing. So now what we have to do is not use this manually. What we have to do now is connect API to any 10. So in our automation, we can give it URL. It can script everything and then give us the results. All right. All right. So before we go to aify, let's put it in the edit [music] fields node to add the variable which is LinkedIn search URL [music] and the value. Let's just put this value here. The reason why we do this over just adding it to the actual node of API is because I want to store it somewhere. And if I want to change it, I can just go back here and just change it here. Right. All right. Once we have this, let's name this job search URL. And the next step would be Apify. So, if I go to Apify here, I can see that I have a ton of stuff.

Let me move my face so you can actually see it. Um, but right here, I can see that I have run an actor, run an actor and get Data set, scrape, single URL, get last run. Just know that you don't actually need to know most of this or pretty much any of this. Uh, the only thing you have to know how to use is run an actor. Now, if you had asked me this question about a week ago before they updated the node, I would have told you to use just [music] this. But we're going to use run an actor and get data set. Now, the reason why we're using this over this is

because previously Apify, they had a system so that you had to use run an actor, which basically sends the information to API and says, "Okay, here's a URL. Here's the input. Go and scrape it, right? Go and extract the information." When it's finished, it actually doesn't give me the actual data. It gives me a code, which is the data set ID. And then we would have to use this right here, get data set items to be able to then extract the actual data. Right? So, two [music] steps.

Whilst in here, I give it the URL and it Gives me the actual output without us having to use two different steps. Now, if you never actually use API in your automations, then you don't really know what I'm talking about fully. Um, but any other video that I talk about API, I talk about this concept, which makes it much easier for us to then build with API because you only have to use one step. So run an actor and get data set right here. And all I have to do here is connect our account to NN. [music] So right here, OOTH 2, I can actually name this with my account. Mik connection.

Connect my account. And they made it actually a lot easier for us to do it cuz previously you needed an API key. So that's fine. Cool. And now the resource will be actor because that is the thing that we're using. The operation which is what is the action that we're taking. The actor source will be recently used actors. The actor will be the LinkedIn job scraper. Now, if you don't see this here, it's because you haven't run it on The actual platform. So, you have to go here and actually run this. Let me go back to. Yeah, you have to run this because then it's recognized as an actual scraper that you used in the platform. And so, then you'll be able to see it here. And now it's asking us for the input JSON. Now, one of the most important things about API to understand when it comes to automations is that you can use API manually within the actual platform like we did here and use the results that we got here or you can use it within our automations, and in that

case, we can use this [music] JSON. So the JSON is basically like the manual thing. The only difference is that we can feed this. I can just copy [music] this in here. So, let me delete this and paste this here. And this is now the input, right? The input is how many jobs do you want to scrape? Do you want to scrape the company details as well? Yes, which is true. [music] URL? So what is the LinkedIn job search URL? Now, as we mentioned before, if I execute the previous steps, this is the LinkedIn search URL. Oh god, I think I ran this. Yeah, now it's running. Let me just stop this real quick. Yeah, let me just stop this. [music] Cool. But all I wanted to show you here is the fact that we can now in the URL section delete this [music], because it can't be fixed every single time and drag this across right here.

I don't know why it didn't put it wherever I wanted, but just put it here. So now we're giving it the input. So 100 results script, the company, yes, and the URL. And so now if we change this here, it then changes what goes inside API, what goes inside the actual request to the scraper, saying, "Hey, can you go out and scrape this?" So I'm going to rename this to uh scrape jobs, rename. And now I'm going to run this from the start. And if I go to Apify, I Should be able to see if I go to run that is now running. Now, typically we don't actually go into the platform. We don't really go here because this looks a bit complex. There's a ton of different words, code, all that stuff that we don't want to see. Uh, but I just go here to make sure that it is running when it's testing. But when you're setting a live for a client, you obviously don't go here because uh then you would have to go here every single time, which is not actually realistic.

Cool. So, we're just going to wait for the actual thing to finish. And then right here, we should be able to see the whole output. All right. So, this just finished. And if I go here, I should be able to see uh the results. If I go to schema, I can now see that we have 100 items, which is 100 jobs, and I get the ID, the tracking ID, the ref ID, the link to the actual job post. If I go here, I can see that this is a link to the job post that the company made.

Which is one of these, I assume. Then I have the title, the company name, company LinkedIn URL, company logo, location, salary, posted app, benefits, description, HTML, applicants count, apply URL, salary, description text, all bunch of stuff that we want to know about the actual, [music] uh, job, which is great. Now, one thing I didn't do in the actual workflow that I showed you at the start when I built it, uh, is filter out the ones that don't have an apply URL. So, apply URL is basically a link that we use to apply. Actually, now that I think of it, we could still use them because even though we might not get the apply link URL from the actual job. So, Right here, for example, we don't have the apply URL, but I assume that if I go here to the actual job, I can easily apply. Yeah. Yeah. So, that's not to filter them out. Cool. All right. So, now that we have this, let's go back to Miro and let's put this to green. Let's put this to green.

The next step is now getting our current resume to then give it to AI to check whether the description and the resume fits together and it's relevant. So, in order to do that, we have to make a resume. Now, I already made it on Google Docs and in the template that I'm going to give you at the end of the video. I'm going to give you this as well. So, you also get access to this. And all it is basically a Google document, which you can make literally by [music] docs.google.com and then basically just pasting the thing here, right? Just information about you, obviously, with formatting and so on that I made. Uh, but I'm just going to use this as an example. And we have the education, the experience, data analyst, and deals analyst. Let's put data, university projects, activities, technical skills.

Now, this is not my resume actually, in case you're wondering, but it's one that we can use as an example when we are applying. All right, so, now that we Have this, we can go here and let me just pin this and this as well. So, pinning it, just pressing P just means that I don't have to run this again to then re like run the whole thing. And now I can go to docs and I can get a document. Now getting a document just means I'm getting this. I'm getting all the text that's here. All we have to do here is go to create a new credential, and we need a client ID and client secret. Now stop this video, watch this video up here if you want to check this out. Uh, in case you have never connected Google Docs to your account, just follow the instructions that I follow in the video, and you'll have that there. And once you have connected your account, you want to do resource document, [music], which is a thing that we're manipulating. We're changing the action that we're taking is getting. So,

we're getting the text inside. [music] And now we have to give it the doc ID or URL. So, all we have to do here is I Assume just copying this and pasting it here. And if I execute the step, this should now give me the text of the actual document. I don't know why it's taking so long. All right, because okay, cool, I already know I already got the problem here. The reason why it took a lot longer than expected is because 100 items went through, which means that it did it 100 times. So before we get to this, right, what we want to do is actually run the system once for every job and then loop back and run it again for the next job, and the next job, and the next job, and the next jobs. And so what we want to do here is put a loop over items, which means that now we have 100 items between here and here. And we want to send X amount of items through here and then loop, do the whole thing and loop back, do the whole thing, and loop back until all the jobs are done.

The reason why we do that is because we don't want to overwhelm this with 100 requests at a time because it could, uh, Break. So we want to space them out. So if I go here to loop over items, I can see that I have this. So it looks a bit messy. Let me just like this. Just delete this [music] and delete this here. And you have this. So we're saying, hey, we have 100 items coming through. We're only letting one through.

Let's just do five. So if I run this, I can see that we're going 100 items, then five items. So only five jobs go through at once. And if I go here, I can take this and then go to the next step. We go through the whole sequence until we loop it back here, right? And this goes to the next job and the next job. All right. Now that we have this, let me actually run this. And it should be quicker than the other one. As you can see, this finished. And now if I go to table, I can see that this is the whole content of the actual resume. Now, why is it giving me five items? All right, it's giving me five items because we're doing five jobs. Let me actually just Do one just to test. Let's just do one, so we don't have to see five items.

We just have this Michel 123 Main Street, Southampton, UK, and a bunch of stuff that we want, right? Which is all coming from here. So you would have your resume as an example. Now let's just rename this to get get resume and let me put this to green. And now we have to use AI to check whether the job is relevant. So right here I can go to AI and I can use OpenAI message and model. So we're basically replacing the action of us going to chatbot and asking it a question. All we have to do to connect OpenAI to our account is go to platform.openai.com.

You can go to the dashboard API keys. Create a new secret key here. You can do an attempt to test. Create a key. You can see this is blurred right now because it's [music] a key. It's a password. And then paste it here. Put the name. Press save. That's it. Now bear in mind, most people don't even Mention this, but this is not free as in you still have to pay. So, if you go to your profile and you go to billing, then you got to put some money here. If you're like me, then you're going to have less than $5. The minimum is $5, which will last you quite a long time.

Um, yeah, that's fine. So, we have that.

We have the credits. Now, the resource is going to be text because that is a thing that we're manipulating. The action that we're taking is messaging a model. The model that we're going to use is [music]. 4.1. Uh, I want a model good enough for us to be able to do the task, but also fast enough so we don't have to wait a long time. And so, 4.1 mini because this task right here is literally just an AI assistant that allows us to be able to check whether our job is relevant to what we do. And so right here we have a system prompt user and assistant. Now a system prompt Is you give a identity to the actual AI, so that it sits itself that it is that thing, so it will perform better. Now, in this case, we tell it you are a helpful intelligent [music].

And then we have the user prompt, which in this case is—let me put this full screen. Let me place the prompt that I already had previously, so I can just walk you through it. There it is. Uh, and we have an overview. I'm looking for jobs. Your task is to filter them based on the list of attributions and skills that I have. Some jobs may not be relevant, which is why I want you to go through each one and let me know whether they are a good fit or not. The context below is a giant list of all my skills, and here I added my skills so that it knows. One thing that we could do actually, why am I giving him my skills when I could give him my resume, right? Doesn't make much sense? So I can say, the context below is my resume. So we give him my Resume, which you get from content here, and then we get the job description, which again is a description. Delete this of right here, which you can get right here, description text.

And then we tell it to respond in JSON, format verdict true or false. If I'm a fit, return true. If I'm not a fit, return false. Why do we do it this way? It is because then it gives us the actual output that we want, which is just one word. We just want to know: is this a good fit for us, or is it not? And so, right here, I can run this.

I forgot to do one thing. As you can see, here, the output is in actual JSON, which we don't want, which is why we have to turn this on. Output contains JSON, so that it recognizes it. So, it knows that we're doing this as JSON. And if I execute this step, now it's giving it to me like this: Verdict equals false, which then helps me to go to the next steps. So, get resume, then this checks.

Relevance, rename, and as you can see here, this is false, and now we want to filter the ones that are false. So, to filter, simply just go to filter, remove items matching a condition. So, filter the ones [music]. Where the verdict equals false. No, true. Because then, if it's true, that means we want it. If it's false, that means we don't want it. I'm going to run five items through just so we can get a variety of different results.

He gets the resume. It goes through five items. And now it should give me at least one or two that are a good fit. None of them are a good fit. Am I really that bad? I just don't fit any jobs.

What jobs do we SDR? [music] What was my resume? AI. Okay, let's just do that kind of went to business. Let's do AI engineer.

Let's change up the actual URL. Seems like I'm not a good fit for any job, right? Because I put all AI in the actual.

Job and the job itself is for a sales role. So it makes sense. Let's actually run this. So now we're running it with the search URL of an AI engineer. If I go here, I can see that this is running. All right, it just finished 100 items. Five items went through. We got the resume. And how am I not a good fit for this either? Okay, something's wrong here. Surely it has to be wrong. Respond. This is all right.

If I go here, I can see that I have data annotation. Is this me or the automation? It's not me, it's you. Uh, but we get the resume. I have AI automation consultant, data analyst, AI transformation recruitment. So, nothing went through as in all of them were false, which is interesting. My resume here. What? I swear this should be true. So, this is a prompting issue. I'm looking for jobs. You filter them based on the attribution skills I have. Um, Some jobs may be relevant, which is why I want you to go through each one and let me know whether or not I'm okay. That's my resume. Let me, let me ask it to give me a reason as well, just so I know why. Reason for verdict. So, this is giving me a reason as well. So, let me run this.

Let me see exactly why I'm not a good fit. So it just finished running. The job requires applicants to be located in the United States. Okay. All right.

Okay. Okay. Okay. Okay. Cool. It's [music] because of the location. So, if I put US, I can actually see how that changed it. If it gave me a reason, that means everything was good. Um, now it should give it to me. Hopefully five results. Okay, cool. So, two items went through out of five items. If I go here, I can see verdict is false. Although you are proficient in Python, and JavaScript, experience with algorithm and solving coding problems.

Your contact information indicates a UK location. Okay, so we have to also change this plus one. Let me see where you put UK. So let's do US. Cool. So let's try this again. Let me see if more things come through because if it's the actual job itself, my skills, then understandable. [music] But if it's a location, then we can just simply change that in the CV. And be aware of those things cuz if you're applying for a job that is in the US but your CV says that you're in Sweden, then obviously not going to work.

And as you can see, me changing the location made it so that five items out of five went through. Now we have this. I can pin this and this and not this.

Not this. And I can make this green. Now we get on to the next step which is AI writing the customized resume. So if I go to the next step, um, plus I can actually copy this. I can copy this, paste it. Let me rename this to write resume. So, Customize resume. The prompt I have right here. Let me just go full screen so you can see it. The resume will be added to a Google doc. So, write it in HTML format. And I have to just change this. So, you're helpful, intelligent resume writing assistant that drafts high converting résumés based on jobs. The resume will be added to a Google doc. So, write it in HTML format that I can easily copy-paste. Do not output any back, uh, back text. No, this your first character should be HTML. Yes. Cool. Now that this is done, um, we have to put the user prompt. If I go full screen, I can remove this, and I can put here, and I can delete the giant skills, and we say, I'm looking for. So this will be overview.

I'm looking for jobs. Your task is to customize a provided resume using provided job description. The job description will be found here.

Description text. Boop. And then the resume will be the one here. Get resume content, and then respond with only customized updated resume, nothing else. The resume will be added to Google Docs. So write it in HTML format that I can easily copy-paste. Now we want it to be in a certain format because the end result is something that looks like this.

That has titles, subtitles, and has text, um, and has all those sort of things. Now, because we actually didn't ask it to output this in JSON, I can just turn this off. I can unpin this, and I can actually execute the step, and we're using the same model. It's fine because again, speed matters here as well. Uh, we don't want to be waiting three, four, hours, but it kind of depends on how you have the system set up. I think, as the input, we would probably have a Google sheet as a start. I don't know. We'll see. We'll see how we get along. But now that it's customizing resume, it does take quite a bit, just because it's going Through each job and each resume, and it's making a new thing.

All right, so it just finished, and if I go here, I can see that we have five items. So, five different rs. If I go to JSON, which is where I can see the full thing, I can see that it made the full HTML, which is cool.

Now, if I pin this, the next step is actually turning the HTML into markdown. Now, HTML and markdown are just ways of actually formatting text.

If I go here, and I go here to enter, and I press markdown, so, heading one, I put this here, you can see that this turns into heading one.

Same thing with heading two, heading two, heading two. And the reason we do that is so that we can see the hierarchy.

So, we can see that education is the title. Then we have subtitle, which is the number or the name of the actual university. And so, with that said, we are turning the HTML, which is not a language that is understood by Google Docs, to markdown, which is a language that is understood.

By Google Docs, so if I go here I can look for HTML or markdown to HTML. Yeah, markdown. Convert data between markdown and HTML, and then HTML to markdown. I can paste. So, drag this across. I can execute the step, and this should now turn the HTML into markdown, which is this one right here. So, this is the input, and this right here is the output with hashtags, so that Google Docs understands, and then it uses it. So, it actually formats it in a way that we actually understand. I'm going to pin this, and the next step is actually, um, Google Docs, and we're creating a document, and let's leave this here. Same exact connection as we did before. Document, create my drive, so on. And this right here is actually a two-step automation. I'll show you exactly what I mean. The first step is actually making the actual document. So, just making the document, CV, mik. And then we can put the company name. If I go down here, Scrape jobs company name.

So, cv Mika data annotation. I really do like this feature where we get to see the output, uh, before we run it, which is great. Let me do Mika here. And now, if I run this, I should now [music] be able to create five documents. So, now it's making the actual documents, which is amazing. Now, the next step is actually updating the actual document with the text. Now, there's only one problem. If I go to Google Docs, Google Docs, and I go to update a document, doc ID will be this one ID.

I can see that we can add footer, page break, table, table, column, all that stuff as text. And if I add the text here, so the markdown text, the one in data, not the one — this is HTML, this is markdown. If I add this here to this document, if I execute the step, this should now update the document with the text. But there's just one problem. If I just copy this and I Go to the actual resume by just placing the ID at any point here. I should be able to see the markdown. You can see this is now running. We should be able to see the markdown here, but it is not in a way where we actually can read it.

It doesn’t look like our previous resume. [Music] And so now we have to do an additional step which is basically turning this into this and this into this and this into this so that we can actually read it and understand it. Now in order for us to do that, we don't have to use this, and we have to use a step which I made in my previous automation which is this one right here, and I’ll show you exactly what we have inside.

And this will be the thing that turns the text and gives it to Google Docs. It takes in markdown, but it doesn’t actually understand that it’s markdown to then format it into a heading. But we still have to turn this into markdown, because Google Docs natively does not understand HTML. [Music] And so right here, if I go to add ré text, we're introduced to this page. We have patch because this just means updating. And if you have no clue what patch, delete, all this stuff is, I actually covered all of this in my API fundamentals video. You can check it out here. Then we have the URL. Now I will not actually explain the whole thing behind it but just know that this URL allows us to be able to, um, to update the actual document using the ID, which you can get right here, ID [snorts], and use this. It's basically just this URL.

You can simply just screenshot this and then put it through chat GBT and then ask it to give it to you. And now for authentication, yours looks like this. Now, you want to put predefined credential types and then look for Google Docs. Google Docs O2 API, which now allows us to connect [music] our account in Google Docs using the API here. Leave this as Google Docs O2 API here. So this will be your Account. So we're able to actually connect to Google Docs without having to go through all the different barriers of authorization for JSON itself. So you can use JSON for headers, saying hey, the thing I'm going to give you this should actually be content.

It's text/HTML. So I'm going to give it the text/HTML, which in this case would be the markdown here.

The data. Now I'm confused because I previously mentioned that Google Docs only takes in markdown, but now I'm giving it HTML. So I just have to test this and see how it actually works. So I still have this as a, as the actual thing. This is now running, and right here. Okay, cool. Yeah. So right here it doesn't actually format it right. So what I have to do here, let's try actually giving it the HTML instead of the actual markdown, because when I actually build this in Make.com, Make.com doesn't need this exact step. It can just take the HTML.

But let's actually run this. All right, this is not updating the documents. If I go here, there we go. Okay, so I can see that this is not formatted, right? Which means that I can actually delete this step because I don't really need it, right? I just need the [music] HTML that we get from here. Cool. Now once this is done, I can pin this, and we can go to the next step. So this, this is good. This is also good. And finally, we can add this to our database. So first of all, we have to make a database. So we can just go to Google Sheets, and we have this here.

Let's name this jobs tracker DB. 123, because I think I already have a job tracker DB. And then here we can start adding the different fields. So, if I go here to Google Sheets, I can append a row. Append row in a sheet. I can connect my account by going here. I can sign in with Google. It'll take me to this page. Choose your account. Bring it back. You'll be fine. Sheet within document because that is the thing that We're actually using the action that we're taking is appending a row, which means adding a row to a Google sheet.

The document will be jobs tracker DB 1 2 3. The Google sheet will be sheet one. There's no columns, but now we have to look at the columns that we need to add, which are link, title, company name, company LinkedIn URL, location, salary, posted at, description, apply URL, description text, and I believe that's it. And this is for the resume as well. So I just added all this right here. So it actually makes sense. It's all formatted. I'm also going to go here and freeze up to row one, so I can see the job post link, title, seniority level, posted at, company name, website, salary, description, number of applicants, resume URL, and the application URL. If I go back, I can now refresh, and I should be able to see the different columns. So, job post link, this is the link, title, seniority level. Uh, there we go. Seniority level. Uh, we have Post it at which unpin created document to execute.

Pen. Okay, whatever. This is fine. Uh, company name will be, let me go back here. Company name, website will be, if you can't find it here, just write website literally company website. [music] There you go. Salary right here. So, we have this, right? We have this here. We can just use this or this. I'm going to go with this for now. We'll see if it works. Description will be description text find it right here. Number of applicants. So applicants there's so much, so much text here. Applicant count right here. Resume URL which we can get from the create a document. Let me get the ID. Now one important thing is that we can give it the ID but we have to give it the actual URL. Now, if you don't know, Google Docs actually has the same formatting for

Google um for the actual Google Docs. We Have this URL, which is https/docs.google.com/documents/d/ the id. So, this is going to be the id /edit, and then we can remove everything after that. And so, right here we can just paste this because now we can get the URL using the ID and then application URL. So, if I go here, application uh, application apply URL. Yeah, go here. Let's run this. Let's see what it's all about. Let me execute the workflow. This is not creating the document. Then it will add the resume text inside those documents and give us an error. Why was there an error? The node markdown doesn't exist, but it's used as an expression here. Let me just do content. [music] Does that work?

So, it's making the document again, and now it should be resuming, or should be adding the resume text to the actual document. We'll see if it works. Yep. And now it's updating the tracker.

Database right here. So, job title, entry level. Well, it looks like we have the same company. Is this the same job? The way to know if they're the same job is if the numbers here are all the same. But it looks like they're all different. So, the same company put five different job posts for an AI ML developer. So, if you want to be an AI ML developer, this company really needs it.

Uh, so go ahead and apply. Here's a link right here. Now we have the job title, post link, job title, seniority level, post it at. So, this is actually a problem because I don't want to see it this way. It doesn't actually make any sense to the normal person because we could format it in a way where it makes more sense.

Company name, website. If you can go to the website here of the actual company. Great. Salary is empty. Description. Number of applicants who applied resumeé. Okay. So, this is the interesting part. Resume education, which you can see here based.

On my actual one. So if I go to resume, let's look at the different, the [music] actual difference. So I go to experience, AI automation consultant and founder. Built AI operating systems for six and seven figure agencies. Developed a screen resume as AI agent. Perfect. Okay. Yeah. Cool. So I can start to see exactly what it does. So because the role is more so AI/ML engineer, which is more code and stuff, then what it did is that in the actual resume it spoke more, so this is the, the old one, the one I mean, the base one. This is the new one. It said extensively use Python and JavaScript to create and troubleshoot AI and automation workflows, although that is not true. Um, but you have there, right?

Um, okay, so we have this data analyst says, extensively use Python and JavaScript to create and troubleshoot AI automation workflows, which is correct. And then we have a ton more stuff, which basically tailors our resume to that specific job itself, and then it did it.

For every single job, right? And so, if I go here, this is a different resume you can read through, this is a different resume, and so on. And now, if you go to the apply URL, well, it seems like we're going to the same exact place, even though the job post links or the job posts are different. What I can do here, I believe that I can add a step in between duplicate, remove duplicates, remove items repeated within current input. Actually, this wouldn't work because they're not actually repeated, because the variables are different. So, that's what it would be. But you can make it so that you don't get the same exact jobs from that same company. So, now that we've built the whole thing, let me actually just unpin all of this, and I can execute the workflow from the start, and we can get all the jobs. We can start getting the resumes. Uh, we can start checking the relevance, customizing the resume, creating the resume itself, adding the text.

Inside and then finishing it off by adding all the jobs up here. I'm going to delete this for now so we can see it from scratch. And whilst this was running, I realized that I missed one crucial step, which is what I mentioned before that we have one job going through all of this. And then we, we have to loop it back, so five jobs go here. And then we loop it back, so it gets the next five jobs. The next five jobs until all 100 items are processed. So, let me run this again, which will go through five jobs first. So, now, this filtered five out of five is making the resume.

It's doing all that stuff, and I'll catch you when it finishes for about 20, maybe even 15, probably 10, uh, jobs. As you can see, it went through five and then it looped back and it went through the next five right here. Now, it’s finishing up the documents for the last five CVs. It’s adding the text inside this document, and finally, it’s adding it back here. So, now we have the actual Jobs here, number of applicants. So, these are all different jobs, right?

Um, AI developer. These are similar, but the thing is, we can't actually filter them out because they're all different posts. So, they made different posts for the same job, the same company. And we have the resume URL right here for every single one. And we have the application URL that we can now use to apply to the jobs themselves, careers. And you can go here and you can start the application process. So, this basically saves you the whole time of you having to go into LinkedIn, check if they are a good fit for you. Then check your resume, then customize the resume, then actually make the resume, bring it back, and then apply. In this case, you have everything else done for you, and you can simply just go inside the link, go here, download it, PDF, and then you can simply just apply for the job. And if you're looking for the full blueprint and automation so you can import it into Your own account with all the prompts, [music], and the tracking database and

the document resume as well. You can check the second link down below, which is a school community. Uh, you can go to the classroom section, templates vault, and then right here you'll be able to find the jobs scraper system. Download it, import it into your own account, and you can [music] start from there. And if you have no clue how to do that, you can also go here, and you can import the blueprint to any. Now, the only catch is not everyone gets in. So, put some thoughts into your answers before you apply, and I'll see you on the inside. So that right there is just a simple way to build this kind of system. It's just a foundation for it. Now, when it comes to actually implementing this to a company, the way that we've done it is we actually used to work with a recruitment agency. So, recruitment agency is an agency that basically helps other companies to recruit people to [music].

Hire people. And so their target market is companies that are currently hiring for people because then they can find the applicants, they can give them the jobs, and they can do everything for them. And so what we built for them was a system, that allowed us to be able to find companies that are hiring for a specific role. Then we get the company website, and then we find people within those companies that we can then reach out to.

It's sort of like a whole lead generation process which is very, very smart and very, very efficient for a company of that size. And if you want to start and scale your AI automation agency, then check the first link down below, which will take you through a video where I walk through my one-to-one mentorship program, where I get to work with you one-to-one to help you start and scale. And if you want to dive deeper into N8N, then check out this video up here, where I go through a full master N8N course from zero. With that being Said, I hope you found value from this video and I'll see you in the next.


Return to reading
Info
Notebook
0
Chat
toggleRightPanelIcon
I Built an AI System That Automates My Job Applications (n8n tutorial)
youtube.comCopy
Michele Torti
Michele Torti
Copy
@MicheleTorti
Summary
The AI system scrapes job listings from LinkedIn and customizes your resume for each job. It then creates a public resume link and tracks job details in a database. Finally, you can apply directly using the tailored resume through the automated workflow.
Summarized by Ghostreader
METADATA
Type
Video
Domain
youtube.com
Published
Nov 1st 2025
Length
46:21
Saved
about 2 hours ago
Progress
28%
Language
English
Edit metadata
Help
ghostreader ghost bodyghost glasses
