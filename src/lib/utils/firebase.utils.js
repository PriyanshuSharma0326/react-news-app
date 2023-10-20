import { auth, db, provider, storage } from "../config/firebase";

import { 
    arrayRemove,
    arrayUnion,
    doc,
    getDoc,
    setDoc,
    updateDoc,
} from 'firebase/firestore';

import { 
    signInWithPopup,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile,
} from 'firebase/auth';

import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

import { v4 as uuidv4 } from 'uuid';
import toast from "react-hot-toast";

// Method to Create User Doc to collections
const createUserDoc = async (user, formData, imageURL) => {
    const {
        firstName,
        lastName,
        username,
        phoneNumber,
    } = formData;

    if(!user) return;

    const userDocRef = doc(db, 'users', user.uid);

    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()) {
        const { email, uid } = user;

        try {
            await setDoc(userDocRef, {
                uid,
                displayName: firstName + ' ' + lastName,
                email,
                photoURL: imageURL,
                username,
                phoneNumber,
                bookmarks: [],
            });
        }
        catch(err) {
            console.log(err);
        }
    }

    return userDocRef;
}

// Method to Create Google User Doc to collections
const createGoogleUserDoc = async (user) => {
    if(!user) return;

    const userDocRef = doc(db, 'users', user.uid);

    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()) {
        const { email, uid, displayName, photoURL } = user;

        try {
            await setDoc(userDocRef, {
                uid,
                displayName,
                email,
                photoURL,
                username: '',
                phoneNumber: '',
                bookmarks: [],
            });
        }
        catch(err) {
            console.log(err);
        }
    }

    return userDocRef;
}

// Retrieve user doc
const getUserDocFromCollection = async (userID) => {
    const userDocRef = doc(db, 'users', userID);

    const userDoc = await getDoc(userDocRef);

    return userDoc;
}

// Method to Sign User In with Google Popup
const googlePopupSignIn = () => signInWithPopup(auth, provider);

// Method to Sign User Up with Email and Password
const createUserEmailPasswordMethod = async (email, password) => {
    if(!email || !password) {
        return;
    }

    return createUserWithEmailAndPassword(auth, email, password);
}

const addImageToStorage = async (file, formData, user) => {
    const {
        firstName,
        lastName,
        phoneNumber,
    } = formData;
    const { uid } = user;

    const storageRef = ref(storage, uid);

    await uploadBytesResumable(storageRef, file)
    .then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
            try {
                await updateProfile(user, {
                    displayName: firstName + ' ' + lastName,
                    photoURL: downloadURL,
                    phoneNumber: phoneNumber,
                });
                await createUserDoc(user, formData, downloadURL);
            }
            catch (err) {
                console.log(err);
            }
        });
    });
}

// Method to Sign User In with Email and Password
const signInUserEmailPasswordMethod = async (email, password) => {
    if(!email || !password) {
        return;
    }

    return signInWithEmailAndPassword(auth, email, password);
}

// Method to Sign User Out
const signOutUser = () => signOut(auth);

// Method to Listen to Auth State Changes
const authStateChangeListener = (callback) => {
    onAuthStateChanged(auth, callback);
}

// Fucntion to update user profile
const updateUserProfile = async (profileDoc, imageFile, id) => {
    const {
        displayName,
        phoneNumber,
        photoURL,
        username
    } = profileDoc;

    const userDocRef = doc(db, 'users', id);

    const storageRef = ref(storage, uuidv4());

    if(imageFile) {
        await uploadBytesResumable(storageRef, imageFile)
        .then(() => {
            getDownloadURL(storageRef).then(async (downloadURL) => {
                try {
                    await updateDoc(userDocRef, {
                        displayName,
                        phoneNumber,
                        photoURL: downloadURL,
                        username,
                    })
                }
                catch (err) {
                    console.log(err);
                }
            });
        });
    }
    else {
        try {
            await updateDoc(userDocRef, {
                displayName,
                phoneNumber,
                photoURL,
                username,
            })
        }
        catch (err) {
            console.log(err);
        }
    }
}

// Add a product to user's cart
const addArticleToBookmarks = async (item, userID) => {
    const userCartDocRef = doc(db, 'users', userID);

    try {
        await updateDoc(userCartDocRef, {
            bookmarks: arrayUnion({...item})
        })
        toast.success('Article added to Bookmarks');
    }
    catch (err) {
        toast.error('Error adding article to Bookmarks');
    }
}

const removeArticleFromBookmarks = async (item, userID) => {
    const userCartDocRef = doc(db, 'users', userID);

    try {
        await updateDoc(userCartDocRef, {
            bookmarks: arrayRemove({...item})
        })
        toast.error('Article removed from Bookmarks');
    }
    catch (err) {
        toast.error('Error removing article from Bookmarks');
    }
}

export {
    createGoogleUserDoc,
    getUserDocFromCollection,
    googlePopupSignIn,
    createUserEmailPasswordMethod,
    addImageToStorage,
    signInUserEmailPasswordMethod,
    signOutUser,
    authStateChangeListener,
    updateUserProfile,
    addArticleToBookmarks,
    removeArticleFromBookmarks
}
