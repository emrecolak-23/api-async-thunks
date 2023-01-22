import PhotosListItem from './PhotosListItem';
import Button from './Button';
import Skeleton from './Skeleton';
import { useFetchPhotosQuery, useAddPhotoMutation } from '../store';

function PhotosList({ album }) {
  const { data, isFetching, error } = useFetchPhotosQuery(album);
  const [addPhoto, addPhotoResults] = useAddPhotoMutation();

  let content;

  if (isFetching) {
    content = <Skeleton className="h-20 w-20 m-2" times={4} />;
  } else if (error) {
    content = <div>Error photos loading...</div>;
  } else {
    content = data.map((photo) => {
      return <PhotosListItem key={photo.id} photo={photo} />;
    });
  }

  const handleAddPhoto = () => {
    addPhoto(album);
  };

  useFetchPhotosQuery(album);
  return (
    <div>
      <div className="m-2 flex flex-row items-center justify-between">
        <h3 className="text-lg font-bold">Photos In {album.title}</h3>
        <Button loading={addPhotoResults.isLoading} onClick={handleAddPhoto}>
          + Add Photo
        </Button>
      </div>
      <div className="mx-8 flex flex-row items-center justify-center">
        {content}
      </div>
    </div>
  );
}

export default PhotosList;
