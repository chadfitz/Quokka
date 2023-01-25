import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Markup } from 'interweave';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { clearPostErrors, composePost, updatePost } from '../../store/posts';
import PostBox from '../Posts/PostBox';
import './PostCompose.css';
import Button from '../../blocks/Button';
import Input from '../../blocks/Input';
import useInput from '../../hooks/useInput';
import { useHistory, useParams } from 'react-router-dom';
import Map from '../GoogleMap/Map.js (NOT USED)';
import MapCoordinates from '../GoogleMap/EvgeniiMap';
import { fetchUsers } from '../../store/users';
import { fetchFriends } from '../../store/friends';


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


  useEffect(()=> {
    dispatch(fetchUsers());
    dispatch(fetchFriends(currentUser))
  }, [])

  const findFriend= () => {
    const almostAllFriends = []
    if (!Object.values(friends).length) return null
    Object.values(friends).map(friend => {
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
  // TODO: convert recipient to props / etc. (not useState)
  const [recipient, setRecipient] = useState("");
  // TODO: connect me to google maps api
  const [location, setLocation] = useState(post.location);
  const newPost = useSelector(state => state.posts.new);
  const errors = useSelector(state => state.errors.posts);
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  };
  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ];

  const handleSubmit = async e => {
    e.preventDefault();
    if (!sessionUser) history.push('/login');

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

      const newPost = await dispatch(composePost(post));
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

  // const changeRecipient = (friend) => {
  //   setRecipient(friend._id)
  // }

  return (
    // <div className='compose-window'>
    <div className='whole-page-styling'>
      <div className='inner-page-styling'>
        <div className='compose-container'>
          <div className="compose-top">
            <div className='compose-map'>
              <MapCoordinates lat={lat} setLat = {setLat} lng={lng} setLng={setLng} center={{lat: 37.776392, lng: -122.4194} }/>
              <div id='choose-your-location'>
                Click on the map to choose your location
              </div>
            </div>
            <div className="text-editor">
                <div className='compose-heading'>
                  <h2>Compose Post to </h2> <label htmlFor={recipient}></label>
                    <select name="recipient" id="recipient" required onChange={e => setRecipient(e.target.value)}>
                      <option disabled selected>recipient</option>
                      {findFriend()?.map((friend, index) => {
                        return <option key={index} value={friend._id}>{friend.username}</option>
                      })}
                    </select>
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
                  <div className='submit-compose-buttons'>
                    <div className='upload-images'>
                    <label>
                    Images to Upload</label>
                    <input
                    type="file"
                    accept=".jpg, .jpeg, .png"
                    multiple
                    onChange={updateFiles}
                    id="choose-files" />
                    </div>
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
        </div>
      </div>
    </div>
  )
}

export default PostCompose;


