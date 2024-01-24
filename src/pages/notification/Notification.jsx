import React from 'react'
import ImageComp from '../../components/ImageComp'
import Flex from '../../components/Flex'
import { Link } from 'react-router-dom'


const Notification = () => {


  const notify = [
    {
      "id": "1",
      "author": {
        "name": "BP Saheb",
        "img": "/src/assets/avatar.jpg",
        "alt": "Chess",
        "href": "#"
      },
      "text": "typed a comment",
      "link": {
        "text": "Subha ho gaye Mamu",
        "href": "#"
      },
      "time": "1m ago",
      "unRead": true
    },
    {
      "id": "2",
      "author": {
        "name": "Haidar baba",
        "img": "/src/assets/avatar.jpg",
        "href": "#"
      },
      "text": "typed a comment",
      "link": {
        "text": "Ruti Niya ghurbi",
        "href": "#"
      },
      "time": "4m ago",
      "unRead": false
    },
    {
      "id": "3",
      "author": {
        "name": "Pagla baba",
        "img": "/src/assets/avatar.jpg",
        "href": "#"
      },
      "text": "typed a comment",
      "link": {
        "text": "Ruti Khaya felci",
        "href": "#"
      },
      "time": "7m ago",
      "unRead": true
    },
    {
      "id": "4",
      "author": {
        "name": "Bhondo Pir",
        "img": "/src/assets/avatar.jpg",
        "href": "#"
      },
      "text": "typed a comment",
      "link": {
        "text": "Mittha Kotha bole",
        "href": "#"
      },
      "time": "7m ago",
      "unRead": false
    },
  ]



  return (
    <div>
      {notify.map(item => (
        <div key={item.id}>
          <ImageComp className="notfyImageDiv" imageSrc={item.author.img} />
          <p>{item.author.name}</p>

          <div >

            <div className='post_text'>

              <Link to={item.author.href}>
                {item.author.name}
              </Link>
              <p>{item.text}</p>
              {item.link && (<Link to={item.link.href}>
                {item.link.text}
              </Link>)}
              <span className={item.unRead && "unRead"}></span>
            </div>
            <p className='time'>{item.time}</p>
          </div>




          {item.image && <Link to={item.author.href}><ImageComp className="notfyImageDiv" imageSrc={item.author.img} alt={item.author.alt} /></Link>}

        </div>
      ))}
    </div>
  )
}

export default Notification