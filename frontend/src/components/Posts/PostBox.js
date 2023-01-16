function PostBox ({ text, username }) {
  return (
    <div className="post">
      <h3>{username ? `${username}:` : ""} {text} </h3>
    </div>
  );
}

export default PostBox;