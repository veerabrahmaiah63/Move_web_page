import React from 'react';

const Movie = ({ title, description, trailerUrl }) => {
  return (
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
      {trailerUrl && (
        <p>
          Watch the trailer <a href={'https://www.youtube.com/watch?v=4GPvYMKtrtI'} target="_blank" rel="noopener noreferrer">here</a>.
        </p>
      )}
    </div>
  );
};

export default Movie;
