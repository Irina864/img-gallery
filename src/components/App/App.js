import Button from '../Button/Button';
import Card from '../Card/Card';
import Loading from '../Loading/Loading';
import filterIcon from '../../images/icon-filter.png';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { getData, getFavourites } from '../../store/imagesSlice';
import { useState, useEffect } from 'react';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getData());
    dispatch(getFavourites());
  }, [dispatch]);

  const { data, isLoading, favourites } = useSelector(({ images }) => images);

  const [showFavoirites, setShowFavoirites] = useState(false);
  const handleFilter = () => {
    setShowFavoirites(!showFavoirites);
  };

  return isLoading ? (
    <Loading />
  ) : (
    <div className="App">
      <header className="App__header">
        <Button
          theme={showFavoirites ? 'filter active' : 'filter'}
          src={filterIcon}
          alt="filter icon"
          onClick={handleFilter}
        />
      </header>
      <main className="App__main">
        {showFavoirites
          ? favourites.map((favourite) => (
              <Card
                key={favourite.id}
                favId={favourite.id}
                src={favourite.image.url}
                id={favourite.image.id}
                alt="fav cat image"
              />
            ))
          : data.map(({ id, url }) => (
              <Card key={id} id={id} src={url} alt="cat image" />
            ))}
      </main>
    </div>
  );
}

export default App;
