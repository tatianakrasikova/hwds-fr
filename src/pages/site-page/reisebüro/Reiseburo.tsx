import { useAuth } from "../../../hooks/useAuth";
import styles from "./Reiseburo.module.css";

export default function ReiseburoPage() {
  const { user } = useAuth();

  if (user) {
    return (
      <div className={styles.container}>
        <h1>My Profile</h1>
        <h2>Name: {user.firstName}</h2>
        <h2>E-Mail: {user.email}</h2>
        <h2>Phone: {user.tel}</h2>
      </div>
    );
  }

  return <p className={styles.container}>Please register</p>;
}
