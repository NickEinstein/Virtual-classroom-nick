import styles from './list-item.module.scss'
export default function ListItem(props) {
  // console.log(styles)
  let styl = props.style === 'list' 
    ?  
      styles.listitem + ' ' + styles.list + ' card ' 
    : 
      styles.listitem + ' ' + styles.grid + ' card '

  let style = props.size === 'lg' 
    ? 
      styl +' '+ styles.size
    :
      styl

  return (
    <div
      onClick={props.click}
      style={{ cursor: props.click && 'pointer'}}
      className={style}
    >
      <h3 className={styles.title}>{props.title}</h3>
      <div className={styles.cardbase}>
        <div className={styles.count}>{props.dataCount}</div>
        <div className={styles.iconwrapper}>
          <i className={props.icon}></i>
        </div>
      </div>
    </div>
  );
}