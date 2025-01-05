// commands/ping.js
const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const os = require('os');
const packageJson = require('../package.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with bot\'s latency information.'),
    async execute(interaction) {
        try {
            const shard = interaction.client.ws.shards.first();
            const shardLatency = shard.ping;
            const nodeLatency = Date.now() - interaction.createdTimestamp;
            const apiLatency = interaction.client.ws.ping;
            const uptime = interaction.client.uptime;
            const serverCount = interaction.client.guilds.cache.size;
            const memoryUsage = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
            const totalMemory = (os.totalmem() / 1024 / 1024).toFixed(2);
            const cpuUsage = os.loadavg()[0].toFixed(2);
            const systemUptime = os.uptime();
            const botVersion = packageJson.version;
            const discordJsVersion = packageJson.dependencies['discord.js'];

            const embed = new EmbedBuilder()
                .setColor(0x00ae86)
                .setTitle('Ping Information')
                .setDescription('Here are the bot\'s latency and other details:')
                .addFields(
                    { name: 'Shard Latency', value: `${shardLatency}ms`, inline: true },
                    { name: 'Node Latency', value: `${nodeLatency}ms`, inline: true },
                    { name: 'API Latency', value: `${apiLatency}ms`, inline: true },
                    { name: 'Uptime', value: `${Math.floor(uptime / 1000)} seconds`, inline: true },
                    { name: 'Server Count', value: `${serverCount}`, inline: true },
                    { name: 'Memory Usage', value: `${memoryUsage} MB`, inline: true },
                    { name: 'Total Memory', value: `${totalMemory} MB`, inline: true },
                    { name: 'CPU Usage', value: `${cpuUsage}%`, inline: true },
                    { name: 'System Uptime', value: `${Math.floor(systemUptime / 60)} minutes`, inline: true },
                    { name: 'Bot Version', value: `${botVersion}`, inline: true },
                    { name: 'Discord.js Version', value: `${discordJsVersion}`, inline: true }
                )
                .setFooter({ text: 'Latency and other information' });

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error('Error executing ping command:', error);
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    },
};