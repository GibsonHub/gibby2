import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { IBaseService } from './IBaseService';
import { Observable } from 'rxjs';
import { IBaseEntity } from './IBaseEntity';
import { map } from 'rxjs/operators';

export abstract class BaseService<T extends IBaseEntity> implements IBaseService<T> {

    public collection: AngularFirestoreCollection<T>;
    protected cloudTableName: string;
  
    constructor(path: string, protected afs: AngularFirestore) {
        this.cloudTableName = path;
        this.collection = this.afs.collection(this.cloudTableName);
    }

    get(identifier: string): Observable<T> {
        //this.logger.logVerbose(`[BaseService] get: ${identifier}`);
    
        return this.collection
            .doc<T>(identifier)
            .snapshotChanges()
            .pipe(
                map(doc => {
                    if (doc.payload.exists) {
                /* workaround until spread works with generic types */
                        const data = doc.payload.data() as any;
                        const id = doc.payload.id;
                        return { id, ...data };
                    }
                })
            );
    }

    getBy(fieldName: string, operatorValue: firebase.firestore.WhereFilterOp, search: string) {
        return this.afs.collection('profiles').ref.where(fieldName, operatorValue, search).get().then((snap) => {
            return snap.docs.map((doc) => {
              //console.log(doc);
              const rest = doc.data();
              //console.log(rest);
              const ret = { id: doc.id, ...rest };
              console.log(ret);
              return ret;
            });
            
          });
    }

    // getByUserID(identifier: string): Observable<T> {
    //     //this.logger.logVerbose(`[BaseService] get: ${identifier}`);
    
    //     return this.collection
    //         .ref.where('UserID', '==', identifier)
    //         .onSnapshot()
    //         .pipe(
    //             map(doc => {
    //                 if (doc.payload.exists) {
    //             /* workaround until spread works with generic types */
    //                     const data = doc.payload.data() as any;
    //                     const id = doc.payload.id;
    //                     return { id, ...data };
    //                 }
    //             })
    //         );
    // }
    
    
    list(): Observable<T[]> {
        //this.logger.logVerbose(`[BaseService] list`);
    
        return this.collection
            .snapshotChanges()
            .pipe(
                map(changes => {
                    return changes.map(a => {
                        const data = a.payload.doc.data() as T;
                        data.id = a.payload.doc.id;
                        return data;
                    });
                })
            );
    }

    add(item: T): Promise<T> {
        //this.logger.logVerbose('[BaseService] adding item', item);
    
        const promise = new Promise<T>((resolve, reject) => {
            this.collection.add(item).then(ref => {
                const newItem = {
                    id: ref.id,
                    /* workaround until spread works with generic types */
                    ...(item as any)
                };
                resolve(newItem);
            });
        });
        return promise;
    }
    
    
    update(item: T): Promise<T> {
        //this.logger.logVerbose(`[BaseService] updating item ${item.id}`);
    
        const promise = new Promise<T>((resolve, reject) => {
        const docRef = this.collection
            .doc<T>(item.id)
            .set(item)
            .then(() => {
                resolve({
                    ...(item as any)
                });
            });
        });
        return promise;
    }
    
    delete(id: string): void {
        //this.logger.logVerbose(`[BaseService] deleting item ${id}`);
    
        const docRef = this.collection.doc<T>(id);
        docRef.delete();
    }
	
}