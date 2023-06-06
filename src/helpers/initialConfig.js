import Config from "../models/configs.js"

export const initialConfig = async () => {
    const config = await Config.find();
    
    if (config.length === 0) {
        await Config.create({
            timeToken: {
                time: parseInt(process.env.JWT_EXPIRES_IN_MINUTES),
                unitTime: process.env.JWT_EXPIRES_IN_UNIT,
                timeInSecond: process.env.JWT_EXPIRES_IN_MINUTES*60
            }
        })
    }
}
