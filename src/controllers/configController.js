import Config from "../models/configs.js"
import fs from 'fs';
//import { timeToken } from '../config.json';




const getConfig = async (req, res) => {
    try {
        const config = JSON.parse(fs.readFileSync('config.json', 'utf8'));
        
        return res.status(200).json(config)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

const initialConfig = async (req,res) => {
    try {
        const timeToken = {
            timeToken:{
                time: 1,
                unitTime: 'h',
                timeInSecond: 3600
            },
            timeRefreshToken:{
                time: 1,
                unitTime: 'h',
                timeInSecond: 3600
            }, 
        }
        const timeTokenString = JSON.stringify(timeToken, null, 2);
        fs.writeFileSync('config.json', timeTokenString, 'utf8', (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log("Archivo creado");
            }
        });
        return res.status(200).json({message: "Archivo creado"})
    } catch (error) {
        return res.status(403).json({message: error.message})
    }
}

const changeConfig = async (req, res) => {
    try {
        const { time, unitTime } = req.body;
        fs.readFile('config.json', 'utf8', (err, jsonString) => {
            if (err) {
                console.log("File read failed:", err);
                return res.status(500).json({message: err})
            }
            else {
                const config = JSON.parse(jsonString);
                config.timeToken.time = parseInt(time);
                config.timeToken.unitTime = unitTime;
                switch (unitTime) {
                    case 's':
                        config.timeToken.timeInSecond = parseInt(time);
                        break;
                    case 'm':
                        config.timeToken.timeInSecond = parseInt(time*60);
                        break;
                    case 'h':
                        config.timeToken.timeInSecond = parseInt(time*60*60);
                        break;
                
                    default:
                        break;
                }
                
                const configString = JSON.stringify(config, null, 2);
                fs.writeFileSync('config.json', configString, 'utf8', (err) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("Archivo creado");
                    }
                });
            }
        });
        
        return res.status(200).json(req.body)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

const updateRefresh = async (req, res) => {
    try {
        const { time, unitTime } = req.body;
        fs.readFile('config.json', 'utf8', (err, jsonString) => {
            if (err) {
                console.log("File read failed:", err);
                return res.status(500).json({message: err})
            }
            else {
                const config = JSON.parse(jsonString);
                config.timeRefreshToken.time = parseInt(time);
                config.timeRefreshToken.unitTime = unitTime;
                switch (unitTime) {
                    case 's':
                        config.timeRefreshToken.timeInSecond = parseInt(time);
                        break;
                    case 'm':
                        config.timeRefreshToken.timeInSecond = parseInt(time*60);
                        break;
                    case 'h':
                        config.timeRefreshToken.timeInSecond = parseInt(time*60*60);
                        break;
                
                    default:
                        break;
                }
                
                const configString = JSON.stringify(config, null, 2);
                fs.writeFileSync('config.json', configString, 'utf8', (err) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("Archivo creado");
                    }
                });
            }
        });
        
        return res.status(200).json({message: "Archivo Actualizado"})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export { getConfig, initialConfig, changeConfig, updateRefresh}