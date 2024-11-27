import { useState, useEffect } from "react";

import "./info.scss";

function Info() {
    const [currentItem, setCurrentItem] = useState(0);
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
            text: "Погружение в мир вашего бизнеса начинается с детального анализа ключевых показателей эффективности и комплексного изучения бизнес-процессов. Мы проводим глубокую оценку данных, выявляем ключевые тенденции рынка, конкурентного окружения и потребительских предпочтений. Сотрудничая с ведущими отраслевыми экспертами, мы предоставляем обоснованные рекомендации и формируем персонализированные решения, которые учитывают как внутренние ресурсы компании, так и внешние рыночные факторы.",
            list: [
                "анализ рынка и конкурентов",
                "аудит показателей бизнеса и операционных решений",
                "custdev и привлечение отраслевых экспертов",
                "формирование решений на основе фактических срезов внешнего окружения",
            ],
        },
        {
            title: "Брендинговая стратегия",
            text: "Погружение в мир вашего бизнеса начинается с детального анализа ключевых показателей эффективности и комплексного изучения бизнес-процессов. Мы проводим глубокую оценку данных, выявляем ключевые тенденции рынка, конкурентного окружения и потребительских предпочтений. Сотрудничая с ведущими отраслевыми экспертами, мы предоставляем обоснованные рекомендации и формируем персонализированные решения, которые учитывают как внутренние ресурсы компании, так и внешние рыночные факторы.",
            list: [
                "анализ рынка и конкурентов",
                "аудит показателей бизнеса и операционных решений",
                "custdev и привлечение отраслевых экспертов",
                "формирование решений на основе фактических срезов внешнего окружения",
            ],
        },
    ];

    useEffect(() => {
        const handleScroll = (e) => {
            e.stopPropagation();
            e.preventDefault();
            

            if (isScrolling) return;

            const scrollThreshold = 50; // Порог чувствительности
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

            setTimeout(() => setIsScrolling(false), 500);
        };

        const infoMiddle = document.querySelector(".info__middle");
        infoMiddle.addEventListener("wheel", handleScroll);

        return () => infoMiddle.removeEventListener("wheel", handleScroll);
    }, [currentItem, infoItems.length, isScrolling]);

    return (
        <section className="info">
            <div className="container">
                <div className="info__wrapper ">
                    <div className="info__left ">
                        <div className="info__current">
                            <span>{currentItem + 1}</span>/{infoItems.length}
                        </div>
                        <div className="info__link">Посмотреть кейсы</div>
                        <a href="#projects"><div className="info__skip">пропустить</div></a>
                    </div>
                    <div className="info__middle">
                        <div className="info__middle_wrapper">
                            {infoItems.map((item, index) => (
                                <h3
                                    key={index}
                                    className={`info__item ${
                                        index === currentItem
                                            ? "active"
                                            : prevItems.includes(index)
                                            ? "previous"
                                            : "inactive"
                                    }`}
                                >
                                    {item.title}
                                </h3>
                            ))}
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
