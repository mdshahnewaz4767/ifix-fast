import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

export const initializeLoginFramework = () => {
    if(firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    } 
}

//Google signIn
export const handleGoogleSignIn = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(googleProvider )
    .then((result) => {
        const {displayName, email, photoURL} = result.user;
        const signedInUser = {name: displayName, email: email, image: photoURL, success: true}
        return signedInUser;
    }).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        // console.log(errorCode, errorMessage);
    });
}

//Facebook signIn
export const handleFacebookSignIn = () => {
    const facebookProvider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(facebookProvider)
    .then((result) => {
        const {displayName, email, photoURL} = result.user;
        const signedInUser = {name: displayName, email: email, image: photoURL, success: true}
        return signedInUser;
    }).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        // console.log(errorCode, errorMessage);
    });
}

export const createUserWithEmailAndPassword = (email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(res => {
        // Signed up 
        const newUserInfo = res.user;
        newUserInfo.error = '';
        newUserInfo.success = true;
        return newUserInfo;
    })
    .catch((error) => {
        const newUserInfo = {};
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        return newUserInfo;
    });
}

export const signInWithEmailAndPassword = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
    .then(res => {
        // Signed in
        var newUserInfo = res.user;
        newUserInfo.error = '';
        newUserInfo.success = true;
        return newUserInfo;
    })
    .catch((error) => {
        const newUserInfo = {};
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        return newUserInfo;
    });
}