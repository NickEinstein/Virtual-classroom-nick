import style from './search.module.scss';
import { useState, useEffect }  from 'react';

export default function FilterWidget() {

  const [toggle, setToggle] = useState(false)
  const [panel, setPanel] = useState(null)
  const [searchParam, setSearchParam] = useState({gender: '', qualification: '', price_range: ''})

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

  return (
    <div className="col-lg-3">
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
        <div className={style.accordionItem}>
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
        </div>
      </div>
    </div>    
  );  
}