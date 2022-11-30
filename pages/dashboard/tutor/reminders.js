import DashboardHeader from "../../../component/dashboard/header";
import DashboardLayout from "../../../component/dashboard/layout";
import ReminderButton from "../../../component/dashboard/reminder/reminderButton";
import moment, { weekdays } from "moment";
import styles from './reminders.module.scss'
import { useEffect, useState } from "react";

export default function Reminders() {
  const [dateObject, setDateObject] = useState(moment())
  const [startDay, setStartDay] = useState(0)
  const [days, setDays] = useState([])
  const [month, setMonth] = useState(moment().format('MMMM'))
  const [year, setYear] = useState(moment().format('YYYY'))
  const [disabled, setDisabled] = useState(false)
  // let weekdayShort = moment.weekdaysShort()
  // let months = moment.months()
  
  function getWeekAndDates() {
    let days = []
    let weekStarts = dateObject.clone().startOf('week').add(startDay, 'week')
    // let weekEnds = dateObject.clone().endOf('week').add(startDay, 'week')
    for(let i = 0; i <= 6; i++) {
      let week = moment(weekStarts).add(i, 'days').format('D, ddd, MMMM, YYYY').split(', ')
      let results = {
        weekday: week[1],
        day: week[0],
        month: week[2],
        year: week[3]
      }
      days.push(results)
    }
    setDays(days)
    setMonth(days[0].month)
    setYear(days[0].year)
  }

  function toggleWeek(event) {
    let option = event.target.id
    option === 'next' ? setStartDay(startDay + 1) : setStartDay(startDay - 1)
    if(option === 'next')
      setStartDay(startDay + 1)
    else 
      setStartDay(startDay - 1)

      console.log(startDay)
    getWeekAndDates()
  }

  useEffect(() => {
    getWeekAndDates()
    return () => {
      // cleanup
    };
  }, [0]);

  return (
    <DashboardLayout>
      <DashboardHeader title="Reminders"/>
      <div className="">
        <div className={"row "+styles.reminderwrapper}>
          <div className="col-md-8 col-lg-8 custom-column">
            <div className={styles.calendartitle}>
              <div className={styles.title}>
                {month +', '+ year}
                <span className={styles.buttons}>
                  <button type="button" className={"btn-sm "+styles.button} onClick={toggleWeek} id="prev"><i className="fa fa-chevron-left"></i></button>
                  <button type="button" className={"btn-sm "+styles.button} onClick={toggleWeek} id="next"><i className="fa fa-chevron-right"></i></button>
                </span>
              </div>
              <form>
                <div className={"form-group "+styles.select}>
                  <i className="fa fa-calendar-week"></i>
                  <select>
                    <option value="7">7 Days</option>
                    <option value="14">14 Days</option>
                  </select>
                </div>
              </form>
            </div>
            <div className={styles.calendar}>
              {
                days.map((d, id) => 
                  <div key={id} className={styles.calendaritem}>
                    {d.weekday}
                    <span className={styles.day}>{d.day}</span>
                    <span className={styles.time}>10:20am</span>
                  </div>
                )
              }
            </div>
            <div className={styles.reminder}>
              <div className={styles.calendartitle}>
                <div className={styles.title}>
                  Today
                  <span className={styles.buttons}>
                    <button type="button" className={"btn-sm "+styles.button} onClick={toggleWeek} id="prev"><i className="fa fa-chevron-left"></i></button>
                    <button type="button" className={"btn-sm "+styles.button} onClick={toggleWeek} id="next"><i className="fa fa-chevron-right"></i></button>
                  </span>
                </div>
              </div>  
              <div className={"reminders "+styles.reminderList}>
                <div className={styles.reminderitem}>
                  <div>
                    Intro to Geography
                    <span>Peter Andrew</span>
                  </div>
                  <span>10:00am</span>
                </div>
                <div className={styles.reminderitem}>
                  <div>
                    Intro to Geography
                    <span>Peter Andrew</span>
                  </div>
                  <span>10:00am</span>
                </div>
                <div className={styles.reminderitem}>
                  <div>
                    Intro to Geography
                    <span>Peter Andrew</span>
                  </div>
                  <span>10:00am</span>
                </div>
                <div className={styles.reminderitem}>
                  <div>
                    Intro to Geography
                    <span>Peter Andrew</span>
                  </div>
                  <span>10:00am</span>
                </div>
              </div>            
            </div>
          </div>
           <div className="col-md-4 col-lg-4 custom-column">
             <div className="divider divider-right"></div>
             <div className="accordion-wrapper">
               <div className={styles.reminderform}>
                 <h4>
                  Create New Reminder
                 </h4>
                  <div className="accordion-content">
                    <form>
                      <div className={"form-group " +styles.formgroup}>
                        <input type="text" placeholder="Title" className="form-control" id="title" name="title" />
                      </div>
                      <div className={"form-group " +styles.formgroup}>
                        <input type="text" placeholder="Description" className="form-control" id="description" name="description" />
                      </div>
                      <div className={"form-group " +styles.formgroup}>
                        <select name="week_day" id="week_day" className="form-control">
                          <option value="">Day of the week</option>
                          <option value="Mon">Monday</option>
                          <option value="Tue">Tuesday</option>
                          <option value="Wed">Wednesday</option>
                          <option value="Thur">Thursday</option>
                          <option value="Fri">Friday</option>
                          <option value="Sat">Saturday</option>
                          <option value="Sun">Sunday</option>
                        </select>
                      </div>
                      <div className={"form-group " +styles.formgroup}>
                        <select name="time" id="time" className="form-control">
                          <option value="">Time</option>
                          <option value="8am">8am</option>
                          <option value="9am">9am</option>
                          <option value="10am">10am</option>
                          <option value="11am">11am</option>
                          <option value="12pm">12pm</option>
                          <option value="1pm">1pm</option>
                          <option value="2pm">2pm</option>
                          <option value="3pm">3pm</option>
                          <option value="4pm">4pm</option>
                          <option value="5pm">5pm</option>
                          <option value="6pm">6pm</option>
                          <option value="7pm">7pm</option>
                        </select>
                      </div>
                      <div className="">
                        <h6>Remind me</h6>
                        <div className={"form-check "+styles.formgroup}>
                          <input className="form-check-input" name="reminder_option" type="checkbox" value="" id="onetime" />
                          <label className="form-check-label" htmlFor="onetime">
                            One - Time
                          </label>
                        </div>                        
                        <div className={"form-check "+styles.formgroup}>
                          <input className="form-check-input" name="reminder_option" type="checkbox" value="" id="twice" />
                          <label className="form-check-label" htmlFor="twice">
                            Two Times
                          </label>
                        </div>                        
                        <div className={"form-check "+styles.formgroup}>
                          <input className="form-check-input" name="reminder_option" type="checkbox" value="" id="twice" />
                          <label className="form-check-label" htmlFor="twice">
                            Remind Weekly
                          </label>
                        </div>                        
                      </div>
                      <div className="form-group">
                        <button  type="button" className="btn btn-default">Create</button>
                      </div>
                    </form>
                  </div>
               </div>
             </div>
           </div>

        </div>

      </div>
    </DashboardLayout>
  )
}