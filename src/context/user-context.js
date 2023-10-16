import { createContext, useEffect, useState } from "react";
import { authStateChangeListener } from '../lib/utils/firebase.utils';
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../lib/config/firebase";

export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
});

export const UserContextProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);

    const [currentUser, setCurrentUser] = useState(null);
    const [userDoc, setUserDoc] = useState({});
    const [userBookmarks, setUserBookmarks] = useState([]);

    useEffect(()=> {
        const unsubscribe = authStateChangeListener((user) => {
            if(user?.reloadUserInfo.providerUserInfo[0].providerId === 'password') {
                if(user?.photoURL) {
                    setCurrentUser(user);
                }
                else {
                    setLoading(true);
                    setTimeout(() => {
                        setCurrentUser(user);
                        setLoading(false);
                    }, 5000);
                }
            }
            else {
                setCurrentUser(user);
            }
        })

        return unsubscribe;
    }, []);

    useEffect(() => {
        const getUserBookmarks = () => {
            const userDocRef = doc(db, 'users', currentUser.uid);

            const unsub = onSnapshot(userDocRef, (doc) => {
                if(doc) {
                    setUserBookmarks(doc.data()?.bookmarks);
                }
            });

            return unsub;
        }

        currentUser?.uid && getUserBookmarks();
        setUserBookmarks([]);
    }, [currentUser]);

    useEffect(() => {
        try {
            const getUserDoc = async () => {
                const UserDocRef = doc(db, 'users', currentUser.uid);
    
                const unsub = onSnapshot(UserDocRef, (doc) => {
                    if(doc) {
                        setUserDoc(doc.data());
                    }
                });
    
                return unsub;
            }
    
            currentUser && getUserDoc();
            setUserDoc([]);
        }
        catch(err) {
            console.log(err);
        }
    }, [currentUser]);

    const contextValue = {
        currentUser,
        setCurrentUser,
        userDoc,
        setUserDoc,
        loading,
        userBookmarks
    };

    return (
        <UserContext.Provider value={ contextValue }>
            { children }
        </UserContext.Provider>
    )
}