import React from 'react'
import authorImage from '../assets/author_avatar.jpeg'
import styles from './AuthorStyles.module.css'
import closeIcon from '../assets/close.svg'
function AuthorDetails({authorName, authorEmail, onClickHandler}) {
  return (
    <div className={styles.list_item}>
        <div>
            <img src={authorImage} className={styles.author_img} alt="author" />
        </div>
        <div className={styles.author_details}>
            <p>{authorName}</p>
            <p>{authorEmail}</p>
        </div>
        <div>
            <img onClick={onClickHandler} src={closeIcon} className={styles.close_icon} alt="close" />
        </div>
    </div>
  )
}

export default AuthorDetails