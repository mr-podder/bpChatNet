import React, { useEffect, useState } from 'react'
import './messageList.css'
import img from '../../assets/avatar.jpg'
import Images from '../ImageComp'
import Paragraph from '../Pragraph'
// import ModalImage from "react-modal-image";
import {BsFillEmojiSmileFill,BsImages} from 'react-icons/bs'
// import EmojiPicker from 'emoji-picker-react';
import { useSelector } from 'react-redux'
import { getDatabase, push, ref, set,onValue  } from "firebase/database";
import { getStorage, ref as imgref, uploadBytes,getDownloadURL} from "firebase/storage";
// import moment from 'moment/moment'
import { Button } from '@mui/material'
import { AudioRecorder } from 'react-audio-voice-recorder';
// // import Hadding from '../hadding/Hadding'
// import {toast } from 'react-toastify';

const MessageList = () => {
    // const db = getDatabase();
    // const storage = getStorage();
    // const [singlemessageLIst,setSingleMessageList]=useState([])
    // const [groupMessageList,setGroupMessageList]=useState([])
    // // const [blockbyid ,setBlockbyid]=useState('')
    const [emoji,setEmoji]=useState(false)
    // // const [blockid,setBlockid]=useState([])
    const [sendMessage,setSendMessage]=useState('')
    const [audio,setAudio]=useState('')
    // const active =useSelector(state=>(state.activeUser.value))
    // const userInfo =useSelector(state=>console.log(state.loginSlice.value))
    // // audio message 
    const addAudioElement = (blob) => {
        const url = URL.createObjectURL(blob);
        setAudio(blob)
      };

    // useEffect(()=>{
    //     const singleChatRef = ref(db, 'singleChat');
    //     onValue(singleChatRef, (snapshot) => {
    //         let array=[]
    //         snapshot.forEach((item)=>{
    //             if((userInfo.uid==item.val().sendId && active.activeChatId==item.val().reciveId) || (userInfo.uid==item.val().reciveId && active.activeChatId==item.val().sendId) ){
    //                 array.push(item.val())
    //             }
    //         })
    //         setSingleMessageList(array)
    //     });
    //     const groupChatRef = ref(db, 'groupChat');
    //     onValue(groupChatRef, (snapshot) => {
    //         let array=[]
    //         snapshot.forEach((item)=>{
    //             if(active.activeChatId==item.val().reciveId){
    //              array.push(item.val())
    //             }
    //         })
    //         setGroupMessageList(array)
    //     });
    //     /////friend block data/////////
    //     const friendBlockRef = ref(db, 'friendBlock');
    //     onValue(friendBlockRef, (snapshot) => {
    //         // let array =[]
    //         snapshot.forEach((item)=>{
    //             setBlockid(item.val().blockId)
    //             setBlockbyid(item.val().blockbyId)
    //         });
    //     });
    // },[active.activeChatId])

    // send message button
    const handleMessage =()=>{
        if(!sendMessage){
            toast.error('🦄 No Message !', {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }else{
            if(active.type=='single'){
                set(push(ref(db, 'singleChat')),{
                    sendName:userInfo.displayName,
                    sendId:userInfo.uid,
                    reciveName:active.activeChatName,
                    reciveId:active.activeChatId,
                    message:sendMessage,
                    date:`${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`
                }).then(()=>{
                    setSendMessage('')
                })
            }else{
                set(push(ref(db, 'groupChat')),{
                    sendName:userInfo.displayName,
                    sendId:userInfo.uid,
                    reciveName:active.activeChatName,
                    reciveId:active.activeChatId,
                    message:sendMessage,
                    date:`${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`
                }).then(()=>{
                    setSendMessage('')
                })
            }
        }
    }
    // // handle ing uplod
    const handleImgUplod =(e)=>{
        const storageRef = imgref(storage,e.target.files[0].name);
        // 'file' comes from the Blob or File API
        uploadBytes(storageRef, e.target.files[0]).then((snapshot) => {
            getDownloadURL(storageRef).then((downloadURL) => {
                if(active.type=='single'){
                    set(push(ref(db, 'singleChat')),{
                        sendName:userInfo.displayName,
                        sendId:userInfo.uid,
                        reciveName:active.activeChatName,
                        reciveId:active.activeChatId,
                        img:downloadURL,
                        date:`${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`
                    })
                }else{
                    set(push(ref(db, 'groupChat')),{
                        sendName:userInfo.displayName,
                        sendId:userInfo.uid,
                        reciveName:active.activeChatName,
                        reciveId:active.activeChatId,
                        img:downloadURL,
                        date:`${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`
                    })
                }
              });
        });
    }
    // // handleAudio send button
    const handleAudio =()=>{
        const storageRef = imgref(storage,Date.now().toString());
        // 'file' comes from the Blob or File API
        uploadBytes(storageRef, audio).then((snapshot) => {
            getDownloadURL(storageRef).then((downloadURL) => {
                if(active.type=='single'){
                    set(push(ref(db, 'singleChat')),{
                        sendName:userInfo.displayName,
                        sendId:userInfo.uid,
                        reciveName:active.activeChatName,
                        reciveId:active.activeChatId,
                        audio:downloadURL,
                        date:`${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`
                    }).then(()=>{
                        setAudio('')
                    })
                }else{
                    set(push(ref(db, 'groupChat')),{
                        sendName:userInfo.displayName,
                        sendId:userInfo.uid,
                        reciveName:active.activeChatName,
                        reciveId:active.activeChatId,
                        audio:downloadURL,
                        date:`${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`
                    }).then(()=>{
                        setAudio('')
                    })
                }
              });
        });
    }



    //<Paragraph text={active.activeChatName}/>
    // 

  return (
    <div className='message-list'>
         <div className='profile'>
                {/* <Images imageSrc={img}/> */}
                <img style={{width:"70px"}} src={img} alt="user" />
                <Paragraph title='active user'/>
            </div>
        <div className="messages">
            {/* {active.type=='single'
            ?singlemessageLIst.map(item=>(
                item.message
                ?
                    item.sendId==userInfo.uid
                    ?<div key={item.key} className='sendmsg'>
                        <Paragraph text={item.message}/>
                        <span>{moment(item.date, "YYYYMMDD hh:mm").fromNow()}</span>
                    </div>
                    :<div key={item.key} className='receivmsg'>
                        <Paragraph text={item.message}/>
                        <span>{moment(item.date, "YYYYMMDD hh:mm").fromNow()}</span>
                    </div>
                :
                    item.img
                    ?
                        item.sendId==userInfo.uid
                        ?<div className='sendmsg'>
                            <div className='imgdiv'>
                                <ModalImage
                                    small={item.img}
                                    large={item.img}
                                />
                            </div>
                            <span>{moment(item.date, "YYYYMMDD hh:mm").fromNow()}</span>
                        </div>
                        :<div className='receivmsg'>
                            <div className='imgdiv'>
                                <ModalImage
                                    small={item.img}
                                    large={item.img}
                                />
                            </div>
                            <span>{moment(item.date, "YYYYMMDD hh:mm").fromNow()}</span>
                        </div>
                    :item.audio
                    ?
                        item.sendId==userInfo.uid
                        ?<div className='sendmsg'>
                            <audio src={item.audio} controls></audio>
                            <span>{moment(item.date, "YYYYMMDD hh:mm").fromNow()}</span>
                        </div>
                        : <div className='receivmsg'>
                            <audio src={item.audio} controls></audio>
                            <span>{moment(item.date, "YYYYMMDD hh:mm").fromNow()}</span>
                        </div>
                    :item.sendId==userInfo.uid
                    ?<div className='sendmsg'>
                        <video width="320" height="240" controls></video>
                        <span>{moment(item.date, "YYYYMMDD hh:mm").fromNow()}</span>
                    </div>
                    : <div className='receivmsg'>
                        <video width="320" height="240" controls></video>
                        <span>{moment(item.date, "YYYYMMDD hh:mm").fromNow()}</span>
                    </div>
            ))
            // group message==========
            :groupMessageList.map(item=>(
                item.message
                ?
                    item.sendId==userInfo.uid
                    ?<div key={item.key} className='sendmsg'>
                        <Paragraph text={item.message}/>
                        <span>{moment(item.date, "YYYYMMDD hh:mm").fromNow()}</span>
                    </div>
                    :<div key={item.key} className='receivmsg'>
                        <Paragraph text={item.message}/>
                        <span>{moment(item.date, "YYYYMMDD hh:mm").fromNow()}</span>
                    </div>
                :
                    item.img
                    ?
                        item.sendId==userInfo.uid
                        ?<div className='sendmsg'>
                            <div className='imgdiv'>
                                <ModalImage
                                    small={item.img}
                                    large={item.img}
                                />
                            </div>
                            <span>{moment(item.date, "YYYYMMDD hh:mm").fromNow()}</span>
                        </div>
                        :<div className='receivmsg'>
                            <div className='imgdiv'>
                                <ModalImage
                                    small={item.img}
                                    large={item.img}
                                />
                            </div>
                            <span>{moment(item.date, "YYYYMMDD hh:mm").fromNow()}</span>
                        </div>
                    :item.audio
                    ?
                        item.sendId==userInfo.uid
                        ?<div className='sendmsg'>
                            <audio src={item.audio} controls></audio>
                            <span>{moment(item.date, "YYYYMMDD hh:mm").fromNow()}</span>
                        </div>
                        : <div className='receivmsg'>
                            <audio src={item.audio} controls></audio>
                            <span>{moment(item.date, "YYYYMMDD hh:mm").fromNow()}</span>
                        </div>
                    :item.sendId==userInfo.uid
                    ?<div className='sendmsg'>
                        <video width="320" height="240" controls></video>
                        <span>{moment(item.date, "YYYYMMDD hh:mm").fromNow()}</span>
                    </div>
                    : <div className='receivmsg'>
                        <video width="320" height="240" controls></video>
                        <span>{moment(item.date, "YYYYMMDD hh:mm").fromNow()}</span>
                    </div>
                )) 
            } */}
        </div>
        
    <div className="write-message">
        {audio
        ?<div className='audio-input'>
            <audio src={URL.createObjectURL(audio)} controls></audio>
            <div>
            <Button variant="contained" onClick={handleAudio}  >Send</Button>
            <Button color='error' variant="contained" onClick={()=>setAudio('')}>Delete</Button>
            </div>
        </div>
        :<>
        <div className="input">
            <input onChange={(e)=>setSendMessage(e.target.value)} type='text' value={sendMessage}  />
            <div className='emoji' >
                <BsFillEmojiSmileFill onClick={()=>setEmoji(!emoji)} />
                {emoji && <EmojiPicker onEmojiClick={(e)=>setSendMessage(sendMessage+e.emoji)} />}
            </div>
            <label>
                <input type="file" hidden onChange={handleImgUplod} accept="image/*" />
                <BsImages className='imgIcon'/>
            </label>
            <div className='audio'>
            <React.StrictMode>
                <AudioRecorder 
                onRecordingComplete={addAudioElement}
                audioTrackConstraints={{
                    noiseSuppression: true,
                    echoCancellation: true,
                }} 
                downloadOnSavePress={false}
                downloadFileExtension="webm"
                />
            </React.StrictMode>
            </div>
        </div>
        <Button variant="contained" onClick={handleMessage} >Send</Button>
        </>
        }
        </div>
    </div>
  )
}

export default MessageList