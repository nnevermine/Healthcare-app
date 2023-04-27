import { setDoc, getDoc, doc, updateDoc } from "@firebase/firestore";
import { db } from "../lib/firebase";

export default class NotificationController {
  static pushToken = async (data) => {
    try {
      const { uid, token } = data;


      const docRef = doc(db, "notification", uid);
      // data = {
      //   tokens: [token],
      // };
      

      // await setDoc(docRef, data, { merge: true });

      //append to array if it is not exist
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const { tokens } = docSnap.data();
        if (!tokens.includes(token)) {
          await updateDoc(docRef, {
            tokens: [...tokens, token],
          });
        }
      }
      else{
        await setDoc(docRef, {
          tokens: [token],
        });
        
      }





      
    } catch (error) {
      console.log(error);
    }
  };
}
