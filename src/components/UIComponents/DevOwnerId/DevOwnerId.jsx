// style
import styles from "./devOwnerId.module.css";

// Development only: shows the ownerId of the logged in user, so it can be copied into ADMIN_ID.
function DevOwnerId({ ownerId }) {
  if (!ownerId) {
    return null;
  }

  return (
    <p className={`${styles.devOwnerId} layoutContainerAll`}>
      Your ownerId (development only, for ADMIN_ID): <code>{ownerId}</code>
    </p>
  );
}

export default DevOwnerId;
