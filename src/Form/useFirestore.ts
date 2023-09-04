import { firestore } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { Tool } from './tool.model';

export async function createTool(newTool: Tool) {
  await addDoc(collection(firestore, 'tools'), newTool)
    .then((message) => console.log(message))
    .catch((error) => console.log(error));
}
