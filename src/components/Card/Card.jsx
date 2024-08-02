import Button from '../Button/Button';
import likeIcon from '../../images/icon-like.png';
import deleteIcon from '../../images/icon-delete.png';
import './Card.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  postFavourites,
  getFavourites,
  deleteFavourites,
  deleteImageById,
} from '../../store/imagesSlice';

function Card({ id, src, alt }) {
  const dispatch = useDispatch();
  const favourites = useSelector((state) => state.images.favourites);
  const isFavourite =
    favourites &&
    favourites.some((favImage) => {
      return favImage.image_id === id;
    });

  const handleLiked = () => {
    if (isFavourite) {
      favourites.forEach((fav) => {
        if (fav.image_id === id) {
          dispatch(deleteFavourites(fav.id))
            .unwrap()
            .then(() => {
              dispatch(getFavourites());
            })
            .catch((error) => {
              console.log(error);
            });
        }
      });
    } else {
      dispatch(postFavourites({ imageId: id, subId: 'fav99' }))
        .unwrap()
        .then(() => {
          dispatch(getFavourites());
        })
        .catch((error) => {
          console.error('Error post favourite: ', error);
        });
    }
  };

  const handleDelete = () => {
    dispatch(deleteImageById(id));
  };

  return (
    <div className="card">
      <div className="card__imageWrap">
        <img className="card__image" src={src} alt={alt} />
        <div className="card__buttons">
          <Button
            theme="delete"
            src={deleteIcon}
            alt="delete icon"
            onClick={handleDelete}
          />
          <Button
            theme={isFavourite ? 'like active' : 'like'}
            src={likeIcon}
            alt="like icon"
            onClick={handleLiked}
          />
        </div>
      </div>
      <div className="card__text">
        If you want to see this image at another window&nbsp;
        <a
          className="card__link"
          href={src}
          target="_blank"
          rel="noopener noreferrer"
        >
          click here.&nbsp;
        </a>
        Or copy:
        <div className="card__tocopy">{src}</div>
      </div>
    </div>
  );
}

export default Card;
