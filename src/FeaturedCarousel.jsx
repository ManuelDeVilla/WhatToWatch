import { useEffect, useState } from 'react';
import styles from './css/FeaturedCarousel.module.css';

export default function FeaturedCarousel() {

  const [index, setActiveIndex] = useState(0);
  const movies = [
    {
      id: 1,
      name: "Toy Story 5",
      desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quia, hic. Non, laudantium quos? Odio, nisi, quod sed cumque quis laboriosam veniam nihil ab in deserunt nesciunt atque, laborum magni harum.",
      backgroundColor: "blue"
    },
    {
      id: 2,
      name: "Fairy Tail",
      desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quia, hic. Non, laudantium quos? Odio, nisi, quod sed cumque quis laboriosam veniam nihil ab in deserunt nesciunt atque, laborum magni harum.",
      backgroundColor: "red"
    },
    {
      id: 3,
      name: "Cowboy Bepop",
      desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quia, hic. Non, laudantium quos? Odio, nisi, quod sed cumque quis laboriosam veniam nihil ab in deserunt nesciunt atque, laborum magni harum.",
      backgroundColor: "yellow"
    }
  ]

  const nextImage = () => {
    setActiveIndex(index === movies.length - 1 ? 0 : index + 1);
  }

  const prevImage = () => {
    setActiveIndex(index === 0 ? movies.length - 1 : index - 1)
  }

  useEffect(() => {
    setInterval(() => {
      // setActiveIndex(index === movies.length - 1 ? 0 : index + 1);
    }, 1000)
  }, [])

  return (
    <section className={ styles.carouselWrapper }>
      <button className={ `${styles.slider} ${styles.next}` } onClick={ prevImage }>Previous</button>
      <button className={ `${styles.slider} ${styles.prev}` } onClick={ nextImage }>Next</button>
        <ul
          className={ styles.track}
          style={{transform: `translateX(-${index * 100}%)`}}
        >
        {
        movies.map((movie) => (
          /* Is an image */
            <li className={ styles.slide }>
              <div className={ styles.image} style={{backgroundColor: movie.backgroundColor}}>Image</div>
            </li>
        ))
        }
        </ul>
    </section>
  )
}
