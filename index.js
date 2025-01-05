// index.js
const { Client, GatewayIntentBits, Collection, ActivityType } = require('discord.js');
const { CLIENT_ID, TOKEN, GUILD_IDS } = require('./config.json');
const fs = require('fs');
const path = require('path');
const http = require('http');

// Client Initialization
const client = new Client({ intents: [GatewayIntentBits.GuildMessages] });
client.commands = new Collection();

// File and Server Configuration
const WEBSITE_PORT = 3000;
const HTML_FILE_PATH = path.join(__dirname, 'index.html');
const COMMANDS_DIR = path.join(__dirname, 'slash Commands');

// Create the commands directory if it does not exist
if (!fs.existsSync(COMMANDS_DIR)) {
    fs.mkdirSync(COMMANDS_DIR);
}

// Create a basic web server to serve the HTML file
const startWebServer = () => {
    const server = http.createServer((req, res) => {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        fs.readFile(HTML_FILE_PATH, (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('Error loading the HTML file');
            } else {
                res.end(data);
            }
        });
    });

    server.listen(WEBSITE_PORT, () => {
        console.log(`Website running at http://localhost:${WEBSITE_PORT}`);
    });
};

// Load and register bot commands
const commandFiles = fs.readdirSync(COMMANDS_DIR).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(path.join(COMMANDS_DIR, file));
    client.commands.set(command.data.name, command);
    console.log(`Loaded command: ${command.data.name}`);
}

// Function to register commands
const registerCommands = async () => {
    const { REST, Routes } = require('discord.js');
    const rest = new REST({ version: '10' }).setToken(TOKEN);

    try {
        console.log('Registering slash commands...');
        const commands = client.commands.map(cmd => cmd.data.toJSON());
        for (const guildId of GUILD_IDS) {
            await rest.put(Routes.applicationGuildCommands(CLIENT_ID, guildId), { body: commands });
            console.log(`Registered commands for guild: ${guildId}`);
        }
        console.log('Slash commands registered successfully!');
    } catch (error) {
        console.error('Error registering slash commands:', error);
    }
};

// Handle interactions
client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
});

// Execution
(async () => {
    startWebServer();
    await registerCommands();
})();

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);

    const activities = [
        { name: 'Running the GNOME Nepal website', type: ActivityType.Playing },
        { name: 'Watching members', type: ActivityType.Watching },
        { name: 'Watching GitHub pull requests', type: ActivityType.Watching }
    ];

    let currentActivity = 0;
    setInterval(() => {
        client.user.setActivity(activities[currentActivity]);
        currentActivity = (currentActivity + 1) % activities.length;
    }, 5 * 60 * 1000); // Rotate every 5 minutes
});

client.login(TOKEN);