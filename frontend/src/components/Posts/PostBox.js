function PostBox ({ body, username }) {
  return (
    <div className="post">
      <h3>{username ? `${username}:` : ""} {body} </h3>
    </div>
  );
}

export default PostBox;
