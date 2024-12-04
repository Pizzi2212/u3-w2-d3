import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const Details = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const film = location.state?.film

  if (!film) {
    return (
      <div>
        <p className="text-light">
          Errore: Nessun dato disponibile. Torna indietro.
        </p>
      </div>
    )
  }

  return (
    <div className="details-container">
      <button onClick={() => navigate(-1)} className="btn btn-primary mb-4">
        Torna indietro
      </button>
      <div className="row">
        <div className="col-md-4">
          <img
            src={film.Poster}
            alt={`Poster di ${film.Title}`}
            className="img-fluid"
          />
        </div>
        <div className="col-md-8">
          <h1>{film.Title}</h1>
          <p>
            <strong>Anno:</strong> {film.Year}
          </p>
          <p>
            <strong>Genere:</strong> {film.Type}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Details
