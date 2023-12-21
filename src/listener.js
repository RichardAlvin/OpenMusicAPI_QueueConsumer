class Listener {
    constructor(exportService, mailSender) {
        this._exportService = exportService;
        this._mailSender = mailSender;

        this.listen = this.listen.bind(this);
    }

    async listen(message) {
        try {
            const { userId, targetEmail } = JSON.parse(message.content.toString());
        
            const notes = await this._exportService.exportPlaylist(userId);
            const result = await this._mailSender.sendEmail(targetEmail, JSON.stringify(notes));
        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = Listener;