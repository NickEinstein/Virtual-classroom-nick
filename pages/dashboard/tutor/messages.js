import DashboardHeader from "../../../component/dashboard/header";
import DashboardLayout from "../../../component/dashboard/layout";
import Image from "next/dist/client/image";
import Link from "next/dist/client/link";
import InfoCardPlain from "../../../component/dashboard/infoCardPlain";
import { useState, useEffect } from "react";
import avatar from "../../../public/images/avatar.png";
import styles from './messages.module.scss';
import ChatBox from "../../../component/dashboard/chat/chatBox";
import Message from "../../../component/dashboard/chat/message";

export default function Messages() {
  const [searchResult, setSearchResult] = useState([])
  const [user, setUser] = useState({})
  const [expand, setExpand] = useState(true)
  const [expandChild, setExpandChild] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const msgs = [
    {
      text: "Hi",
      sender: "message"
    },
    {
      text: "What's up",
      sender: "response"
    },
    {
      text: "What's good?",
      sender: "response"
    },
    {
      text: "I'm cool, how's your day going ?",
      sender: "message"
    },
    {
      text: "Omo I don tire",
      sender: "response"
    },
  ]
  const tutors = [
    {
      id: '123411', 
      name: 'Peter Onuh A.',
      subject: 'Physics',
      rating: 4.9,
      rating_count: "2,800",
      date: "January 2022",
      avatar: "https://i.pravatar.cc/300?img=63",
      is_active: true
    },
    {
      id: '123421', 
      name: 'Moses Oche',
      subject: 'Web Dev',
      rating: 5.9,
      rating_count: "2,900",
      date: "December 2022",
      avatar: "https://i.pravatar.cc/300?img=3",
      is_active: false
    },
    {
      id: '123438', 
      name: 'Romanus Blair',
      subject: 'Physics',
      rating: 4.9,
      rating_count: "2,800",
      date: "January 2022",
      avatar: "https://i.pravatar.cc/300?img=60",
      is_active: false
    },
    {
      id: '123439', 
      name: 'Tobi Williams',
      subject: 'DevOps',
      rating: 4.9,
      rating_count: "2,800",
      date: "September 2022",
      avatar: "https://i.pravatar.cc/300?img=2",
      is_active: false
    },
    {
      id: '123432', 
      name: 'Daniel Ntoe',
      subject: 'Maths',
      rating: 8.9,
      rating_count: "2,800",
      date: "September 2022",
      avatar: "https://i.pravatar.cc/300?img=14",
      is_active: false
    },
    {
      id: '123431', 
      name: 'Dave Steve',
      subject: 'Physics',
      rating: 2.9,
      rating_count: "2,810",
      date: "January 2022",
      avatar: "https://i.pravatar.cc/300?img=19",
      is_active: false
    },
    {
      id: '123430', 
      name: 'Itodo John',
      subject: 'Biolog',
      rating: 7.9,
      rating_count: "9,800",
      date: "January 2022",
      avatar: "https://i.pravatar.cc/300?img=25",
      is_active: false
    },
    {
      id: '123435', 
      name: 'Peter Onuh A',
      subject: 'Physics',
      rating: 9.2,
      rating_count: "2,200",
      date: "September 2021",
      avatar: "https://i.pravatar.cc/300?img=31",
      is_active: false
    },
  ]
  useEffect(() => {
    // console.log(tutors)
    setSearchResult(tutors)
    setTimeout(() => {
      setIsOpen(true)
    }, 2000);
    return () => {
      //
    };
  }, [0]);

  function searchTutor(event) {
    const {name, value} = event.target
    let results = tutors.filter(tutor => tutor.name.includes(value) 
      || tutor.name.toLowerCase().includes(value) || 
      tutor.subject.includes(value) || tutor.subject.toLowerCase().includes(value)
    )
    setSearchResult(results)
  }

  function selected(event) {
    let id = event.target.id
    let u = tutors.filter(tutor => {
      if(tutor.id !== id && tutor.is_active === true) {
        tutor.is_active = false
      }
      else if(tutor.id === id)
      return tutor
    })
    u[0].is_active = true
    setSearchResult(tutors)
    setUser(u[0])
    console.log(user)
    console.log(tutors)
  }

  return (
    <DashboardLayout>
      <DashboardHeader title="Classes"/>
      <div className="dashboard">
        <div className="row p-4">
          <div className="col-md-4 col-lg-4 custom-column">
            <div className={"search "+styles.search}>
                <input 
                  type="text" 
                  name="search" 
                  placeholder="Search" 
                  className="form-control"
                  onKeyUp={searchTutor}
                /> 
              </div>
            <div className="list-group">
              <div className="list-grid class-session">
                {
                  searchResult.map((tutor, id) => 
                    <InfoCardPlain
                      key={id}
                      name={tutor.name}
                      subject={tutor.subject}
                      avatar={tutor.avatar}
                      id={tutor.id}
                      is_active={tutor.is_active}
                      onClick={selected}
                    />
                  )
                }
              </div>
            </div>
            <div className="divider divider-left"></div>
          </div>
           <div className="col-md-8 col-lg-8">
              <div className="chat-wrapper">
                <div className="details">
                  <div className={"card-header "+styles.cardheader}>
                    <div className={"avatar "+styles.avatar}>
                      <Image 
                        src={user.avatar || avatar } 
                        className="rounded-circle" 
                        width="40" 
                        height="40" 
                        layout="fixed"
                        alt="avatar"
                      />
                      <div className={styles.nametag}>
                          Peter Andrew Onuh
                        <p>Online <span className="online-status"></span></p>
                      </div>
                    </div>
                  </div>                  
                </div>
              <ChatBox>
                {
                  msgs.map((message, id) => 
                    <Message 
                      key={id}
                      message={message.text}
                      style={message.sender}
                    />
                  )                
                }
              </ChatBox>
              </div> 
           </div>

        </div>

      </div>
    </DashboardLayout>
  )
}