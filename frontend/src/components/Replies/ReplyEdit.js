import React from 'react'
import useInput from '../../hooks/useInput';
import { updateReply } from '../../store/replies';
import Button from '../../blocks/Button';
import { useDispatch } from 'react-redux';


function ReplyEdit({reply, setEdit }) {
    const dispatch = useDispatch()
    const [replyChange, setReplyChange] = useInput(reply.body);

     
    const handleEdit = (e) => {
        e.preventDefault();
        dispatch(updateReply({
        replyId: reply._id,
        body: replyChange
        }));
        setEdit(false)
        // toggleEdit(e);
    }
  return (
    <div className='replies-show'>
                <textarea label=""
                  id="reply-input"
                  className="reply-input"
                  value={replyChange}
                  onChange={setReplyChange}
                  wrap="hard"
                  rows="2"
                />
                <Button className="reply-btn" id="reply-btn" label="Update"
                  type="submit" onClick={handleEdit}/>
            </div>
  )
}

export default ReplyEdit