import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Markup } from 'interweave';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { clearPostErrors, composePost, updatePost } from '../../store/posts';
import PostBox from './PostBox';
import './PostCompose.css';
import Button from '../../blocks/Button';
import Input from '../../blocks/Input';
import useInput from '../../hooks/useInput';
import { useHistory, useParams } from 'react-router-dom';
import Map from '../GoogleMap/Map.js (NOT USED)';
import MapCoordinates from '../GoogleMap/EvgeniiMap';

function PostCompose () {
  // const [body, setBody] = useState('');
  // const writer = useSelector(state => state.session.user);
  // const [subject, handleSubjectChange] = useInput('');
  // TODO: convert recipient to props / etc. (not useState)
  // const [recipient, setRecipient] = useState(1);
  const [reactions, setReactions] = useState('');
  const [images, setImages] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [lat, setLat] = useState(37.776392)
  const [lng, setLng] = useState(-122.4194)
  // const getCoordinates = () => {
  //   console.log("IN PARENT")
  // }

  // TODO: connect me to google maps api
  // const [location, setLocation] = useState({
    //   "type" : "Point",
    //   "coordinates" : [
    //     50,
    //     37.7
    //   ]
    // });

    console.log(lat)
    console.log(lng)

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

  // const x = <div children={body.toString()}></div>;
  // TODO: connect me
  // TODO: change default state if needed
  // const [reactions, setReactions] = useState(['smile']);
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);
  const writer = useSelector(state => state.session.user);
  let { postId } = useParams();
  let post = useSelector(store => {
    return Object.values(store.posts.all).find(obj => obj._id === postId);
  })

  const formType = postId ? 'Update' : 'Create';
  if (formType === 'Create') {
    post = {
      writer,
      recipient: writer,
      location: {
        "type": "Point",
        "coordinates": [
          50,
          37.7
        ]
      },
      subject: "",
      body: ""
    }
  }
  const [subject, handleSubjectChange] = useInput(post.subject);
  const [body, setBody] = useState(post.body);
  // TODO: convert recipient to props / etc. (not useState)
  const [recipient, setRecipient] = useState(post.recipient);
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

  // const handleSubmit = async e => {
  //   e.preventDefault();
  //   if (!sessionUser) history.push('/login');

  //   if (formType === 'Create'){
  //     post = {writer, recipient, location, subject, body}
  //     // TODO - add redirect functionality
  //     // example:
  //     const newPost = await dispatch(composePost(post));
  //     // TODO: Update path to go to posts#show (instead of #index)
  //     // if (newPost._id) history.push(`/posts`);
  //   } else {
  //     post = { ...post, writer, recipient, location, subject, body}
  //     // dispatch(updatePost(post))
  //     dispatch(updatePost({ ...post, writer, recipient, location, subject, body}));
  //       // .then(history.push(`/posts`));
  //     // TODO: UNCOMMENT ME WHEN POST SHOW IS COMPLETE
  //       // .then(history.push(`/posts/${postId}`));
  //   }

  //   // TODO: CLEAR OTHER FIELDS (not just body)?
  //   setBody('');
  // };


  // useEffect(()=>{
  //   if (postId) dispatch(**fetchpost**)
  // },[dispatch, postId])

  useEffect(() => {
    return () => dispatch(clearPostErrors());
  }, [dispatch]);

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(composePost({
      writer,
      recipient: writer,
      location,
      images,
      subject,
      body,}));
      // reactions
    setBody('');
    setImages([]);
    setImageUrls([]);
  };

  return (
    <>
      <div className="text-editor">
        <Input
          label="Subject"
          className="post-subject"
          type="text"
          value={subject}
          onChange={handleSubjectChange}
          placeholder="Subject"
          required
        />
        <ReactQuill theme="snow"
                    modules={modules}
                    formats={formats}
                    value={body}
                    onChange={setBody}>
        </ReactQuill>
      </div>
      <div className="errors">{errors && errors.body}</div>
      <Button
        containername="submit-btn-ctnr"
        className="submit-btn"
        label="Submit Post"
        onClick={handleSubmit}
      />
        <label>
          Images to Upload
          <input
            type="file"
            accept=".jpg, .jpeg, .png"
            multiple
            onChange={updateFiles} />
        </label>
      {/* <PostBox body={newPost?.body} /> */}
      <MapCoordinates lat={lat} setLat = {setLat} lng={lng} setLng={setLng}/>
      <div>
        {body && <Markup content={body} />}
        {/* <div>{writer}</div> */}
      </div>
    </>
  )
}

export default PostCompose;
