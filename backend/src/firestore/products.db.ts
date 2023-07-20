import { initializeApp, cert, applicationDefault } from 'firebase-admin/app';
import { getFirestore} from 'firebase-admin/firestore';
import serviceAccount from '../../configs.json';

initializeApp({
    credential: serviceAccount ? cert(serviceAccount as any) : applicationDefault()
});

const db = getFirestore();

export const paginateProducts = async (offset: string) => {
    const perPage = 10;
    const snapshot = await db.collection('produtos')
                             .orderBy('name')
                             .startAt(offset)
                             .limit(perPage)
                             .get();
    return snapshot
}

interface DocData {
    carta: string, valor: number
}

export async function setProduct(docname: string, data: DocData ){
    const docRef = db.collection('produtos').doc(docname);
    return docRef.set(data);
}

export async function deleteProduct(docname: string){
    return db.collection('produtos').doc(docname).delete()
}

