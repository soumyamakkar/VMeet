import { io } from "socket.io-client";
export const socket = io(`https://vmeet-4enh.onrender.com`);

socket.on("connect", () => {});

socket.on("disconnect", () => {});
