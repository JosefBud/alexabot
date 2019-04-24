async function buy(message,client) {
// PULLS RANDOM MEMBER FROM THE SERVER/GUILD MEMBER LIST FOR USE WITH THE "ALEXA BUY" COMMAND
    let everyoneArray = message.guild.members.array();
    let randomMember = everyoneArray[Math.floor(Math.random() * everyoneArray.length)];
// ALEXA, BUY COMMAND WHICH USES THE RANDOM MEMBER
    client.fetchUser(randomMember).then(myUser => {message.reply(`your purchase was successful. The credit card charge has been applied to ${myUser.username}'s Amazon™ account.`)});
}

module.exports = buy;