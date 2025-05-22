import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Grid, Pagination, Avatar, Dialog, DialogTitle, DialogContent, TextField, Button, List, ListItem, ListItemText, ListItemAvatar ,Divider, IconButton,  useMediaQuery,  useTheme,  } from '@mui/material';
import Apiconfigs from '../../../Apiconfig/Apiconfigs';
import axios from 'axios';
import { AccountCircle, Menu, ArrowBack } from '@mui/icons-material';
import io from 'socket.io-client';

const Chat = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [state, setState] = useState({
        userList: [],
        page: 1,
        pages: 1,
    });
    const [selectedUser, setSelectedUser] = useState(null);
    const [messagesByUser, setMessagesByUser] = useState({});
    const [newMessage, setNewMessage] = useState('');
    const [socket, setSocket] = useState(null);
    const [mobileOpen, setMobileOpen] = useState(true);
    const messagesEndRef = useRef(null);
    const { userList, page, pages } = state;

    // Initialize socket connection
    useEffect(() => {
        const newSocket = io(Apiconfigs.baseUrl, { 
            transports: ['websocket'],
            auth: {
                token: sessionStorage.getItem("token")
            }
        });
        setSocket(newSocket);

        return () => newSocket.disconnect();
    }, []);

    // Set up socket event listeners
    useEffect(() => {
        if (!socket) return;

        socket.on('connect', () => {
            console.log('Connected to socket server');
        });

        socket.on('privateMessage', (message) => {
            const userId = message.from === socket.id ? message.to : message.from;
            
            setMessagesByUser(prev => ({
                ...prev,
                [userId]: [
                    ...(prev[userId] || []),
                    {
                        ...message,
                        senderName: message.from === socket.id ? "You" : 
                                  (userList.find(u => u._id === message.from)?.username || "Unknown")
                    }
                ]
            }));
        });

        return () => {
            socket.off('connect');
            socket.off('privateMessage');
        };
    }, [socket, userList]);

    // Scroll to bottom of messages
  

    const updateState = (data) => setState(prevState => ({ ...prevState, ...data }));

    useEffect(() => {
        myFollowersHandler().catch(console.error);
    }, [state.page]);

    const handleUserClick = async (user) => {
        setSelectedUser(user);
        if (isMobile) setMobileOpen(false);
        if (!messagesByUser[user._id]) {
            await loadChat(user._id);
        }
    };

    const loadChat = async (userId) => {
        try {
            const res = await axios.get(Apiconfigs.viewChat + userId, {
                headers: {
                    token: sessionStorage.getItem("token"),
                },
                params: {
                    page: 1,
                    limit: 50
                }
            });
            
            setMessagesByUser(prev => ({
                ...prev,
                [userId]: res.data.result.length > 0 ? res.data.result.reverse().map(msg => ({
                    ...msg,
                    senderName: msg.from === socket?.id ? "You" : 
                               (userList.find(u => u._id === msg.from)?.username || "Unknown")
                })) : []
            }));
        } catch (err) {
            console.error("Error loading chat:", err);
            setMessagesByUser(prev => ({
                ...prev,
                [userId]: []
            }));
        }
    };

    const sendMessage = () => {
        if (!newMessage.trim() || !selectedUser || !socket) return;

        const messageData = {
            to: selectedUser._id,
            text: newMessage,
            timestamp: new Date().toISOString()
        };

        socket.emit('privateMessage', messageData);

        setMessagesByUser(prev => ({
            ...prev,
            [selectedUser._id]: [
                ...(prev[selectedUser._id] || []),
                {
                    ...messageData,
                    from: socket.id,
                    senderName: "You"
                }
            ]
        }));

        setNewMessage('');
    };

    async function myFollowersHandler() {
        await axios({
            method: "GET",
            url: Apiconfigs.profileFollowersList,
            headers: {
                token: sessionStorage.getItem("token"),
            },
            params: {
                limit: 10,
                page: page,
            },
        })
        .then(res => {
            if (res.data.statusCode === 200) {
                updateState({ 
                    userList: res.data.result.docs,
                    pages: res.data.result.pages
                });
            }
        })
        .catch(console.error);
    }

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <Box sx={{ display: 'flex', height: 'calc(100vh - 64px)' }}>
            {/* Users List Sidebar */}
            <Box sx={{
                width: { xs: '100%', md: 350 },
                flexShrink: 0,
                display: {
                    xs: mobileOpen ? 'block' : 'none',
                    md: 'block'
                },
                borderRight: '1px solid',
                borderColor: 'divider',
                overflowY: 'auto'
            }}>
                <Box sx={{ 
                    p: 2, 
                    display: 'flex', 
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                    background:"linear-gradient(to top right,#900098,#4d0051)"
                }}>
                    <Typography variant="h3" color='white'>Messages</Typography>
                    {!isMobile && (
                        <IconButton onClick={handleDrawerToggle} sx={{color:"white"}}>
                            <Menu />
                        </IconButton>
                    )}
                </Box>
                
                <List sx={{ overflowY: 'auto' }}>
                    {userList.map((user) => (
                        <React.Fragment key={user._id}>
                            <ListItem 
                                button 
                                onClick={() => handleUserClick(user)}
                                sx={{
                                    bgcolor: selectedUser?._id === user._id ? 'action.selected' : 'inherit',
                                    '&:hover': { bgcolor: 'action.hover' }
                                }}
                            >
                                <ListItemAvatar>
                                    <Avatar
                                        src={user.profilePic}
                                        sx={{ width: 48, height: 48 }}
                                    >
                                        {!user.profilePic && <AccountCircle />}
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={user.username || user.name}
                                    primaryTypographyProps={{
                                        style: {
                                            color: 'black',
                                            fontWeight: 'medium' // optional: adds slightly bolder text
                                        }
                                    }}
                                    secondary={
                                        messagesByUser[user._id]?.length > 0 ? 
                                        messagesByUser[user._id][messagesByUser[user._id].length - 1].text.substring(0, 30) + 
                                        (messagesByUser[user._id][messagesByUser[user._id].length - 1].text.length > 30 ? '...' : '') : 
                                        'No messages yet'
                                    }
                                    secondaryTypographyProps={{
                                        noWrap: true,
                                        color: 'text.secondary'
                                    }}
                                />
                            </ListItem>
                            <Divider variant="inset" component="li" />
                        </React.Fragment>
                    ))}
                </List>
                
                <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
                    <Pagination 
                        count={pages} 
                        page={page} 
                        onChange={(e, value) => updateState({ page: value })} 
                       
                    />
                </Box>
            </Box>

            {/* Chat Area */}
            <Box sx={{
                flexGrow: 1,
                display: {
                    xs: !mobileOpen ? 'flex' : 'none',
                    md: 'flex'
                },
                flexDirection: 'column',
                height: '100%',
                boxShadow:"2px 4px 8px black",
                backgroundImage: 'url(/assets/Images/doodle2.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}>
                {selectedUser ? (
                    <>
                        <Box sx={{ 
                            p: 2, 
                            display: 'flex', 
                            alignItems: 'center',
                            borderBottom: '1px solid',
                            borderColor: 'divider',
                            background:"rgba(255, 255, 255, 0.7)",
                            
                            
                        }}>
                            {isMobile && (
                                <IconButton onClick={handleDrawerToggle} sx={{ mr: 1 }}>
                                    <ArrowBack />
                                </IconButton>
                            )}
                            <Avatar
                                src={selectedUser.profilePic}
                                sx={{ width: 50, height: 50, mr: 2 }}
                            >
                                {!selectedUser.profilePic && <AccountCircle />}
                            </Avatar>
                            <Typography variant="h3">
                                {selectedUser.username || selectedUser.name}
                            </Typography>
                        </Box>
                        
                        <Box sx={{ 
                            flexGrow: 1, 
                            overflowY: 'auto', 
                            p: 2,
                            backgroundImage: 'url(/assets/Images/doodle3.png)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                        }}>
                            <List>
                                {messagesByUser[selectedUser._id]?.map((msg, index) => (
                                    <ListItem key={index} alignItems="flex-start" sx={{
                                        justifyContent: msg.from === socket?.id ? 'flex-end' : 'flex-start'
                                    }}>
                                        <Box sx={{
                                            maxWidth: '80%',
                                            p: 1.5,
                                            borderRadius: 2,
                                            bgcolor: msg.from === socket?.id ? ' #600086' : 'background.paper',
                                            color: msg.from === socket?.id ? 'primary.contrastText' : 'text.primary',
                                            boxShadow: 1
                                        }}>
                                           
                                            <Typography>{msg.text}</Typography>
                                            <Typography variant="caption" display="block" textAlign="right" sx={{ 
                                                opacity: 0.6,
                                                color: msg.from === socket?.id ? 'primary.contrastText' : 'text.secondary'
                                            }}>
                                                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </Typography>
                                        </Box>
                                    </ListItem>
                                ))}
                                <div ref={messagesEndRef} />
                            </List>
                        </Box>
                        
                        <Box sx={{ 
                            p: 2, 
                            borderTop: '1px solid',
                            borderColor: 'divider',
                            bgcolor: 'background.paper'
                        }}>
                            <Box display="flex" alignItems="center" gap={1}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    placeholder="Type a message..."
                                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                                    size="small"
                                />
                                <Button 
                                    variant="contained" 
                                    onClick={sendMessage}
                                    disabled={!newMessage.trim()}
                                    sx={{
                                        background:"#4d0051"
                                    }}
                                >
                                    Send
                                </Button>
                            </Box>
                        </Box>
                    </>
                ) : (
                    <Box sx={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        height: '100%',
                        textAlign: 'center',
                        p: 3,
                        background:"rgba(255, 255, 255, 0.72)"
                    }}>
                        <AccountCircle sx={{ fontSize: 80, color: '#600086', mb: 2 }} />
                        <Typography variant="h6" color="text.secondary">
                            {isMobile ? 'Select a conversation' : 'Select a conversation to start chatting'}
                        </Typography>
                        {!isMobile && (
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                Choose a user from the sidebar to view messages
                            </Typography>
                        )}
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default Chat;
    

    







{/*import React, { useEffect, useState, useCallback, useContext, useRef } from "react";
import {
    Box,
    Card,
    Badge,
    Typography,
    Tooltip,
    IconButton,
    ImageList,
    ImageListItem,
    ImageListItemBar,
    Button,
    Drawer,
    Divider,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    ListItemSecondaryAction,
    Avatar,
    Container
} from '@mui/material';  
import MenuIcon from "@mui/icons-material/Menu";
import { makeStyles } from '@mui/styles';  
import TopBar from '../../../layouts/TopBar/TopBar'

import InsertPhotoRoundedIcon from '@mui/icons-material/InsertPhotoRounded';  
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined'; 
import SendIcon from '@mui/icons-material/Send';  

import ImageUploading from "react-images-uploading";  
import { RemoveScrollBar } from 'react-remove-scroll-bar';  

import InputEmoji from "react-input-emoji";  
import axios from "axios";  
import Apiconfigs, { baseURL } from "src/Apiconfig/Apiconfigs.js"; 
import { useNavigate, useParams } from 'react-router-dom';  
import { UserContext } from "src/context/User"; 
import DataLoading from "src/component/DataLoading";  
import io from 'socket.io-client';  
import { toast } from "react-toastify";  
import { Virtuoso } from 'react-virtuoso'; 
import { isMobile } from 'react-device-detect';  
import './chat.css'
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import zIndex from "@mui/material/styles/zIndex";
const drawerWidth = 300;


const useStyles = makeStyles((theme) => ({
    container: {
        background: "rgba(144, 0, 173, 0.3)",
        position: 'fixed',
        top: '60px',
        paddingTop: '10px',
        right: '0px',
        bottom: '60px',
        display: "flex",
        justifyContent: 'flex-end',
        width: '100%',
        height:"100%",
        "@media(max-width:400px)": {
            width: '100%',
        right: '0',

          },
        // maxWidth: '100vw',
        // height: 'calc(100vh - 55px)',

    },
    drawer: {
        
        flexShrink: 0,
        '& .MuiList-padding': {
            padding: '0px',
            paddingTop: '10px',
            
            
        },
        '& .MuiListItemText-secondary': {
            fontSize: "12px"
        }
    },
    drawerContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        height: "100vh", 
      },
      drawerPaper: {
        width: "300px", 
        position: "absolute", 
        boxShadow: theme.shadows[3],
        background: "rgba(17, 25, 40, 0.75) !important",
       
        zIndex : "10",
      },
      menuButton: {
        // position: "fixed",
        // top: '0',
        height : "20px",
        left: theme.spacing(4),
        zIndex: 1300, // أعلى من الـ Drawer
      },
    
    // drawerPaper: {
    //     top: '60px',
    //     width: drawerWidth,
    //     background: '#fcfcfc'
    // },
    avatar: {
        marginLeft: "5px",
        backgroundColor: '#fff',
    },
    main: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: "space-between",
        // alignItems: 'stretch',
        width: isMobile ? '100vw' : `calc(100vw - ${drawerWidth}px )`,
        maxWidth: isMobile ? '100vw' : `calc(100vw - ${drawerWidth}px )`,
        "@media(max-width:768px)": {
            paddingLeft : '80px',

          },
    },
    msg: {
        alignSelf: 'end',
        width: '100%',
        '& .react-input-emoji--container': {
            order: 2,
            // margin: "0px 10px"
        },
        '& .react-emoji-picker--wrapper': {
            width: '100%',
        },
    },
}));

const socket = io(baseURL, {
    auth: {
        token: sessionStorage.getItem("token")
        
    },
});


const ChatBox = function ({chat, socket, visible, isOnline}) {
    const START_INDEX = 10000;
    const INITIAL_ITEM_COUNT = 50;
    const [firstItemIndex, setFirstItemIndex] = useState(START_INDEX)

    const classes = useStyles();
    const user = useContext(UserContext);
    const virtuosoRef = useRef(null)
    const [isScrolling, setIsScrolling] = useState(false);
    const [theStart, setTheStart] = useState(false);

    const [messages, setMessages] = useState([]);
    const [images, setImages] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [msg, setMsg] = useState("");
    let contact = chat.users.find(c => c._id != user.userData._id);
    let photo = contact?.profilePic ? contact?.profilePic :
        `https://avatars.dicebear.com/api/miniavs/${contact?.userName}.svg`;

    const onImagesChange = (imageList) => {
        setImages(imageList);
    };

    const uploadImages = async (onImageRemoveAll) => {
        if (images.length > 0) {
            try {
                setUploading(true);
                let upload_images = [...images];
                console.log(upload_images);
                for (const image in upload_images) {
                    const formData = new FormData();
                    console.log(upload_images[image].file);
                    formData.append("file", upload_images[image].file);
                    const res = await axios({
                      method: "POST",
                      url: Apiconfigs.chatUploadImage,
                      data: formData,
                      headers: {
                        token: sessionStorage.getItem("token"),
                      },
                    });

                    if (res.data.statusCode === 200) {
                      let data = {
                        chat_id: chat._id,
                        message: res.data.result,
                        mediaType: 'image'
                      };
                      socket.emit("sendMsg", data);
                    } else {
                      toast.error("Error upload image " + (image + 1));
                    }
                }
                setUploading(false);
                onImageRemoveAll();
            } catch (err) {
                console.log(err);
                setUploading(false);
            }
        } else {
            setUploading(false);
        }
    };

    const sendMsg = () => {
        if (msg.length > 0) {
            let data = {
                chat_id: chat._id,
                message: msg,
            };
            socket.emit("sendMsg", data);
        }
    };

    const unreadMsgs = useCallback(() => {
        return messages.filter(m => (m.status == 'Unread' && m.sender == contact._id));
    }, [messages]);

    const readChatMsgs = async (chatId, MsgsIds) => axios.post(Apiconfigs.readChat,
        {
            chat: chatId,
            ids: MsgsIds
        },
        {
            headers: {
                token: sessionStorage.getItem("token"),
            }
        }).then(res => {
        console.log(res.data);
    }).catch(err => {
        toast.error(err);
    });

    useEffect(() => {

        let unreaded = unreadMsgs();

        if (visible) {
            !isScrolling && virtuosoRef.current.scrollToIndex({index: messages.length - 1, behavior: 'smooth'});
            let chats = user.unreadChats;
            delete chats[chat._id];
            user.setUnReadChats(chats);

            if (unreaded.length > 0) {
                let unreadIds = unreaded.map(ur => ur._id);
                let ids = String(unreadIds);
                readChatMsgs(chat._id, ids);
                let read = messages.map(r => {
                    if (unreadIds.includes(r._id)) {
                        r.status = 'Read';
                    }
                    return r;
                });
                setMessages(read);
            }
        } else {
            if (unreaded.length > 0) {
                user.setUnReadChats(chats => ({...chats, [chat._id]: unreaded}));
            }
        }

    }, [visible, messages]);


    const loadChat = async () => axios.get(Apiconfigs.viewChat + chat._id, {
        headers: {
            token: sessionStorage.getItem("token"),
        },
        params: {
            page: messages.length,
            limit: 50
        },
    }).then(res => {
        if (res.data.result.length > 0) {
            let result = res.data.result.reverse();
            setMessages((msgs) => [...result, ...msgs,]);
            setFirstItemIndex(firstItemIndex => firstItemIndex - result.length);
        } else {
            setTheStart(true);
        }
    });

    useEffect(() => {
        loadChat();
        socket.on(chat._id, (data) => {
            setMessages((msgs) => [...msgs, data]);
        });

        return () => {
            socket.off(chat._id);
        };

    }, []);

    return (
        <>
       
            <Box
        // className=''
            className={classes.main}
            style={{
                display: visible ? 'flex' : 'none',
                
                // paddingBottom: isMobile ? '10px' : '10px',
                height: '100%',
                marginTop: '80px',
            }}>

            {/* Start User`s avatar *}
            <Box display='flex' alignItems='center'>
                <Avatar alt={contact?.userName} src={photo} className={classes.avatar}/>
                <Box m={1}>
                    <Typography component="h5" variant="h5">{contact?.userName}</Typography>
                    <Typography component="p" variant="body2">
                        {isOnline ? 'Online' : 'Active recently'}
                    </Typography>
                </Box>
            </Box>
            {/* End User`s avatar *}


            {/* Start Masseges Box  *}
            <Virtuoso
                style={{}}
                ref={virtuosoRef}
                isScrolling={setIsScrolling}
                firstItemIndex={firstItemIndex}
                initialTopMostItemIndex={INITIAL_ITEM_COUNT - 1}
                data={messages}
                startReached={loadChat}
                // Start chat Start
                components={{
                    Header: () => {
                        return theStart ?
                            <Box width='100%' align='center'>
                                <Typography component="h5" variant="h5">Chat started</Typography>
                                <Typography component="p" variant="body2">
                                    {messages[0] && new Date(messages[0]?.createdAt).toLocaleDateString('en-us', {
                                        weekday: "long",
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric"
                                    })}
                                </Typography>
                            </Box> :
                            <DataLoading/>

                    },
                }}
                // End chat Start

                // Start msg
                itemContent={(index, msg) => {
                    let alignT = (msg.sender == user.userData._id) ? 'right' : ' left';
                    let justf = (msg.sender == user.userData._id) ? 'flex-end' : ' flex-start';
                    let cardV = (msg.sender == user.userData._id) ? 'outlined' : ' elevation';
                    return (
                        <Box key={index} display="flex" justifyContent={justf} padding={1}>
                            <Card variant={cardV} style={{padding: '10px', maxWidth: '80%'}}>
                                {msg.mediaType == 'image' ?
                                    <img src={msg.text} alt="" style={{maxWidth: '300px'}}/> :
                                    <Typography
                                        align={alignT}
                                        variant="h6"
                                        style={{display: "block", fontSize: "14px"}}
                                    >
                                        {msg.text}
                                    </Typography>
                                }

                            </Card>
                        </Box>
                    )
                }}
                // End msg
            />
            {/* End Masseges Box  *}


            <Box display={images.length > 0 ? 'block' : 'flex'} className={classes.msg}>
                {/* Start Enter Image *}
                <ImageUploading
                    multiple
                    value={images}
                    onChange={onImagesChange}
                    maxNumber={5}
                    dataURLKey="data_url"
                    acceptType={["jpg", 'jpeg', 'png', 'gif']}
                >
                    {({
                          imageList,
                          onImageUpload,
                          onImageRemoveAll,
                          onImageRemove,
                          isDragging,
                          dragProps
                      }) => {
                        return (
                            <>
                                <Tooltip title="Send media" placement="top">
                                    <IconButton style={isDragging ? {color: "red"} :{color: "white"}}
                                                onClick={onImageUpload}
                                                {...dragProps}>
                                        <InsertPhotoRoundedIcon/>
                                    </IconButton>
                                </Tooltip>
                                {imageList.length > 1 && <Button onClick={onImageRemoveAll}>Remove all images</Button>}
                                {imageList.length > 0 &&
                                    <ImageList rowHeight={120} className={classes.imageList} cols={6}>
                                        {imageList.map((image, index) => (
                                            <ImageListItem key={index} cols={1}
                                                           style={{backgroundColor: '#ffffff55', textAlign: 'center'}}>
                                                <img src={image.data_url} alt=""
                                                     style={{height: '100%', width: 'auto', margin: 'auto'}}/>
                                                <ImageListItemBar
                                                    title={(index + 1) + ': ' + image.file.name}
                                                    subtitle={<span>{image.file.size} bytes</span>}
                                                    actionIcon={
                                                        <IconButton
                                                            onClick={() => onImageRemove(index)}
                                                            disabled={uploading}
                                                            aria-label={`remove from selection`}>
                                                            {uploading ? <DataLoading/> :
                                                                <HighlightOffOutlinedIcon color="error"/>
                                                            }
                                                        </IconButton>
                                                    }
                                                />
                                            </ImageListItem>

                                        ))}
                                        <ImageListItem key={'send'} cols={1}>
                                            <Box display='flex' height='100%' justifyContent='center'
                                                 alignItems='center' alignContent='center'>
                                                {uploading && <DataLoading/>}
                                                <IconButton
                                                    disabled={uploading}
                                                    onClick={() => uploadImages(onImageRemoveAll)}
                                                    aria-label={`send`}>
                                                    <SendIcon/>
                                                </IconButton>
                                            </Box>

                                        </ImageListItem>
                                    </ImageList>
                                }
                            </>
                        )
                    }}
                </ImageUploading>
                {/*End Enter Image */}

                {/* Start input And Emoji *}
                <InputEmoji
                    value={msg}
                    onChange={setMsg}
                    cleanOnEnter
                    onEnter={sendMsg}
                    placeholder="Type a message"
                    className={classes.msgInput}
                />
                {/*End input And Emoji *}

            </Box>
        </Box>
        </>
        // Start Chat Content
    
        // End Chat Content

    )
}

export default function Chat() {
const Mobile = useMediaQuery(useTheme().breakpoints.down("sm"));

    const {chatId} = useParams();
    const navigate = useNavigate();
    const classes = useStyles();
    const user = useContext(UserContext);
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [chatList, setChatList] = useState([]);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = (open) => () => {
      setDrawerOpen(open);
    };

    const getChatList = async () => axios.get(Apiconfigs.chatList, {
        headers: {
            token: sessionStorage.getItem("token"),
        },
        params: {
            page: 1,
            limit: 20
        },
    }).then(res => {
        setChatList(res.data.result);
    });


    useEffect(async () => {
        socket.emit("ping");
        getChatList();

        socket.on('connect', () => {
            setIsConnected(true);
        });

        socket.on('disconnect', () => {
            setIsConnected(false);
        });

        socket.on('notify', (msg) => {
            if (msg.onlineusers && Array.isArray(msg.onlineusers)) {
                setOnlineUsers(msg.onlineusers)
            }
        });

        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('notify');
        };
    }, []);

    return (
   <Box className='chat' >
        <Container maxWidth='xl'>
       
       <Box 
        className={classes.container}
        >
            <RemoveScrollBar/>
            {/* Start left Section *}
            
    {Mobile  && (
        <IconButton
        className={classes.menuButton}
        color="primary"
        onClick={toggleDrawer(!drawerOpen)}
      >
        <MenuIcon />
      </IconButton>
    )}
      
            <Drawer
                // className={classes.drawer}
                variant={isMobile ? "persistent" : "permanent"}
                classes={{
                    paper: classes.drawerPaper,
                  }}
                  sx={{
                    '& .MuiDrawer-root': {
                        position: 'absolute'
                    },
                    '& .MuiPaper-root': {
                        position: 'absolute'
                    },
                 
                    
                  }}
                
                // classes={{
                //     paper: classes.drawerPaper,
                // }}
                anchor="left"
                // open={chatId == 't'}
                open={isMobile ? drawerOpen : chatId === "t"}
                onClose={toggleDrawer(false)}
            >

                <List>
                    <ListItem>
                        {isConnected ?
                            <Box padding={1} fontSize={12}>🟢 Online users ({onlineUsers.length})</Box> :
                            <Box padding={1} fontSize={12}>⛔ Chat disconnected, retrying ... </Box>
                        }
                    </ListItem>
                </List>
                <Divider/>
                {/* Start Usres *}
                <List dense={true}>
                    {!chatList ? <DataLoading/> :
                        chatList.length > 0 && chatList.map((chat) => {
                            let contact = chat.users.find(c => c._id != user.userData._id);
                            let photo = contact?.profilePic ? contact?.profilePic :
                                `https://avatars.dicebear.com/api/miniavs/${contact?.userName}.svg`;

                            return (
                                <ListItem button key={chat._id} onClick={() => 
                                    {
                                    navigate('/chat/' + chat._id);
                                    toggleDrawer(false)       ;                      
                                }}>
                                    <ListItemAvatar>
                                        <Avatar alt={contact?.userName} src={photo} className={classes.avatar}/>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={contact?.userName}
                                        secondary={onlineUsers.includes(contact?._id) ? 'Online' : 'Active recently'}
                                    />
                                    <ListItemSecondaryAction style={{marginRight: '13px'}}>
                                        <Badge color="error" overlap="rectangular"
                                               badgeContent={user.unreadChats[chat._id]?.length}></Badge>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            )
                        })
                    }
                </List>
                {/* End Usres *}

            </Drawer>
            {/* End left Section *}

            {chatId == 't' ?
                <Box className={classes.main}
                     style={{justifyContent: 'center', alignContent: 'center', alignItems: 'center'}}>
                    <Typography component="h2" variant="h2" align='center'>
                        Kick start chat now! <br/> Say Hi 👊 to your MAS community
                    </Typography>
                </Box> : null}

            {!chatList ? <DataLoading/> :
                chatList.length > 0 && chatList.map((chat) => {
                    return <ChatBox
                        key={chat._id}
                        chat={chat}
                        socket={socket}
                        visible={(chat._id === chatId)}
                        isOnline={onlineUsers.includes(chat.users.find(c => c._id != user.userData?._id)?._id)}
                    />
                })
            }
        </Box>
       
       </Container>
   </Box>
       
    );
}
} */}