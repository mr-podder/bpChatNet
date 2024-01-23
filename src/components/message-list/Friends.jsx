import React, { useEffect, useState } from 'react'
import './friend.css'
import Hadding from '../Heading'
import Images from '../ImageComp'
import img from '../../assets/avatar.jpg'
import Button from '@mui/material/Button';
import { getDatabase, ref,set, onValue, remove,push} from "firebase/database";
import { useDispatch, useSelector } from 'react-redux';
// import { activeUser } from '../../slices/activeUserSlice';
// import { useNavigate } from 'react-router-dom';


const Friend = () => {
    const db = getDatabase();
    // const userInfo =useSelector(state=>state.loginSlice.value)
    const [friend,setFriend]=useState([])
    let dispatch=useDispatch()
    // let navigate=useNavigate()

    useEffect(()=>{
        ///////////////// firebase friend confrim data ///////////////////////
        const friendRef = ref(db, 'friends');
        onValue(friendRef, (snapshot) => {
            let array =[]
            snapshot.forEach((item)=>{
                // if(userInfo.uid==item.val().sendId || userInfo.uid==item.val().reciveId){
                // }
                array.push({...item.val(),fdId:item.key})
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
    // const handleActive =(item)=>{
    //     navigate('/messages')
    //     if(userInfo.uid==item.reciveId){
    //         dispatch(activeUser({
    //             type:'single',
    //             activeChatId:item.sendId,
    //             activeChatName:item.sendName
    //         }))
    //         set(ref(db, 'lastMessage/'+item.sendId), {
    //             type:'single',
    //             activeChatId:item.sendId,
    //             activeChatName:item.sendName
    //         })
    //     }else{
    //         dispatch(activeUser({
    //             type:'single',
    //             activeChatId:item.reciveId,
    //             activeChatName:item.reciveName
    //         }))

    //         set(ref(db, 'lastMessage/'+item.reciveId), {
    //             type:'single',
    //             activeChatId:item.reciveId,
    //             activeChatName:item.reciveName
    //         })
    //     }
        
    // }


  return (
    <div className='box'>
        {/* <Hadding title ='Friends'/> */}
        <h1>friend</h1>
        {friend.map((item)=>(
             <div className='list'>
             {/* <Images className='list-img' src={img} /> */}
             <img style={{width:"50px"}} src={img} alt="img" />
             <div className="text">
                 {/* <Hadding text ={item.sendId==userInfo.uid ? item.reciveName :item.sendName}/> */}
                 <h2>fddsjglk</h2>
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