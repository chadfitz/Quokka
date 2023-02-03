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

function PostEdit () {
  const [images, setImages] = useState([]);
  const [, setImageUrls] = useState([]);

  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);
  const writer = useSelector(state => state.session.user);
  const { postId } = useParams();

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


  let post = useSelector(store => {
    return Object.values(store.posts.all).find(obj => obj._id === postId);
  })

//   const formType = postId ? 'Update' : 'Create';
//   if (formType === 'Create') {
//     post = {
//       writer,
//       recipient: writer,
//       images,
//       location: {
//         "type": "Point",
//         "coordinates": [
//           lng,
//           lat
//         ]
//       },
//       subject: "",
//       body: ""
//     }
//   }
  const [subject, handleSubjectChange] = useInput(post.subject);
  const [body, setBody] = useState(post.body);
  // TODO: convert recipient to props / etc. (not useState)
  const [recipient, setRecipient] = useState(post.recipient);
  // TODO: connect me to google maps api
  const [location,] = useState(post.location);
   const [lat, setLat] = useState(location.coordinates[1])
  const [lng, setLng] = useState(location.coordinates[0])
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

     useEffect(()=>{
    console.log('search for this')
    console.log('recipient', recipient)
    console.log('subject', subject)
    console.log('body', body)
   }, [recipient, subject, body])


  const handleSubmit = async e => {
    e.preventDefault();
    if (!sessionUser) history.push('/login');

       // Error Handling
    if (recipient === "") return <></>
    if (subject === "") return <></>
    if (body === "<p><br></p>" ) return <></>

      // TODO: Update path to go to posts#show (instead of #index)
      // if (newPost._id) history.push(`/posts`);
      post = { _id: postId,
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
      // dispatch(updatePost(post))
      dispatch(updatePost(post))
      .then(history.push("/posts?update"))

    }
    // TODO: CLEAR OTHER FIELDS (not just body)?
    // setBody('');


  useEffect(() => {
    return () => dispatch(clearPostErrors());
  }, [dispatch]);

  return (
     <div className='whole-page-styling'>
      <div className='inner-page-styling'>
        <div className='compose-container'>
          <div className="compose-top">
            <div className="text-editor">
                <div className='top-of-compose-post'>
                  <div className='compose-heading'>
                    <h3>Edit Your Post</h3>
                  </div>
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
                </div>
                <Input
                  // label="Subject"
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
                  <MapCoordinates lat={lat} setLat = {setLat} lng={lng} setLng={setLng} center={{lat: lat, lng: lng}}/>
                  <div id='choose-your-location'>
                    Click on the map to choose your location
                  </div>
                </div>
              <div className='submit-compose-buttons'>
                <Button
                    containername="submit-btn-ctnr"
                    className="submit-btn"
                    label="Update Post"
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

export default PostEdit;
