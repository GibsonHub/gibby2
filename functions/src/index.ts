import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp(functions.config().firebase);

exports.topNotifications = functions.https.onRequest((req, res) => {
    //const content = req.body.fields;
    const topic = 'blogPost';

    const payload = {
        notification: {
            title: 'Blog Posted',
            body: 'AngularFirebase posted a new blog called ${post.title}'
        }
    }

    return admin.messaging().sendToTopic(topic, payload).then(_ => {
        res.status(200).send('Post notified');
    }).catch(err => {
        res.status(400).send('ooops');
    });
});
