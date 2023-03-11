import { dbService } from "fbase";
import { addDoc, collection, query, onSnapshot, orderBy } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import Tweet from "./../components/Tweet";

const Home = ({ userObj }) => {
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    const q = query(collection(dbService, "tweets"), orderBy("createdAt", "desc"));
    onSnapshot(q, (snapshot) => {
      const tweetArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTweets(tweetArr);
    });
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(dbService, "tweets"), {
        text: tweet,
        createdAt: Date.now(),
        creatorId: userObj.uid,
      });
    } catch (error) {
      console.error("Error adding document: ", error);
    }
    setTweet("");
  };

  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setTweet(value);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input value={tweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120} />
        <input type="submit" value="Tweet" />
      </form>
      <div>
        {tweets.map((tw) => (
          <Tweet key={tw.id} tweetObj={tw} isOwner={tw.creatorId===userObj.uid}/>
        ))}
      </div>
    </div>
  );
};
export default Home;
