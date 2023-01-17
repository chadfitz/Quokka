import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
  const writer = useSelector(state => state.session.user._id);
  const [subject, handleSubjectChange] = useInput('');
  // TODO: convert recipient to props / etc. (not useState)
  const [recipient, setRecipient] = useState(1);
  // TODO: connect me to google maps api
  const [location, setLocation] = useState({
      "type" : "Point",
      "coordinates" : [
        -122.5,
        37.7
      ]
    });
  // TODO: connect me
  // TODO: change default state if needed
  // const [reactions, setReactions] = useState(['smile']);
  // const [body1, setBody1] = useState('');
  // const [body2, setBody2] = useState('');
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
  // const modules = {
  //   toolbar: {
  //     container: [
  //       [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  //       ['bold', 'italic', 'underline'],
  //       [{ 'list': 'ordered' }, { 'list': 'bullet' }],
  //       [{ 'align': [] }],
  //       ['link', 'image'],
  //       ['clean'],
  //       [{ 'color': [] }]
  //     ],
  //     handlers: {
  //       image: this.imageHandler
  //     }
  //   },
  //   table: true
  // }

  useEffect(() => {
    return () => dispatch(clearPostErrors());
  }, [dispatch]);

  const handleSubmit = e => {
    //
    console.log('writer');
    console.log(writer);
    e.preventDefault();
    console.log('body');
    console.log(body);
    console.log('newPost - before');
    console.log(newPost);
    //

    dispatch(composePost({
      writer, recipient,
      location,
      subject, body, }));
      // reactions }));
    setBody('');

    //
    console.log('newPost - after');
    console.log(newPost);
    //

  };

  // const update = e => setBody(e.currentTarget.value);

  console.log('body');
  console.log(body);

  // let quillObj;

  // const imageHandler = () => async dispatch => {
  //   const input = document.createElement('input');

  //   input.setAttribute('type', 'file');
  //   input.setAttribute('accept', 'image/*');
  //   input.click();

  //   input.onchange = async () => {
  //     var file = input.files[0];
  //     var formData = new FormData();

  //     formData.append('image', file);

  //     var fileName = file.name;

  //     const res = await this.uploadFiles(file, fileName, quillObj);
  //   };
  // }



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
      <input type="submit" value="Submit" />
      <PostBox body={newPost?.body} />
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
