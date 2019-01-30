# alexabot
Discord bot that does a whole gaggle of things.

### Commands
```
Alexa play [song name]
```
Will stream a song from YouTube into the voice channel you're in. This is pulling the top search result from YouTube, and YouTube search sucks sometimes, so it helps if you include the artist name.
```
Alexa STFU
```
Will disconnect Alexa from the voice channel.
```
Alexa volume
```
Will bring up the volume commands. `Alexa volume down` or `Alexa volume up` changes the volume by 10%. This doesn't work *while* you're playing a song, it only adjusts it for the next time you play a song.
```
Alexa profile
```
Will show you your profile. Sort of a work in progress.
```
Alexa steal [@somebody]
```
Will steal some cash from another person. There may or may not be a very small chance to steal a lot more than usual. This feature is entirely inspired by the same feature in the popular Dank Memer Discord bot.
```
Alexa flip
```
Will flip a coin. You either win money or you don't. This feature is also inspired by the same feature in the Dank Memer Discord bot.
```
Alexa WoW profile [realm name] [character name]
```
Will bring up info about a World of Warcraft character
```
Alexa give me a meme
```
Will give you a random fresh meme from Reddit.
```
Alexa give me /r/[subreddit]
```
Will give you a random top post of the day from that subreddit
```
Alexa buy [something]
```
Will make an Amazon™ purchase and charge it to someone else's account. This is using l33t h4xx and is extremely illegal. Use with caution.

### You need to add a `config.json` file with the following:

```
{  
     "token" : "YOUR_BOT_TOKEN_HERE",
     "blizzardKey" : "YOUR_BLIZZARD_API_CLIENT_KEY",
     "blizzardSecret" : "YOUR_BLIZZARD_API_CLIENT_SECRET"
}
```

### You need to generate a `blizzardToken.json` file and keep it updated:
Blizzard's API requests require your client's static key & secret (in the config.json file) but also require an OAuth token that expires after 24 hours. You can find their docs on this here:
https://develop.battle.net/documentation/guides/using-oauth/client-credentials-flow

I chose to run the `curl` request in cron every 12 hours on the server and output the response to a file, `blizzardToken.json`, but you can do whatever works best for you.

### Before you run `npm install`:

The Node install for better-sqlite3 requires the ability to build C++ files.

If you're on Windows:
```
npm install --vs2015 -g windows-build-tools
```
If you're on Linux:
```
sudo apt-get install build-essential
Then install Python 2.7 - it MUST be 2.7
```
Next:
```
npm install
```
