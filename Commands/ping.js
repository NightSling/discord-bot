// commands/ping.js
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with bot\'s shards and node latency.'),
    async execute(interaction) {
        const shard = interaction.client.ws.shards.first();
        const shardLatency = shard.ping;
        const nodeLatency = Date.now() - interaction.createdTimestamp;

        await interaction.reply(`Shard Latency: ${shardLatency}ms\nNode Latency: ${nodeLatency}ms`);
    },
};