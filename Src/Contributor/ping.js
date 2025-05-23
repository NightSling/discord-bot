const { EmbedBuilder } = require('discord.js');
const { fetchTopContributors } = require('../../Utils/cmds/api.js');
const {
  EMBED_COLORS,
  calculateLatencies,
} = require('../../Utils/cmds/constants.js');
const packageJson = require('../../package.json');

module.exports = {
  name: 'ping',
  description: 'Replies with bot latency information.',
  syntax: '$sudo ping',
  usage: '$sudo ping',
  emoji: '🏓',
  async execute(message) {
    try {
      const sentMessage = await message.reply('Calculating bot latency...');

      const latencies = calculateLatencies(message);

      const { topContributors, totalContributors } =
        await fetchTopContributors();
      const topContributorsList = topContributors
        .map((contributor) => contributor.login)
        .join(', ');

      const fields = [
        { name: '🖥️ Shard Latency', value: `${latencies.shardLatency}ms` },
        { name: '⚙️ Node Latency', value: `${latencies.nodeLatency}ms` },
        { name: '🌐 API Latency', value: `${latencies.apiLatency}ms` },
        { name: '⏱️ Uptime', value: `${latencies.uptime} seconds` },
        { name: '🌍 Server Count', value: `${latencies.serverCount}` },
        { name: '💾 Memory Usage', value: `${latencies.memoryUsage} MB` },
        { name: '🗄️ Total Memory', value: `${latencies.totalMemory} MB` },
        { name: '🧠 CPU Usage', value: `${latencies.cpuUsage}%` },
        {
          name: '🕒 System Uptime',
          value: `${latencies.systemUptime} minutes`,
        },
        { name: '🤖 Bot Version', value: packageJson.version },
        { name: '📦 Discord.js Version', value: latencies.discordJsVersion },
        {
          name: '👥 Contributor Count (Discord Bot Repo)',
          value: `${totalContributors}`,
        },
      ];

      const embed = new EmbedBuilder()
        .setColor(EMBED_COLORS.DEFAULT)
        .setTitle('📊 Bot Latency Information and Contributors')
        .setDescription('Here is the current status of the bot:')
        .addFields(fields)
        .setFooter({
          text: `Data fetched from Hosting Environment & GitHub API | Top 3 Contributors: ${topContributorsList}`,
        });

      await sentMessage.edit({ content: ' ', embeds: [embed] });
    } catch (error) {
      console.error(
        'Error fetching contributors:',
        error.response ? error.response.data : error.message,
      );
      await message.reply(
        'There was an error fetching the contributors list. ' +
          'Please check if the repository is public or the GitHub token is valid.',
      );
    }
  },
};
