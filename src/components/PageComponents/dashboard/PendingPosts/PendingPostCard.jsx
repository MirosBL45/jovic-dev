"use client";

// react/next stuff
import { useState } from "react";

// components
import ClickButton from "@/components/CustomInputs/Buttons/ClickButton";
import SlugCard from "@/app/blog/[slug]/SlugCard";
import { formatDate } from "@/utils/GeneralFunctions";

// style
import styles from "./PendingPosts.module.css";

// The full post is shown the same way as on the blog, with both parts of the post.
function postParts(post) {
  const common = { title: post.title, username: post.username, createdAt: post.createdAt };
  return [
    {
      ...common,
      headline1: post.headline1,
      description1: post.description1,
      image: post.image,
      content1: post.content1,
    },
    {
      ...common,
      headline1: post.headline2,
      description1: post.description2,
      image: post.imagesecond,
      content1: post.content2,
    },
  ];
}

function PendingPostCard({ post, busy, onApprove, onDelete }) {
  const [expanded, setExpanded] = useState(false);
  const toggleText = expanded ? "Hide full post" : "Show full post";

  return (
    <article className={styles.card}>
      <header className={styles.cardHeader}>
        <h4>{post.title}</h4>
        <p className={styles.meta}>
          by <span>{post.username}</span> from{" "}
          <time>{post.createdAt && formatDate(post.createdAt)}</time>
        </p>
      </header>
      <div className={styles.buttons}>
        <ClickButton
          title={toggleText}
          buttonStyle="buttonTransparent"
          onClick={() => setExpanded(!expanded)}
        >
          {toggleText}
        </ClickButton>
        <ClickButton title="Approve" onClick={onApprove} disabled={busy}>
          Approve
        </ClickButton>
        <ClickButton title="Delete" onClick={onDelete} disabled={busy}>
          Delete
        </ClickButton>
      </div>
      {expanded && (
        <div className={styles.fullPost}>
          {postParts(post).map((part, index) => (
            <SlugCard key={index} data={part} />
          ))}
        </div>
      )}
    </article>
  );
}

export default PendingPostCard;
