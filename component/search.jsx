import style from './search.module.scss';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function Search() {

  const [toggle, setToggle] = useState(false)
  const [panel, setPanel] = useState(null)
  const [tutors, setTutors] = useState([]);
  const [searchParam, setSearchParam] = useState({gender: '', qualification: '', price_range: ''})
  const router = useRouter()

  function toggleAccordion(e) {
    let selected
    if(e.target.parentElement.dataset.number == null) {
      selected = e.target.dataset.number
    }
    else {
      selected = e.target.parentElement.dataset.number
    }
    setPanel(selected)
    setToggle(!toggle)
  }

  function handleInputChange(e) {
    const { name, value } = e.target
    setSearchParam({...searchParam, [name]: value})
  }

  function viewDetails(id) {
    router.push({
      pathname: `/users/${id}`, 
    })
  }

  useEffect(() => {
    // getTutorss()
    if(router.isReady) {
      getTutors()
    }
    return () => {
      setTutors([])
    }
  }, [router.isReady])

  function getTutors() {
    axios.get(`https://theclassroom.ci-auction.ng/api/v1/tutors?amount=${router.query.amount}&level=${router.query.level}&subject=${router.query.subject}`)
    .then(response => {
      // console.log("SUBJECT",response) 
      if(response.data.status) {
        setTutors(response.data.data)
      }
    }) 
  }  

  function filterResult() {
    return tutors.filter(tutor => {
      return tutor.courses.filter(subject => subject.title.includes(searchParam.subject) || subject.fee == subject.amount)
    })
  }


function  truncate(str) {
  return str.length > 500 ? str.substring(0, 150) + "..." : str;
}

  return (
    <div className="row p-4">
      <div className="col-lg-3">
        {/* Side bar */}
        <h5>Filters</h5>
        <div className={style.accordion}>
          <div className={style.accordionItem}>
            <h2 className="accordion-header" id="headingOne" >
              <button type="button" onClick={toggleAccordion} id="1" data-number="collapseOne">
                Price Range 
                {
                  toggle && panel === "collapseOne" ?
                    <i className="fas fa-chevron-up"></i>
                  :
                    <i className="fas fa-chevron-down"></i>
                }
              </button>
            </h2>
            {
              toggle && panel === "collapseOne" ? 
                <div id="collapseOne" className={style.accordionBody+" accordion-collapse collapse show"} >
                  <div className="accordion-body">
                    <div className="form-group">
                      <label>From ₦10,000 - ₦{searchParam.price_range}</label>
                      <input type="range" name="price_range" min="10000" max="50000" className={style.slider} onChange={ handleInputChange }/> 
                    </div>
                  </div>
                </div>
              : null 
            }
          </div>
          <div className={style.accordionItem}>
            <h2 className="accordion-header" id="headingTwo" >
              <button type="button" onClick={toggleAccordion} id="1" data-number="collapseTwo">
                Gender 
                {
                  toggle  && panel === "collapseTwo" ?
                    <i className="fas fa-chevron-up"></i>
                  :
                    <i className="fas fa-chevron-down"></i>
                }
              </button>
            </h2>
            {
              toggle && panel === "collapseTwo" ? 
                <div id="collapseTwo" className={style.accordionBody+" accordion-collapse collapse show"} >
                  <div className="accordion-body">
                    <div className="form-group">
                      <input type="radio" name="gender" value="Female" className="ml-2" onChange={ handleInputChange }/> Female
                      <input type="radio" name="gender" value="Male" className="ml-2" onChange={ handleInputChange }/> Male
                    </div>
                  </div>
                </div>
              : null 
            }
          </div>
          {/* <div className={style.accordionItem}>
            <h2 className="accordion-header" id="headingThree" >
              <button type="button" onClick={toggleAccordion} id="1" data-number="collapseThree">
                Qualifications 
                {
                  toggle && panel === 'collapseThree' ?
                    <i className="fas fa-chevron-up"></i>
                  :
                    <i className="fas fa-chevron-down"></i>
                }
              </button>
            </h2>
            {
              toggle && panel === "collapseThree" ? 
                <div id="collapseThree" className={style.accordionBody+" accordion-collapse collapse show"} >
                  <div className="accordion-body">
                    <div className="form-group">
                      <input type="radio" name="qualification" value="BSC"  className="ml-2" onChange={ handleInputChange }/> B.Sc
                      <input type="radio" name="qualification" value="HND" className="ml-2" onChange={ handleInputChange }/> HND
                      <input type="radio" name="qualification" value="BED"  className="ml-2" onChange={ handleInputChange }/> B.Ed
                    </div>
                  </div>
                </div>
              : null 
            }
          </div> */}
        </div>
      </div>
      <div className="col-lg-9">
        {
          tutors.length ? 
            tutors.map((tutor, index) => (
              <div className={style.searchCard+" card p-1"} onClick={ () => viewDetails(tutor.id)} key={index}>
                <div className="card-body">
                  <div className={style.detailsWrapper}>
                    <div className={style.imgWrapper+ " mr-5"}>
                        <img src={ tutor.avatar == null ? "https://via.placeholder.com/150" : tutor.avatar} width="150"  />
                    </div>
                    <div className={style.row}>
                      <div className={style.rowSm}>
                        <div>
                          <h5>
                            {tutor.first_name} 
                          </h5>
                          <span> 
                            <i className={style.iconColor+" fas fa-star ml-2"}></i> 5 
                            <small>(8 students)</small>
                          </span>
                        </div>
                        <div>
                          <h5>₦1,000</h5><span>/Subject</span>
                        </div>
                      </div>
                      <h6>Maths</h6><small className="ml-2">(Adult leaners, SS1, JSS1, JSS3)</small>
                      <div dangerouslySetInnerHTML={{__html: truncate(tutor.bio)}}>
                      </div>
                      <div className={style.pillWrapper}>
                        <div className={style.pill}>
                          <i className="fa fa-users"></i> 10 Repeat students
                        </div>
                        <div className={style.pill}>
                          <i className="fa fa-clock"></i> 50 Hours Taught
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          : 
          <div className='text-center'>
            <p>No results found</p>
          </div>
        }
      </div>
    </div>
  );
}