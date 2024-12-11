import { useState, useEffect, useCallback } from "react";
import "./info.scss";

function Info({ currentItem, setCurrentItem, currentSection }) {
    // const [currentItem, setCurrentItem] = useState(0);
    const [prevItems, setPrevItems] = useState([]);
    const [isScrolling, setIsScrolling] = useState(false);
    
    const infoItems = [
        {
            title: "Аналитика рынка и аудит бизнеса",
            text: "Погружение в мир вашего бизнеса начинается с детального анализа ключевых показателей эффективности и комплексного изучения бизнес-процессов. Мы проводим глубокую оценку данных, выявляем ключевые тенденции рынка, конкурентного окружения и потребительских предпочтений. Сотрудничая с ведущими отраслевыми экспертами, мы предоставляем обоснованные рекомендации и формируем персонализированные решения, которые учитывают как внутренние ресурсы компании, так и внешние рыночные факторы.",
            list: [
                "анализ рынка и конкурентов",
                "аудит показателей бизнеса и операционных решений",
                "custdev и привлечение отраслевых экспертов",
                "формирование решений на основе фактических срезов внешнего окружения",
            ],
        },
        {
            title: "Бизнес-стратегия",
            text: "Разработка бизнес-стратегии помогает вам выстроить план достижения целей и успеха в условиях конкуренции. Мы предоставляем глубокий анализ, включая как внутренние, так и внешние факторы, а также помогаем создать действенные стратегии для достижения ваших целей.",
            list: [
                "выработка стратегического плана",
                "анализ и оценка внешних факторов",
                "инновации и конкурентное преимущество",
                "планирование на основе данных",
            ],
        },
        {
            title: "Брендинговая стратегия",
            text: "Построение сильного бренда важно для установления доверительных отношений с клиентами. Мы разрабатываем персонализированные стратегии, которые помогут вашему бренду выделиться на рынке и закрепиться в сознании вашей аудитории.",
            list: [
                "создание уникального имиджа бренда",
                "разработка фирменного стиля",
                "позиционирование на рынке",
                "работа с целевой аудиторией",
            ],
        },
    ];

    //work code

    // useEffect(() => {
    //     const handleScroll = (e) => {
    //         e.stopPropagation();
    //         e.preventDefault();

    //         if (isScrolling) return;

    //         const scrollThreshold = 50; // Порог чувствительности
    //         if (e.deltaY > scrollThreshold && currentItem < infoItems.length - 1) {
    //             setPrevItems((prev) =>
    //                 prev.includes(currentItem) ? prev : [...prev, currentItem]
    //             );
    //             setCurrentItem((prev) => prev + 1);
    //             setIsScrolling(true);
    //         } else if (e.deltaY < -scrollThreshold && currentItem > 0) {
    //             setPrevItems((prev) =>
    //                 prev.filter((item) => item !== currentItem - 1)
    //             );
    //             setCurrentItem((prev) => prev - 1);
    //             setIsScrolling(true);
    //         }

    //         setTimeout(() => setIsScrolling(false), 500);
    //     };
    //     console.log(currentItem)
    //     const infoMiddle = document.querySelector(".info__middle");
    //     infoMiddle.addEventListener("wheel", handleScroll);

    //     return () => infoMiddle.removeEventListener("wheel", handleScroll);
    // }, [currentItem, infoItems.length, isScrolling]);


    //test code

    useEffect(() => {
        const handleScroll = (e) => {
            e.preventDefault();
            e.stopPropagation();
    
            // Не разрешаем прокрутку, если уже идет прокрутка
            if (isScrolling) return;
    
            const scrollThreshold = 50; // Порог чувствительности
    
            if (currentItem === 0) {
                // Разрешаем прокрутку только вниз
                if (e.deltaY > scrollThreshold && currentItem < infoItems.length - 1) {
                    setPrevItems((prev) =>
                        prev.includes(currentItem) ? prev : [...prev, currentItem]
                    );
                    setCurrentItem((prev) => prev + 1);
                    setIsScrolling(true);
                } else if (e.deltaY < -scrollThreshold) {
                    // Если прокрутка вверх, убираем обработчик с .info и прокрутка будет происходить на родителе
                    document.querySelector('.info').removeEventListener('wheel', handleScroll);
                    return;
                }
            } else if (currentItem === 1) {
                // Разрешаем прокрутку как вниз, так и вверх
                if (e.deltaY > scrollThreshold && currentItem < infoItems.length - 1) {
                    setPrevItems((prev) =>
                        prev.includes(currentItem) ? prev : [...prev, currentItem]
                    );
                    setCurrentItem((prev) => prev + 1);
                    setIsScrolling(true);
                } else if (e.deltaY < -scrollThreshold && currentItem > 0) {
                    setPrevItems((prev) =>
                        prev.filter((item) => item !== currentItem - 1)
                    );
                    setCurrentItem((prev) => prev - 1);
                    setIsScrolling(true);
                }
            } else if (currentItem === 2) {
                // Разрешаем прокрутку только вверх
                if (e.deltaY < -scrollThreshold && currentItem > 0) {
                    setPrevItems((prev) =>
                        prev.filter((item) => item !== currentItem - 1)
                    );
                    setCurrentItem((prev) => prev - 1);
                    setIsScrolling(true);
                } else if (e.deltaY > scrollThreshold) {
                    // Если прокрутка вниз, убираем обработчик с .info и прокрутка будет происходить на родителе
                    document.querySelector('.info').removeEventListener('wheel', handleScroll);
                    return;
                }
            }
    
            // Сбрасываем флаг прокрутки через 500мс
            setTimeout(() => setIsScrolling(false), 500);
        };
    
        const info = document.querySelector(".info");
    
        // Проверяем, что текущий элемент на экране
        if (info) {
            // Добавляем обработчик только если currentItem == 0 или 1
            if (currentItem === 0 || currentItem === 1) {
                info.addEventListener("wheel", handleScroll);
            } else if (currentItem === 2) {
                // В случае currentItem === 2, добавляем обработчик для прокрутки вверх
                info.addEventListener("wheel", handleScroll);
            } else {
                // Убираем обработчик, если currentItem не равен 0, 1 или 2
                info.removeEventListener("wheel", handleScroll);
            }
        }
    
        // Убираем обработчик при размонтировании компонента или изменении currentItem
        return () => {
            if (info) {
                info.removeEventListener("wheel", handleScroll);
            }
        };
    }, [currentItem, infoItems.length, isScrolling, currentSection]);
    

    

    
    return (
        <section className="info">
            <div className="container">
                <div className="info__wrapper">
                    <div className="info__left">
                        <div className="info__current">
                            <span>{currentItem + 1}</span>/{infoItems.length}
                        </div>
                        <div className="info__link">Посмотреть кейсы</div>
                        <a href="">
                            <div className="info__skip">пропустить</div>
                        </a>
                    </div>
                    <div className="info__middle">
                        <div className="info__middle_wrapper">
                            {infoItems.map((item, index) => {
                                let className = "info__item";

                                if (index < currentItem) {
                                    className += " previous";
                                } else if (index === currentItem) {
                                    className += " active";
                                } else if (index === currentItem + 1) {
                                    className += " inactive";
                                } else if (index === currentItem + 2) {
                                    className += " upcoming";
                                } else {
                                    className += " last";
                                }

                                return (
                                    <h3 key={index} className={className}>
                                        {item.title}
                                    </h3>
                                );
                            })}
                        </div>
                    </div>
                    <div className="info__right">
                        {infoItems.map((item, index) => (
                            <div
                                key={index}
                                className={`info__right_item ${
                                    index === currentItem
                                        ? "fade-in-up"
                                        : "fade-out-down"
                                }`}
                            >
                                <div className="info__text">{item.text}</div>
                                <ul className="info__list">
                                    {item.list.map((listItem, idx) => (
                                        <li key={idx} className="info__list_item">
                                            {listItem}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Info;
