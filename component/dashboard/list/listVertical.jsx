import styles from './list-vertical.module.scss';

export default function ListGrid({children}) {
  return (
    <div className={ styles.listvertical }>
      { children }
    </div>
  )
}