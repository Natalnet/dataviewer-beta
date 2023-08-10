import StudentSmallCard from './StudentSmallCard'

import styles from '../styles/Student.module.css'
import Link from 'next/link'

function StudentCards({ students, pagePath }) {
  console.log(`${pagePath}/ `)
  return (
    <div className={styles.containerstudents}>
      {students &&
        students.map(s => (
          <Link href={`${pagePath}/${s.id}`} key={s.id} style={{textDecoration: 'none'}}>
              <StudentSmallCard name={s.name} progress={s.progress} />
          </Link>
        ))}
    </div>
  )
}

export default StudentCards