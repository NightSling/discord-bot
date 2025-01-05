const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

// Define the COMMANDS array directly in this file
const COMMANDS = [
    {
        name: 'help',
        description: 'Displays a list of available commands and their descriptions.',
    },
    {
        name: 'ping',
        description: 'Replies with bot\'s shards and node latency.',
    },
];

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Displays a list of available commands and their descriptions.'),
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor(0x00ae86)
            .setTitle('Help - Command List')
            .setDescription('Below is a list of available commands:')
            .addFields(
                COMMANDS.map((cmd) => ({
                    name: `/${cmd.name}`,
                    value: cmd.description,
                    inline: false,
                }))
            )
            .setFooter({ text: 'Use these commands with /' });

        await interaction.reply({ embeds: [embed] });
    },
};