import { object, string, TypeOf } from 'zod';

export const createTrackSchema = object({
    body: object({
        name: string({ required_error: 'Track name is required'}),
        album: string({ required_error: 'Track album is required'}),
        artist: string({ required_error: 'Track artist is required'}),
        duration: string({ required_error: 'Track duration is required'}),
        artwork: string({ required_error: 'Track artwork is required'}),
        audio: string({ required_error: 'Track audio is required'}),
    }),
});

export type CreateTrackInput = TypeOf<typeof createTrackSchema>['body'];
export type FindTrackInput = TypeOf<typeof createTrackSchema>['body'];