# alexabot
Discord bot that does a whole gaggle of things...

[Bot invite](https://discordapp.com/api/oauth2/authorize?client_id=534469636381736981&permissions=8&redirect_uri=https%3A%2F%2Fdiscordapp.com%2Foauth2%2Fauthorize%3F%26client_id%3D534469636381736981%26scope%3Dbot&scope=bot)

### Music commands
`Alexa help [1-4]` will display the commands, separated by "pages" 1-4.  
`Alexa play [song name]` will stream a song from YouTube into the voice channel you're in. This is pulling the top search result from YouTube, and YouTube search sucks sometimes, so it helps if you include the artist name.  
`Alexa queue [song name]` will queue up a song to play when the current one is finished.  
`Alexa queue` will show the current queue of songs.  
`Alexa clear queue` will clear out the current queue of songs.  
`Alexa next` will play the next song in the queue.  
`Alexa STFU` will disconnect Alexa from the voice channel.  
`Alexa volume` will bring up the volume commands and current volume.  
`Alexa volume [0-100]%` will change the volume to the number you set.  
`Alexa volume down` or `Alexa volume up` changes the volume by 10%. This doesn't work *while* you're playing a song, it only adjusts it for the next time you play a song.  

### Stock Market Game commands
`Alexa stocks` or `Alexa stocks help` will bring up this list of commands  
`Alexa stocks start` is the starting point. This will create a profile for you in the stock market and give you $50,000 to make your investments.  
`Alexa stocks search [company name]` will provide the stock **symbol** for that company. This is important, because everything else relies on using stock symbols, **not** company names.  
`Alexa stocks buy [quantity] [symbol]` will buy shares in the company.  
`Alexa stocks sell [quantity] [symbol]` will sell shares back and return the money to your wallet.  
`Alexa stocks profile` or `Alexa stocks portfolio` will show you your current holdings, both in your wallet and your shares.  
`Alexa stocks price [symbol]` will show you the current price for shares of that company.  
`Alexa stocks history [symbol]` will show you a detailed history for that company's stock.  
`Alexa stocks leaderboard` will show you the current leaderboard for portfolio value.  

### Miscellaneous commands
`Alexa what is the weather in [location]` will show you the weather for the location you ask for. You can use a city or a postal code, the latter will be more accurate.
`Alexa minesweeper` will generate a random game of Minesweeper, 6x6 with 5 bombs.
`Alexa profile` will show you your profile.  
`Alexa steal [@somebody]` will steal some cash from another person. There may or may not be a very small chance to steal a lot more than usual.  
`Alexa flip` will flip a coin. You either win money or you don't.  
`Alexa vote` will provide the link to vote for Alexa on discordbots.org.  
`Alexa get out of [#channel]` will stop Alexa from listening in the channel you specify.  
`Alexa come back to [#channel]` will bring Alexa back to a channel she was kicked out of.  
`Alexa WoW profile [realm name] [character name]` will bring up info about that World of Warcraft character.  
`Alexa give me a meme` will give you a random fresh meme from Reddit.  
`Alexa give me /r/[subreddit]` will give you a random top post of the day from that subreddit.  
`Alexa buy [something]` will make an Amazon™ purchase and charge it to someone else's account. This is using l33t h4xx and is extremely illegal. Use with caution.  

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
