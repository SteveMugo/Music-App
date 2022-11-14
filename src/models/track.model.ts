import {
    getModelForClass,
    index,
    modelOptions,
    pre,
    prop
} from "@typegoose/typegoose";

@index({ id: 1 })
@pre<Track>('save', async function () {
    
})

@modelOptions({
    schemaOptions: {
        timestamps: true,
    },
})

export class Track {
    @prop({ default: 'Unknown name' })
    name!: string;

    @prop({ required: true, default: 'Unknown album' })
    album: string | undefined;

    @prop({ required: true, default: 'Unknown artist' })
    artist: string | undefined;

    @prop({ required: true })
    duration: string | undefined;

    @prop()
    artwork!: string;

    @prop()
    audio!: string;
}

const trackModel = getModelForClass(Track);
export default trackModel;