import { Button, Spinner } from 'react-bootstrap';
import style from './customButton.module.scss';


export default function CustomButton(props) {
  return (
    <Button
      variant={props.variant}
      size={props.size}
      className={style.customButton}
      onClick={props.onClick}
    >
     { 
      props.icon && props.icon != null ?
      <i className={"mr-2 fas fa-"+props.icon}></i> : null
     } 
     {props.text} 
      {props.showLoader ? <Spinner animation="border" variant="white" size="sm" className="ml-2" /> : null}
    </Button>
  );
}