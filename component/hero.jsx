import { Jumbotron } from "react-bootstrap";
import SearchForm from "./homepage/search-form";
import style from './homepage/search-form.module.scss';

export default function Hero() {

  return (
    <Jumbotron className={style.paralax+" text-center mx-auto w-auto"}>
      <SearchForm />
    </Jumbotron>
  );
}