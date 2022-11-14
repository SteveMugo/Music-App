import { object, string, TypeOf } from "zod";

export const createPlaylistSchema = object({
    body: object({
        name: string({ required_error: 'Playlist name is required' }),
        creator: string({ required_error: 'Playlist creator is required' }),
        playtime: string({ required_error: 'Playlist playtime is required' }),
        trackList: string({ required_error: 'Playlist playtime is required' }),
    })
});

export type CreatePlaylistInput = TypeOf<typeof createPlaylistSchema>['body'];
export type FindPlaylistInput = TypeOf<typeof createPlaylistSchema>['body'];