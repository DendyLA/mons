import { useState, useEffect } from 'react'

import './info.scss'


function Info(){
    const [ currentItem, setCurrentItem ] = useState(0);
    const [prevItems, setPrevItems] = useState([]);
    const [isScrolling, setIsScrolling] = useState(false);

    const infoItems = ['Аналитика рынка и аудит бизнеса', 'бизнес-стратегия', 'брендинговая стратегия']

    useEffect(() => {
        const handleScroll = (e) => {
            e.stopPropagation();
            e.preventDefault();

            if (isScrolling) return; // Блокировка повторного вызова

            const scrollThreshold = 50; // Порог чувствительности к скроллу
            if (e.deltaY > scrollThreshold && currentItem < infoItems.length - 1) {
                // Переход вниз
                setPrevItems((prev) =>
                    prev.includes(currentItem) ? prev : [...prev, currentItem]
                );
                setCurrentItem((prev) => prev + 1);
                setIsScrolling(true);
            } else if (e.deltaY < -scrollThreshold && currentItem > 0) {
                // Переход вверх
                setPrevItems((prev) =>
                    prev.filter((item) => item !== currentItem - 1)
                );
                setCurrentItem((prev) => prev - 1);
                setIsScrolling(true);
            }

            setTimeout(() => setIsScrolling(false), 500); // Сброс блокировки через 500 мс
        };

        const infoMiddle = document.querySelector(".info__middle");
        infoMiddle.addEventListener("wheel", handleScroll);

        return () => infoMiddle.removeEventListener("wheel", handleScroll);
    }, [currentItem, infoItems.length, isScrolling]);


    return(
        <section className="info">
            <div className="container">
                <div className="info__wrapper">
                    <div className="info__left">
                        <div className="info__current"><span>{currentItem + 1}</span>/7</div>
                        <div className="info__link">Посмотреть кейсы</div>
                    </div>
                    <div className="info__middle">
                        <div className="info__middle_wrapper">
                            {infoItems.map((item, index) => (
                                <div
                                    key={index}
                                    className={`info__item ${
                                        index === currentItem
                                            ? 'active'
                                            : prevItems.includes(index)
                                            ? 'previous'
                                            : 'inactive'
                                    }`}
                                >
                                    {item}
                                </div>
                            ))}
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