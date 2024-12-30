# GNOME Nepal Discord Bot 

Discord Bot for GNOME Nepal Discord Server.

## Prerequisites
1. [Node.js](https://nodejs.org/) installed (v16.6.0 or later recommended).
2. A Discord account with access to the [Discord Developer Portal](https://discord.com/developers/applications).


## Getting Started

### 1. Setting Up the Bot in Discord Developer Portal
1. Log in to the [Discord Developer Portal](https://discord.com/developers/applications).
2. Click on **New Application** to create a new bot application.
3. Copy the **Client ID** from the application settings.
4. Navigate to the **Bot** section, click **Add Bot**, and copy the **Token**.
5. Go to the **OAuth2** section, select **URL Generator**, and enable the following scopes:
   - `bot`
   - `applications.commands`
6. Under **Bot Permissions**, select the permissions your bot needs (for now `Send Messages`, `Read Message History`, etc.).
7. Copy the generated URL and use it to invite the bot to your server.

---

### 2. Setting Up the Project Locally
1. Clone or download this repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `config.json` file in the project root and add the following keys:
   ```json
   {
       "CLIENT_ID": "your-client-id",
       "TOKEN": "your-bot-token",
       "GUILD_ID": "your-guild-id"
   }
   ```
   Replace `your-client-id`, `your-bot-token`, and `your-guild-id` with the respective values from the Discord Developer Portal.

---

### 3. Running the Bot
Start the bot in development mode:
```bash
npm run dev
```

If successful, you will see the following logs:
- `Registering slash commands...`
- `Slash commands registered successfully!`
- `Logged in as <Your Bot's Username>`

---

### 4. Using the Slash Command
1. In your Discord server, type `/hello-world` in any channel where the bot has access.
2. The bot will reply with:
   ```
   Hello World!!
   ```

---

## Project Structure
- `index.js`: Main script for the bot's functionality.
- `config.json`: Configuration file for sensitive credentials.

---

## Dependencies
- [discord.js](https://www.npmjs.com/package/discord.js)

Install dependencies using:
```bash
npm install discord.js
```

---

## Contributing
Contributions are welcome! Feel free to fork the project and submit a pull request.

---
