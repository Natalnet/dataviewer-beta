import styles from '../styles/Student.module.css'

function StudentSmallCard({ name, progress }) {
  return (
    <div className={styles.card}>
      <div className={styles.title}>{name}</div>
      <div className={styles.content}>
        <p> Progresso: {progress}% </p>
      </div>
    </div>
  )
}

export default StudentSmallCard