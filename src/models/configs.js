import mongoose from "mongoose";


const configShema = new mongoose.Schema({
    timeToken: {
        time: {
            type: Number,
            required: true,
        },
        unitTime: {
            type: String,
            required: true,
        },
        timeInSecond: {
            type: Number,
            required: true,
        }
    }
        
    },{
    timestamps: true,
    versionKey: false
    }
);


export default mongoose.model("Config", configShema);