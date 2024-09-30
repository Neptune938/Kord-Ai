const emojis = {
    success: '✅',    // Success emoji
    error: '❌'       // Error emoji
};

const { exec } = require('child_process');

module.exports = {
    usage: ["update"],
    desc: "Updates the bot files from the upstream GitHub repository.",
    commandType: "Bot",
    isGroupOnly: false,
    isAdminOnly: false, // Only allow admins to execute this command
    isPrivateOnly: false,
    emoji: emojis.success,

    async execute(sock, m) {
        try {
            // Execute the git pull command
            exec('git pull upstream main', (error, stdout, stderr) => {
                if (error) {
                    // Log error and notify user
                    console.error(`Error executing git pull: ${error}`);
                    kord.react(m, emojis.error);
                    kord.reply(m, `❌ An error occurred while updating: ${stderr}`);
                    return;
                }

                // Log success and notify user
                console.log(`Update output: ${stdout}`);
                kord.react(m, emojis.success);
                kord.reply(m, `✅ Successfully updated the bot files:\n\`${stdout}\``);
            });
        } catch (error) {
            await kord.react(m, emojis.error);
            await kord.reply(m, "❌ An unexpected error occurred while attempting to update.");
            console.error("Error in 'update' command:", error); 
        }
    }
};