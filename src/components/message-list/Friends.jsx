import React, { useEffect, useState } from 'react'
import './friend.css'
import Images from '../ImageComp'
import img from '../../assets/avatar.jpg'
import Button from '@mui/material/Button';
import { getDatabase, ref,set, onValue, remove,push} from "firebase/database";
import { useDispatch, useSelector } from 'react-redux';
import Heading from '../Heading'
import { activeUser } from '../../features/user/activeSlice';


const Friend = () => {
    const db = getDatabase();
    const userInfo =useSelector(state=>state.logdin.value)
    console.log(userInfo);
    const [friend,setFriend]=useState([])
    let dispatch=useDispatch()

    useEffect(()=>{
        ///////////////// firebase friend confrim data ///////////////////////
        const friendRef = ref(db, 'friends');
        onValue(friendRef, (snapshot) => {
            let array =[]
            snapshot.forEach((item)=>{
                if(userInfo.uid==item.val().senderId|| userInfo.uid==item.val().reciverId){
                }
                array.push({...item.val(),fdId:item.key})
                console.log(item.val());
            })
            setFriend(array)
        });
    },[]);

    ////////////////////// friend block button ///////////////////// 
    // const handleBlock = (item) =>{
    //     if(userInfo.uid==item.sendId){
    //         set(push(ref(db, 'friendBlock')), {
    //             blockName:item.reciveName,
    //             blockId:item.reciveId,
    //             blockbyName:item.sendName,
    //             blockbyId:item.sendId
    //         }).then(()=>{
    //             remove(ref(db,'friendConfrim/'+item.fdId))
    //         })
    //     }else{
    //         set(push(ref(db, 'friendBlock')), {
    //             blockName:item.sendName,
    //             blockId:item.sendId,
    //             blockbyName:item.reciveName,
    //             blockbyId:item.reciveId
    //         }).then(()=>{
    //             remove(ref(db,'friendConfrim/'+item.fdId))
    //         })
    //     }
    // }
    // handle active click
    const handleActive =(item)=>{
        if(userInfo.uid==item.reciverId){
            dispatch(activeUser({
                type:'single',
                activeChatId:item.senderId,
                activeChatName:item.sendName
            }))
            // set(ref(db, 'lastMessage/'+item.senderId), {
            //     type:'single',
            //     activeChatId:item.senderId,
            //     activeChatName:item.sendName
            // })
        }else{
            dispatch(activeUser({
                type:'single',
                activeChatId:item.reciverId,
                activeChatName:item.reciveName
            }))

            // set(ref(db, 'lastMessage/'+item.reciverId), {
            //     type:'single',
            //     activeChatId:item.reciverId,
            //     activeChatName:item.reciveName
            // })
        }
        
    }


  return (
    <div className='box'>
        <Heading tagName="h2" className="" title="My Friend" />
        {friend.map((item)=>(
             <div key={item.fdId} className='list'>
             <Images className='list-img' imageSrc={img} />
             <div className="text">
                 {/* <Heading tagName='h3' className="" title ={item.senderId==userInfo.uid ? item.reciveName :item.sendName}/> */}
                 <Heading tagName='h3' className="" title ='friend'/>

             </div>
             <div className="flex">
                <Button className='btn' onClick={()=>handleActive(item)} variant="contained">message</Button>
                <Button className='btn' onClick={()=>handleBlock(item)} variant="contained" color='error'>block</Button>
             </div>
         </div>
        ))}
    </div>
  )
}

export default Friend