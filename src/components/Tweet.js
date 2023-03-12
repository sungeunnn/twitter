/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import { dbService } from "fbase";
import { deleteObject, ref } from "@firebase/storage";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { storageService } from "../fbase";

const Tweet = ({ tweetObj, isOwner }) => {
  const TweetTextRef = doc(dbService, "tweets", `${tweetObj.id}`);

  const [editing, setEditing] = useState(false);
  const [newTweet, setNewTweet] = useState(tweetObj.text);
  const urlRef = ref(storageService, tweetObj.attachmentUrl);
  const onDeleteClick = async () => {
    const ok = window.confirm("트윗을 지우겠습니까?");
    if (ok) {
      try {
        await deleteDoc(TweetTextRef);
        if (tweetObj.attachmentUrl !== "") {
          await deleteObject(urlRef);
        }
      } catch (error) {
        window.alert("트윗을 삭제하는 데 실패했습니다!");
      }
    }
  };

  const toggleEditing = () => setEditing((prev) => !prev);

  const onSubmit = async (e) => {
    e.preventDefault();
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
          {isOwner && (
            <>
              <form onSubmit={onSubmit}>
                <input onChange={onChange} type="text" placeholder="Edit your tweet" value={newTweet} required />
                <input type="submit" value="Update Tweet" />
              </form>
              <button onClick={toggleEditing}>Cancel</button>
            </>
          )}
        </>
      ) : (
        <>
          <h4>{tweetObj.text}</h4>
          {tweetObj.attachmentUrl && (
            <>
              <img src={tweetObj.attachmentUrl} width="50px" height="50px" />
            </>
          )}
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
