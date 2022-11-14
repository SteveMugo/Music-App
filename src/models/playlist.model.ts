import {
    getModelForClass,
    index,
    modelOptions,
    pre,
    prop,
    types
} from "@typegoose/typegoose";

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

    @prop({required: true})
    trackList!: {types: 'ObjectId', ref: 'Track'}

}

const playlistModel = getModelForClass(Playlist);
export default playlistModel;