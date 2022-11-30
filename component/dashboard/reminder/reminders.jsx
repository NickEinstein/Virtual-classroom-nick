import Calendar from "./calendar";
import CalendarItem from "./calendarItem";
import ReminderButton from "./reminderButton";

export default function Reminders() {
  return (
    <div className="reminders">
    <div className="row">
      <div className="col-md-12">
        <ul>
          <li>
            <h5>Reminders</h5>
          </li>
          <li>
            <span>
              <form action="#">
                <select name="" id="">
                  <option value="">September 2021</option>
                </select>
              </form>
            </span>
          </li>
        </ul>
      </div>
      
      <Calendar>
        <CalendarItem style="" week_day="MON" day="04"  />
        <CalendarItem style="" week_day="TUE" day="05"  />
        <CalendarItem style="" week_day="WED" day="06"  />
        <CalendarItem style="active" week_day="THUR" day="07" />
        <CalendarItem style="" week_day="FRI" day="08"  />
        <CalendarItem style="" week_day="SAT" day="09"  />
        <CalendarItem style="" week_day="SUN" day="10" />
      </Calendar>
    </div>

    <div className="row">
      <ReminderButton 
        subject="Geography"
        time="5:00pm"
        style="magenta-bg"
        icon={true}
      />
      <ReminderButton 
        subject="Physics"
        time="2:00pm"
        style="purple-bg"
        icon={true}
      />
      <ReminderButton 
        subject="Biology"
        time="4:05pm"
        style="magenta-bg"
        icon={true}
      />
    </div>
  </div>
  )
}