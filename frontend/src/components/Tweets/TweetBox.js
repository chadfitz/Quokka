function TweetBox ({ text, username }) {
  return (
    <div className="tweet">
      <h3>{username ? `${username}:` : ""} {text} </h3>
    </div>
  );
}

export default TweetBox;