import io from "socket.io-client";
import { baseUrl } from "./config";

const socket = io(baseUrl, { autoConnect: false });

export default socket;