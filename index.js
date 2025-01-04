// index.js
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const { CLIENT_ID, TOKEN, GUILD_IDS } = require('./config.json');
const fs = require('fs');
const path = require('path');

// Client Initialization
const client = new Client({ intents: [GatewayIntentBits.GuildMessages] });
client.commands = new Collection();

// Load commands
const commandFiles = fs.readdirSync(path.join(__dirname, 'commands')).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
    console.log(`Loaded command: ${command.data.name}`);
}

// Register commands
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
    await registerCommands();
})();

client.once('ready', () => console.log(`Logged in as ${client.user.tag}`));
client.login(TOKEN);