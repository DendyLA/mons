import './main.scss'

import {useState, useEffect} from 'react'

function Main(){


    return(
        <section className="main">
            <div className="container row">
                <div className='main__wrapper col-4 offset-4'>
                    <div className="main__text">
                        <h1 className="main__title">стратегическое <br />превосходство бренда</h1>
                        <h2 className="main__subtitle">Лаборатория стратегического бренд-консалтинга</h2>
                    </div>
                    <a href=""><div className="main__more">Узнать больше <i className="fas fa-angle-right"></i></div></a>
                </div>
            </div>
        </section>
    )
}


export default Main;