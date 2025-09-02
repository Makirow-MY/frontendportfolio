const { useState } = require("react");

  const TruncatedParagraph = ({ text, wordLimit, url, margin = '3rem' }) => {
  const [isTruncated, setIsTruncated] = useState(true);

  const toggleTruncate = () => {
    setIsTruncated(!isTruncated);
  };

  const truncatedText = isTruncated ? text.split(' ').slice(0, wordLimit).join(' ') + '' : text;

  return (
    <>
    <p className="sp__hero-subtitle" style={{color: '#ffffff', marginLeft: margin}} onClick={toggleTruncate}>
      {truncatedText} 
    </p>
    <a href={url} style={{color: 'var(--main-site-color)', fontWeight:'600', cursor:'pointer'}}  className="seemore">See More</a>
    </>
    
  );
};

export default TruncatedParagraph;
