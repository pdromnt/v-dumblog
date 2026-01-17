import type { ISettings, IArchive, IPost } from '../interfaces/blog';

export const helperService = {
    async getSettings(): Promise<ISettings> {
        const res = await fetch(`./assets/settings.json?cache=${this.generateTimestamp()}`);
        return res.json();
    },

    async getArchive(): Promise<IArchive[]> {
        const res = await fetch(`./assets/posts/archive.json?cache=${this.generateTimestamp()}`);
        return res.json();
    },

    async getPost(filename: string): Promise<IPost> {
        const res = await fetch(`./assets/posts/${filename}.json?cache=${this.generateTimestamp()}`);
        return res.json();
    },

    generateTimestamp(): string {
        return Math.round(new Date().getTime() / 1000).toString();
    },

    parseTimestamp(timestamp: string): string {
        if (!timestamp) return '';
        return new Date(Number(timestamp) * 1000).toUTCString();
    }
};
