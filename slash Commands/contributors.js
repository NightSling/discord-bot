// commands/contributors.js
const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('contributors')
        .setDescription('Provides a list of bot contributors.'),
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor(0x00ae86)
            .setTitle('Bot Contributors')
            .setDescription('Here is a list of people who have contributed to this bot:')
            .addFields(
                { name: 'Prarambha Bashyal', value: 'Contributor', inline: true },
                { name: 'Manjul Tamrakar\n', value: 'Contributor', inline: true },
                { name: 'Aaditya Thapa', value: 'Contributor', inline: true }
            )
            .setFooter({ text: 'Thank you for your contributions!' });

        await interaction.reply({ embeds: [embed] });
    },
};