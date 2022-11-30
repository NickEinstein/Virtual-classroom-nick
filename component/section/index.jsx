import style from './sections.module.scss'


export default function Sections(props) {
  return (
    <div 
      className={style.sectionBox}
      onClick={props.onClick}
    >
      <h3> { props.title }</h3>
    </div>
  );
}