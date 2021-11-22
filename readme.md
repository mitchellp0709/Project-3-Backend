# Project 3 - Retweet Backend
#### By Donovan Gallaway, Marco De Los Santos, and Mitchell Paoletti

![Retweet Logo Which Is Totally Not a Twitter Logo Knockoff](./twitter.png)

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
- Follows
- Comments // For later implementation


## Route Table

| url | method | action |
|-----|--------|--------|
| /tweet/:user | get | show all friends' tweets (index)|
| /tweet/oneUser/:username | get | show all of one user's tweets (index)|
| /tweet/oneTweet/:id | get | show a specific tweet (show)|
| /tweet/:username | get | show a specific user's tweets (show)|
| /tweet/ | post | add a new tweet (create)|
| /tweet/:id | put | change the tweet (update)|
| /tweet/:id | delete | delete the selected tweet (delete)|
| /tweet/follow/:thisUser/:followUser | put | Add user to your followed list
| /tweet/unfollow:thisUser/:followUser | put | Remove user from your followed list
| /auth/ | get | Returns all users and who they're following
| /auth/:id | get | Returns a specific user
| /auth/user/:username | get | Returns a specific user, but allows to find by ID instead of username
| /auth/:id | put | Updates specific user by ID
| /auth/login | post | Logs in
| /auth/signup | post | Signs Up

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

Ohhhhhhhhhhhhhhh boy. There were plenty.

In terms of backend, stitching the two Schema together was tricky, but got done. Specifically getting all of the tweets of every user that you follow into a single route was tricky. But I managed to get it done with a pretty smooth async function:

```jsx
router.get('/:user', async (req,res) => {
    const user = req.params.user // this should be an ID for that user's MongoDB entry, not a username
    try {
        const thisUser = await User.findById(user)
        const followArray = await thisUser.follows
        console.log(followArray)
        const userArray = []
        for (item of followArray){
            userArray.push(await User.findById(item))
        }
        const tweetArray = []
        for (item of userArray){
            tweetArray.push(await Tweet.find({username: item.username}))
        }
        console.log(tweetArray)
        res.status(200).json(tweetArray)
        }        
    catch (error){
        res.status(400).json({error})
    }
})
```

Other issues were primarily involved with state management, but were pretty easily solved with frontend work and tweaking/adding some backend routes (such as the oneTweet route for a show, etc.).

## List of Technologies

- MongoDB
- Node
- Express
- React
- Sass
