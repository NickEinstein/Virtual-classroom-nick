import { useRouter } from "next/router";
import React from "react";
import DetailCard from "../component/detailCard";
import FilterWidget from "../component/filterWidget";
import Header2 from "../component/header2";
import SearchForm from "../component/homepage/search-form";
import Search from "../component/search";

export default function JobSearch() {
  const router = useRouter();

  function viewDetails() {
    router.push({
      pathname: '/users/students/this-tmp-user', 
    })
  }
  return (
    <React.Fragment>
      <Header2/>
      <SearchForm bg="bg-secondary"/>
      <div className="container">
        <div className="row py-4">
          <FilterWidget/>
          <div className="col-md-9">
            <DetailCard
              name="Peter Andrew"
              isTutor={false}
              subject="English"
              text="I'm interested in leaning English language"
              onClick={viewDetails}
            />
          </div>

        </div>
      </div>
    </React.Fragment>
  );
}