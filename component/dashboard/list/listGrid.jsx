import styles from './list-grid.module.scss';

export default function ListGrid({children}) {
  return (
    <div className={ styles.listgrid }>
      { children }
    </div>
  )
}