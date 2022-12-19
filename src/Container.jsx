import { useEffect, useState } from 'react';

import './Container.scss'
import Scene from './Scene';

import rotIcon from '/rotate-solid.svg';

function Container() {

  const [count, setCount] = useState(1);

  useEffect(() => {

    function textSwap() {

      const container = document.querySelector('[data-txt="header"]');
      
      setTimeout(() => {
  
        const height = window.getComputedStyle(container.children[0]).height.slice(0, -2);
        const offset = window
        .getComputedStyle(container)
        .getPropertyValue('transform')
        .split(',')
  
        setCount(count + 1);
  
        if (!offset[5] || offset[5] === '0)') {

          container.style.transform = 'translateY(' + '-' + height + 'px)'

        } else if (count === 4) {
          
          container.style.transform = 'translateY(0)';
          setCount(1);

        } else {

          const newOffset = parseInt(offset[5].slice(0, -1)) - height
          container.style.transform = 'translateY(' + newOffset + 'px)';
          
        }
  
      }, 2000)
  
    }

    textSwap()

  }, [setCount, count])

  function handleClick(e) {

    if (!document.querySelector('.scene').contains(e.target)) return

    setTimeout(() => {

      const el = document.querySelector('[data-txt="footer"]');
      el.style.transform = 'translateY(-35px)';

    }, 3000)

  }
  
  return (

    <div className="container" onClick={handleClick}>
      
      <p>Merry</p>
      <div className="scroll">
        <div className="scroll-container" data-txt="header">
          <p>Chrysler!</p>
          <p>Crimbus!</p>
          <p>Crysis!</p>
          <p>Chrysmen!</p>
        </div>
      </div>

      <Scene />

      <div className="footer">
        <div className="footer-container" data-txt="footer">
          <p>Tap to open</p>
          <p>Drag to <img src={rotIcon} /></p>
        </div>
      </div>

    </div>

  )
}
export default Container