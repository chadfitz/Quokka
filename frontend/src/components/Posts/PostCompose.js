import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Markup } from 'interweave';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { clearPostErrors, composePost } from '../../store/posts';
import PostBox from './PostBox';
import './PostCompose.css';
import Button from '../../blocks/Button';
import Input from '../../blocks/Input';
import useInput from '../../hooks/useInput';



function PostCompose () {
  const [body, setBody] = useState('');
  const writer = useSelector(state => state.session.user);
  const [subject, handleSubjectChange] = useInput('');
  // TODO: convert recipient to props / etc. (not useState)
  const [recipient, setRecipient] = useState(1);
  const [reactions, setReactions] = useState('');
  const [images, setImages] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  // TODO: connect me to google maps api
  const [location, setLocation] = useState({
      "type" : "Point",
      "coordinates" : [
        50,
        37.7
      ]
    });

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

  const x = <div children={body.toString()}></div>;
  // TODO: connect me
  // TODO: change default state if needed
  // const [reactions, setReactions] = useState(['smile']);
  const dispatch = useDispatch();
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
      <input type="submit" value="Submit" />
      {/* <PostBox body={newPost?.body} /> */}
      <div>
        {body && <Markup content={body} />}
        {/* <div>{writer}</div> */}
      </div>
    </>


    // <>
    // <ReactQuill
    //           ref={(el) => {
    //             quillObj = el;
    //           }}
    //           value={this.state.Description}
    //           modules={{
    //             toolbar: {
    //               container: [
    //                 [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    //                 ['bold', 'italic', 'underline'],
    //                 [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    //                 [{ 'align': [] }],
    //                 ['link', 'image'],
    //                 ['clean'],
    //                 [{ 'color': [] }]
    //               ],
    //               handlers: {
    //                 image: this.imageHandler
    //               }
    //             },
    //             table: true
    //           }}
    //           placeholder="Add a description of your event"
    //           onChange={(content, delta, source, editor) => this.onDescriptionChange(content, editor)}
    //           id="txtDescription"
    //         />
    // </>
    // <>
    //   <form className="composePost" onSubmit={handleSubmit}>
    //     <ReactQuill them="snow" value={body} onChange={setBody} />
    //     {/* <ReactQuill them="snow" value={body1} onChange={setBody1} />
    //     <ReactQuill them="snow" value={body2} onChange={setBody2} /> */}
    //     {/* <input
    //       type="textarea"
    //       value={body}
    //       onChange={update}
    //       placeholder="Write your post..."
    //     /> */}
    //     <div className="errors">{errors && errors.body}</div>
    //     <input type="submit" value="Submit" />
    //   </form>
    //   <PostBox body={newPost?.body} />
    // </>
  )
}

export default PostCompose;
