"use client";

// react/next stuff
import useSWR from "swr";
import { useState } from "react";

// components
import PendingPostCard from "./PendingPostCard";
import Popup from "@/components/UIComponents/PopUp/PopUp";
import DeletePopUp from "@/components/UIComponents/PopUp/DeletePopUp";
import { readErrorMessage } from "@/utils/readErrorMessage";
import { MESSAGES } from "@/utils/messages";

// style
import styles from "./PendingPosts.module.css";

const PENDING_URL = "/api/posts?pending=1";

async function fetchPendingPosts(url) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(await readErrorMessage(res, MESSAGES.PENDING_NOT_LOADED));
  }
  return res.json();
}

// Admin only: the page renders this section only for the admin, and the API checks it again.
function PendingPosts() {
  const { data, error, mutate } = useSWR(PENDING_URL, fetchPendingPosts);

  const [slugToDelete, setSlugToDelete] = useState("");
  const [busySlug, setBusySlug] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function approve(slug) {
    setBusySlug(slug);
    try {
      const res = await fetch(`/api/posts/${slug}`, {
        method: "PATCH",
        body: JSON.stringify({ approved: true }),
      });

      if (!res.ok) {
        setErrorMessage(await readErrorMessage(res, MESSAGES.POST_NOT_APPROVED));
        return;
      }

      mutate();
    } catch (error) {
      console.log(error);
      setErrorMessage(MESSAGES.POST_NOT_APPROVED);
    } finally {
      setBusySlug("");
    }
  }

  async function confirmDelete() {
    const slug = slugToDelete;
    setSlugToDelete("");
    setBusySlug(slug);
    try {
      const res = await fetch(`/api/posts/${slug}`, { method: "DELETE" });

      if (!res.ok) {
        setErrorMessage(await readErrorMessage(res, MESSAGES.POST_NOT_DELETED));
        return;
      }

      mutate();
    } catch (error) {
      console.log(error);
      setErrorMessage(MESSAGES.POST_NOT_DELETED);
    } finally {
      setBusySlug("");
    }
  }

  if (error) {
    return (
      <section className={`${styles.pending} layoutContainerAll`}>
        <p className={styles.loadError}>{error.message}</p>
      </section>
    );
  }

  if (!Array.isArray(data)) {
    return null;
  }

  return (
    <>
      <section className={`${styles.pending} layoutContainerAll`}>
        <h3>Posts awaiting approval ({data.length})</h3>
        <div className={styles.list}>
          {data.map((post) => (
            <PendingPostCard
              key={post._id}
              post={post}
              busy={busySlug === post.slug}
              onApprove={() => approve(post.slug)}
              onDelete={() => setSlugToDelete(post.slug)}
            />
          ))}
        </div>
      </section>
      {slugToDelete && (
        <DeletePopUp cancelDelete={() => setSlugToDelete("")} confirmDelete={confirmDelete} />
      )}
      {errorMessage && (
        <Popup
          message={errorMessage}
          onClose={() => setErrorMessage("")}
          showPopup={Boolean(errorMessage)}
        />
      )}
    </>
  );
}

export default PendingPosts;
