import {
    getModelForClass,
    index,
    modelOptions,
    pre,
    prop
} from "@typegoose/typegoose";

import { Schema } from "mongoose";

@index({ id: 1 })
@pre<Playlist>('save', async function () {
    
})

@modelOptions({
    schemaOptions: {
        timestamps: true,
    },
})

export class Playlist {
    @prop()
    name!: string;

    @prop({ required: true })
    creator: string | undefined;

    @prop({ required: true })
    playtime: string | undefined;

    @prop({ required: true })
    trackList!: {type: Schema.Types.ObjectId, ref: 'Track'} // TODO:: remove ArrayArray<string>;

}

const playlistModel = getModelForClass(Playlist);
export default playlistModel;