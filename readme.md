# Project 3 - Retween
#### By Donovan Gallaway, Marco De Los Santos, and Mitchell Paoletti

## Project Summary

We initially set out to make a very bare-bones Facebook clone (thinking it'd be a fun way to demonstrate knowledge of React), but decided that friend requests were a bit more than we wanted to work on in the scope of a week. However, we did want users to be able to see each other's posts and the like, so wanted to make sure there was a follow functionality......which just makes it Twitter.

So we decided to lean into it and call it Retweet.

## Models

The schema required are:

1. Users
2. Tweets

If we wind up with enough time, we will add a comments/replies schema, but that's not there yet.

### User Schema
- Username (String)
- Password (String/Hash)
- Friends [(Strings)]
- Tweets (String(id))

### Tweet Schema
- Username (String)
- Tweet Content (String)
- Comments // For later implementation


## Route Table

| url | method | action |
|-----|--------|--------|
| /tweet/ | get | show all friends' tweets (will also have new tweet form)(index)|
| /tweet/profile | get | show all own tweets (index)|
| /tweet/:id | get | show a specific tweet (show)|
| /tweet/:username | get | show a specific user's tweets (show)|
| /tweet/ | post | add a new tweet (create)|
| /tweet/:id/edit | get | render page to change a tweet you wrote (edit)|
| /tweet/:id | put | change the tweet (update)|
| /tweet/:id | delete | delete the selected tweet (delete)|

## User Stories

**For MVP**
- A user should be able to write a tweet
- A user should be able to select someone to follow
- A user should be able to unfollow someone
- A user should have full CRUD over a tweet they write, but not over one someone else writes
- A user should be able to see all of their tweets
- A user should be able to see all of someone else's tweets
- On home page load, a user should be shown all tweets of the people they follow

## Challenges

None yet! Though we do anticipate some on the follow functionality as well as comments

## List of Technologies

- MongoDB
- Node
- Express
- React
- Sass