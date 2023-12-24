class Listener {
    constructor(exportService, mailSender) {
        this._exportService = exportService;
        this._mailSender = mailSender;

        this.listen = this.listen.bind(this);
    }

    async listen(message) {
        try {
            const { playlistId, targetEmail } = JSON.parse(message.content.toString());

            const playlist = await this._exportService.exportPlaylist(playlistId);
            await this._mailSender.sendEmail(targetEmail, JSON.stringify(playlist));
        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = Listener;
