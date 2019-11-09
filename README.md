# Advent of Code

## Aim
The aim of this project is to recreate [this](https://zero-to-mastery.github.io/zero-to-mastery-website/events/advent-of-code.html) in react ready for the 1st Dec 2019

## Complexity
Due to the time constraints, we should start by nailing the core must have functionality in a simple yet elegant mannor. Most of the project is up for discussion/negotiation, so if you have an idea... pitch it, if it makes things simpler or shows clear value to using it, its well worth considering. 

## Design
We haven't had time to come up with a design and I don't want to delay the project further while this is completed. So lets roll with a base of the old one. Feel free to be creative as you are building out components, but again keep it simple, elegant and easy for the next person to continue the design system. Also make sure your changes are relected everywhere they appear, so we don't end up with inconsistancies. 

## Submission Flow
Last year users submitted thier solutions via commands in the discord server. This seemed to confused a few people. 
This year we would like to provide a form on the website people can use to send their submission. This is roughly what should happen:

1. User clicks on `Submit Solution`
2. User authenticates with Discord OAuth (We could session this to save them doing it every time)
3. User is presented with a form to specify which day the solution is for, and the Repl.it URL
4. On submission the bot will save it to the DB and update embeds in the AOC channel.

## Useful Links
- [Discord Bot Repo](https://github.com/zeroDevs/Advent-Bot)
- [Old Website](https://zero-to-mastery.github.io/zero-to-mastery-website/events/advent-of-code.html)
- [Last Years Coding challenge repo](https://github.com/zero-to-mastery/coding_challenge-12)
- [Last Years Discord Embeds](https://cdn.discordapp.com/attachments/598312632407293963/642793643379261471/unknown.png)
- Testing and Discussion discord server... ask Matt or Ankur for an invite
- Trello - again ask for invite 

## Trello
### **Key**
> **Needs Grooming** = These tasks still need further thought, validation and should not really be considered a fully fledged task yet. 
> 
> **Future Itteration/Nice to have** - These are tasks that should be considered once we have time, but aren't really a problem if we dont manage them in time. 
> 
> **Backlog** = These are tasks that are awaiting to be completed and should be fleshed out and have acceptance criteria
> 
> **In Progress** = This is where you move cards to when you are working on them
> 
> **Under Review** = This is where you move them to when you have created a PR and awaiting review. 
> 
> **Done** = Tasks that are complete are moved here

### **Picking up tasks**
> Feel free to pick up any task in `Backlog` and move it to `In Progress`, assign it to yourself so everyone knows who is working on it. 
Once you have submitting the PR, move it to `Under Review`.

### __**Incomplete Tasks**__
> If you are unable to complete a task due to life etc, no problems, simply create a PR with the modifications you have, update the trello card accordingly and move it back into backlog. 
> 
> If you could also inform Ankur/Matt, so we can ensure the task is picked back up, that would be awesome. 

### **Creating Tasks**
> If we have missed something, feel free to create a card in the `Needs Grooming` section, providing as much information as possible. Let Ankur/Matt know so we can then validate and specify its requirements and release it to backlog.
 
 
