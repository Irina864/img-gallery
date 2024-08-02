import './Button.css';

const Button = ({ theme, src, alt, onClick }) => (
  <button className={`imagebtn ${theme}`} onClick={onClick}>
    <div className="imagebtn__imagewrap">
      <img className="imagebtn__image" src={src} alt={alt} />
    </div>
  </button>
);

export default Button;
