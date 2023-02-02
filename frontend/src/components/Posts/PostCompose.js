import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Button from '../../blocks/Button';
import Input from '../../blocks/Input';
import useInput from '../../hooks/useInput';
import { clearPostErrors, composePost, fetchUserPosts, updatePost } from '../../store/posts';
import { fetchUsers } from '../../store/users';
import { fetchFriends } from '../../store/friends';
import './PostCompose.css';
import MapCoordinates from '../GoogleMap/EvgeniiMap';

function PostCompose () {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);
  const writer = useSelector(state => state.session.user);
  let { postId } = useParams();
  let post = useSelector(store => {
    return Object.values(store.posts.all).find(obj => obj._id === postId);
  })
  const [images, setImages] = useState([]);
  const [, setImageUrls] = useState([]);
  const [lat, setLat] = useState(37.776392)
  const [lng, setLng] = useState(-122.4194)
  const friends = useSelector(state => state.friends);
  const currentUser = useSelector(state => state.session.user);
  const badRecipient = useSelector(state => state.posts.user[0]?.recipient._id)
  const oldPosts = useSelector(state => Object.values(state.posts.user));

  const [showCreate, setShowCreate] = useState(true);
  const [timeDifference, setTimeDifference] = useState(null);

  useEffect(()=> {
    dispatch(fetchUsers());
    dispatch(fetchFriends(currentUser));
    dispatch(fetchUserPosts(currentUser._id));
  }, [dispatch, currentUser])

  // ----- update math + hour/day logic for creation timeout here -----
  useEffect(()=>{
    if (oldPosts[0]) {
      const postCreationTime = new Date(oldPosts[0].createdAt);
      const currentTime = new Date();
      const difference = (currentTime - postCreationTime)/(1000*60)
      if (difference >= 5) {
        setShowCreate(true)
      } else {
        setShowCreate(false)
        setTimeDifference(5 - difference)
      }
    }
  },[oldPosts])

  const findFriend= () => {
    const almostAllFriends = []
    if (!Object.values(friends).length) return null
    Object.values(friends).forEach(friend => {
      if (friend._id !== badRecipient) almostAllFriends.push(friend)
    })
    return almostAllFriends
  }


  const updateFiles = async e => {
    const files = e.target.files;
    setImages(files);
    if (files.length !== 0) {
      let filesLoaded = 0;
      const urls = [];
      Array.from(files).forEach((file, index) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
          urls[index] = fileReader.result;
          if (++filesLoaded === files.length)
            setImageUrls(urls);
        }
      });
    }
    else setImageUrls([]);
  }

  const formType = postId ? 'Update' : 'Create';
  if (formType === 'Create') {
    post = {
      writer,
      //,
      images,
      location: {
        "type": "Point",
        "coordinates": [
          lng,
          lat
        ]
      },
      subject: "",
      body: ""
    }
  }


  const [subject, handleSubjectChange] = useInput(post.subject);
  const [body, setBody] = useState(post.body);
  const [recipient, setRecipient] = useState("");
  const errors = useSelector(state => state.errors.posts);
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['clean']
    ],
  };
  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent'
  ];

  const handleSubmit = async e => {
    e.preventDefault();
    if (!sessionUser) history.push('/login');
    if (friendsError) return <></>

    if (formType === 'Create'){
      post = {
        writer,
        recipient,
        location: {
          "type": "Point",
          "coordinates": [
            lng,
            lat
          ]
        },
        images,
        subject,
        body
      }

      await dispatch(composePost(post));
      history.push("/posts")
    } else {
      post = { ...post,
                writer,
                recipient,
                location: {
                  "type": "Point",
                  "coordinates": [
                    lng,
                    lat
                  ]
                },
                subject,
                images,
                body
              }
      dispatch(updatePost(post));
      history.push("/posts")
    }

    // TODO: CLEAR OTHER FIELDS (not just body)?
    setBody('');
  };


  useEffect(() => {
    return () => dispatch(clearPostErrors());
  }, [dispatch]);

  let friendsError;
  if (Object.entries(friends).length === 0 ) {
    history.push('/users')
    // friendsError = "You won't be able to write a message until you add friends."
  }

  return (
    <div className='whole-page-styling'>
      <div className='inner-page-styling'>
        <div className='compose-container'>
          {showCreate && (
          <>
          <div className="compose-top">
            <div className="text-editor">
              {friendsError}
              <div className='top-of-compose-post'>
                <div className='compose-heading'>
                  <h3>Compose Post to </h3> <label htmlFor={recipient}></label>
                    <select name="recipient" id="recipient" required onChange={e => setRecipient(e.target.value)}>
                      <option disabled selected>recipient</option>
                      {findFriend()?.map((friend, index) => {
                        return <option key={index} value={friend._id}>{friend.username}</option>
                      })}
                    </select>
                </div>
                <div className='upload-images'>
                    <label>
                    Images to Upload</label>
                    <input
                      type="file"
                      accept=".jpg, .jpeg, .png"
                      multiple
                      onChange={updateFiles}
                      id="choose-files"
                    />
                </div>
              </div>
              <Input
                className="post-subject"
                type="text"
                value={subject}
                onChange={handleSubjectChange}
                placeholder="Subject"
                required
                id="subject-compose"
              />
              <div className='quill-editor-compose'>
                <ReactQuill theme="snow"
                            modules={modules}
                            formats={formats}
                            value={body}
                            onChange={setBody}
                            id="reactquill">

                </ReactQuill>
              </div>
              <div className='compose-map'>
                <MapCoordinates id="compose-map" lat={lat} setLat = {setLat} lng={lng} setLng={setLng} center={{lat: 37.776392, lng: -122.4194} }/>
                <div id='choose-your-location'>
                  Click on the map to choose your location
                </div>
              </div>
              <div className='submit-compose-buttons'>
                <Button
                  containername="submit-btn-ctnr"
                  className="submit-btn"
                  label="Submit Post"
                  onClick={handleSubmit}
                />
              </div>
            </div>
          </div>
          <div className='compose-bottom'>
            <div className="errors">{errors && errors.body}</div>
          </div>
        </>
        )}
        {!showCreate && (
        <div className='compose-too-soon'>
          <h1>
            Please wait {Math.round(timeDifference)} more minutes until your next post.
          </h1>
          <p>
            DISCLAIMER: The intended time-out period longer is longer than 5 minutes.
            It has been shortened to 5 minutes to enable smooth user experience for all who wish
            to navigate Quokka via the demo-user.
          </p>
        </div>
        )}
        </div>
      </div>
    </div>
  )
}

export default PostCompose;
