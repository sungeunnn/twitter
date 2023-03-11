import React, { useState } from "react";
import { dbService } from "fbase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";

const Tweet = ({ tweetObj, isOwner }) => {
  const TweetTextRef = doc(dbService, "tweets", `${tweetObj.id}`);

  const [editing, setEditing] = useState(false);
  const [newTweet, setNewTweet] = useState(tweetObj.text);

  const onDeleteClick = async () => {
    const ok = window.confirm("트윗을 지우겠습니까?");
    if (ok) {
      await deleteDoc(TweetTextRef);
    }
  };

  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = async(e) => {
    e.preventDefault();
    console.log(tweetObj, newTweet);
    await updateDoc(TweetTextRef, {
      text: newTweet,
    });
    setEditing(false);
  };
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNewTweet(value);
  };
  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input onChange={onChange} type="text" placeholder="Edit your tweet" value={newTweet} required />
            <button onClick={toggleEditing}>Cancel</button>
            <input type="submit" value="Update Tweet" />
          </form>
        </>
      ) : (
        <>
          <h4>{tweetObj.text}</h4>
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete</button>
              <button onClick={toggleEditing}>Edit</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Tweet;
