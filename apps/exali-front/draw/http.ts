import axios from 'axios';
import { HTTP_BACKEND } from '@/config';

export  async function getExistingShapes(roomId: string) {
  try {
    const res = await axios.get(`${HTTP_BACKEND}/chats/${roomId}`);
    const messages = res.data.messages;

    // console.log("📩 messages from API:", messages);

    const shapes = messages
      .map((x: { message: string }, index: number) => {
        try {
          const messageData = JSON.parse(x.message);

          // Optional: check if it's a valid shape object
          if (typeof messageData === 'object' && messageData !== null && 'shape' in messageData) {
            return messageData.shape;
          } else {
            console.warn(`⚠️ Message #${index} is JSON but not a shape:`, messageData);
            return null;
          }
        } catch (error) {
          console.warn(`⚠️ Skipping non-JSON message #${index}:`, x.message);
          return null;
        }
      })
      .filter((x: null) => x !== null); // Remove invalid entries

    // console.log("✅ Parsed shapes:", shapes);

    return shapes;
  } catch (error) {
    console.error("❌ Error fetching shapes from backend:", error);
    return [];
  }
}
