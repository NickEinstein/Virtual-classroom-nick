import React from "react";
import Header2 from "../component/header2";
import SearchForm from "../component/homepage/search-form";
import Search from "../component/search";
import Footer from "../component/footer";

export default function SearchResults() {
  return (
    <React.Fragment>
      <Header2/>
      <SearchForm bg="bg-secondary"/>
      <div className="container-fluid">
        <Search />
      </div>
      <Footer/>
    </React.Fragment>
  );
}