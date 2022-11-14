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
    @prop()
    name!: string;

    @prop({ required: true })
    album: string | undefined;

    @prop({ required: true })
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