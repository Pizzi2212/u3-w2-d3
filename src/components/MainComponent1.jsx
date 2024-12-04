import React, { useEffect, useState } from 'react'
import { Row, Col, Carousel } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const FilmCarousel1 = ({ searchQuery }) => {
  const [films1, setFilms1] = useState([])

  useEffect(() => {
    if (!searchQuery) return

    fetch(`http://www.omdbapi.com/?apikey=47ad4fc&s=${searchQuery}`)
      .then((resp) => {
        if (resp.ok) {
          return resp.json()
        } else {
          throw new Error('Errore nella chiamata')
        }
      })
      .then((data) => {
        console.log('Dati della ricerca:', data)
        if (data.Search) {
          setFilms1(data.Search)
        }
      })
      .catch((e) => {
        console.error('Errore!', e)
      })
  }, [searchQuery])

  const chunks = []
  for (let i = 0; i < films1.length; i += 6) {
    chunks.push(films1.slice(i, i + 6))
  }

  return (
    <div className="bg-container">
      <h1 className="text-white text-start">
        Risultati della ricerca per "{searchQuery}"
      </h1>
      <Carousel interval={null}>
        {chunks.map((chunk, index) => (
          <Carousel.Item key={index}>
            <Row>
              {chunk.map((film) => (
                <Col
                  key={film.imdbID}
                  xs={6}
                  sm={4}
                  md={3}
                  lg={2}
                  className="mb-4"
                >
                  <Link
                    to={{
                      pathname: `/details/${film.imdbID}`,
                      state: { film },
                    }}
                  >
                    <img
                      className="img-fluid custom-image"
                      src={film.Poster}
                      alt={`Poster di ${film.Title}`}
                      style={{ objectFit: 'cover' }}
                    />
                  </Link>
                </Col>
              ))}
            </Row>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  )
}

export default FilmCarousel1
