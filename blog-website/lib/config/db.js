import mongoose from "mongoose";


export const ConnectDB = async () => {
    await mongoose.connect('mongodb+srv://utkarshs7828:dbaEz53L3liF49dU@cluster0.xvtb4.mongodb.net/bolg-website')
    console.log('Database connected')
}