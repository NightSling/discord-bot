const {
    Client,
    GatewayIntentBits,
    REST,
    Routes,
} = require('discord.js');
const { CLIENT_ID, TOKEN, GUILD_ID } = require('./config.json');

const client = new Client({
    intents: [
        GatewayIntentBits.GuildMessages,
    ],
});


const commands = [
    {
        name: 'hello-world',
        description: 'Just echoes Hello World',
    },
];

const rest = new REST({ version: '10' }).setToken(TOKEN);

(async () => {
    try {
        console.log('Registering slash commands...');
        await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
            body: commands,
        });
        console.log('Slash commands registered successfully!');
    } catch (error) {
        console.error('Error registering slash commands:', error);
    }
})();

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

async function HelloWorld(interaction) {
    await interaction.reply({
        content: `Hello World!!`,
    });
    return;
}

client.on('interactionCreate', async (interaction) => {
    if (interaction.isCommand()) {
        const { commandName } = interaction;
        if (commandName === 'hello-world') {
            await HelloWorld(interaction);
        }
    }
});

client.login(TOKEN);
