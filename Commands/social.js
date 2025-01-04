// commands/social.js
const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('social')
        .setDescription('Provides links to our social media accounts.'),
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor(0x00ae86)
            .setTitle('Social Media Links')
            .setDescription('Follow us on our social media accounts:')
            .addFields(
                { name: 'Website', value: 'https://nepal.gnome.org/', inline: true },
                { name: 'Facebook', value: 'https://m.facebook.com/61560797123131/', inline: true },
                { name: 'Instagram', value: 'https://www.instagram.com/gnomenepal/', inline: true },
                { name: 'LinkedIN', value: 'https://www.linkedin.com/company/gnomenepal/posts/?feedView=all', inline: true }
            )
            .setFooter({ text: 'Stay connected with us!' });

        await interaction.reply({ embeds: [embed] });
    },
};