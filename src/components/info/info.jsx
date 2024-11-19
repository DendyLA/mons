import { useState, useEffect } from 'react'

import './info.scss'


function Info(){
    const [ currentItem, setCurrentItem ] = useState(0);

    const infoItems = ['Аналитика рынка и аудит бизнеса', 'бизнес-стратегия', 'брендинговая стратегия']

    return(
        <section className="info">
            <div className="container">
                <div className="info__wrapper">
                    <div className="info__left">
                        <div className="info__current"><span>1</span>/7</div>
                        <div className="info__link">Посмотреть кейсы</div>
                    </div>
                    <div className="info__middle">
                        <div className="info__middle_wrapper">
                            {
                            infoItems.map((item) => (
                                <div className="info__item">{item}</div>
                            ))
                            }
                        </div>
                    </div>
                    <div className="info__right">
                        <div className="info__text">Погружение в мир вашего бизнеса начинается с детального анализа ключевых показателей эффективности и комплексного изучения бизнес-процессов. Мы проводим глубокую оценку данных, выявляем ключевые тенденции рынка, конкурентного окружения и потребительских предпочтений. Сотрудничая с ведущими отраслевыми экспертами, мы предоставляем обоснованные рекомендации и формируем персонализированные решения, которые учитывают как внутренние ресурсы компании, так и внешние рыночные факторы.</div>
                        <ul className="info__list">
                            <li className="info__list_item">анализ рынка и конкурентов</li>
                            <li className="info__list_item">аудит показателей бизнеса и операционных решений</li>
                            <li className="info__list_item">custdev и привлечение отраслевых экспертов</li>
                            <li className="info__list_item">формирование решений на основе фактических срезов внешнего окружения</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Info