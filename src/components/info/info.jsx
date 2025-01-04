import { useState, useEffect } from "react";
import "./info.scss";

function Info({ currentItem, setCurrentItem, currentSection }) {
    const [isScrolling, setIsScrolling] = useState(false); // Для блокировки прокрутки
    const [isAnimationInProgress, setIsAnimationInProgress] = useState(false); // Для отслеживания состояния анимации

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

    useEffect(() => {
        const handleScroll = (e) => {
            if (isScrolling || isAnimationInProgress) return;

            e.preventDefault();

            // Порог для трекпадов и обычных мышей
            const scrollThreshold = Math.abs(e.deltaY) > 20 ? 20 : 3;

            if (Math.abs(e.deltaY) > scrollThreshold) {
                setIsScrolling(true);
                setIsAnimationInProgress(true);

                setCurrentItem((prev) => {
                    if (e.deltaY > 0) {
                        // Прокрутка вниз
                        return (prev + 1) % infoItems.length;
                    } else {
                        // Прокрутка вверх
                        return (prev - 1 + infoItems.length) % infoItems.length;
                    }
                });

                setTimeout(() => {
                    setIsScrolling(false);
                    setIsAnimationInProgress(false);
                }, 1500); // Длительность блокировки на время анимации
            }
        };

        const info = document.querySelector(".info");

        if (info) {
            info.addEventListener("wheel", handleScroll, { passive: false });
        }

        return () => {
            if (info) {
                info.removeEventListener("wheel", handleScroll);
            }
        };
    }, [currentItem, isScrolling, isAnimationInProgress]);

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
