import {useState, useEffect} from 'react'

import Header from './components/header/header'
import Main from './components/main/main'
import SubMain from './components/subMain/subMain'
import Info from './components/info/info'
import Projects from './components/projects/projects'
import Team from './components/team/team'

import './App.css'

function App() {

	const [currentSection, setCurrentSection] = useState(0); // Индекс текущей секции
	const [isScrolling, setIsScrolling] = useState(false); // Флаг для блокировки
	const [visibleSection, setVisibleSection] = useState(null); // Для задержки отображения контента

  // Массив секций с несколькими контентами для каждой
	const sections = [
		{
		className: "view__one",
		content: [
			<Main />
		],
		},
		{
		className: "view__two",
		content: [
			<SubMain />
		],
		},
		{
		className: "view__three",
		content: [
			<Info />
		]
		},
		{
		className: "view__four",
		content: [
			(
				<div className="projects">
					<div className="container">
						<div className="projects__wrapper">
							<div className="projects__first">
								<h2 className="projects__title" id='projects'>наши кейсы</h2>
							</div>
						</div>
					</div>
				</div>
			)
		]
		},
		{
		className: "view__five",
		content: [
			<Projects />
		]
		}
		,
		{
		className: "view__six",
		content: [
			<section className="team">
				<div className="container">
					<div className="team__wrapper row">
						<h3 className="team__title col-4 offset-4">Познакомьтесь с нашей командой </h3>
					</div>
				</div>
			</section>
		]
		},
		{
		className: "view__seven",
		content: [
			<Team />
		]
		}
		//add here
	];

	const handleWheel = (e) => {
		if (!isScrolling) {
			setIsScrolling(true);
		
			if (e.deltaY > 0) {
				// Прокрутка вниз: переходим к следующей секции, если есть
				setCurrentSection((prev) => Math.min(prev + 1, sections.length - 1));
			} else {
				// Прокрутка вверх: возвращаемся к предыдущей секции, если есть
				setCurrentSection((prev) => Math.max(prev - 1, 0));
			}
	
			// Снимаем блокировку через 1 секунду
			setTimeout(() => {
				setIsScrolling(false);
			}, 1000);
		}
	};

	//scroll effect
	useEffect(() => {
		const wrapper = document.querySelector(".page__wrapper");
		wrapper.addEventListener("wheel", handleWheel);
	
		return () => {
			wrapper.removeEventListener("wheel", handleWheel);
		};
	  }, [isScrolling]); // Добавлен `isScrolling` в зависимости

	//появление content__wrapper
	useEffect(() => {
	// Устанавливаем задержку перед появлением контента
	const timeout = setTimeout(() => {
		setVisibleSection(currentSection);
	}, 800);

	return () => clearTimeout(timeout);
	}, [currentSection]);


return (
	<div className="page">
	<Header currentSection={currentSection}/>
		<div className="page__wrapper" style={{
          transform: `translateY(-${currentSection * 100}vh)`,
          transition: "transform 2s ease", // Плавный переход
        }}>
			<div className="noise"></div>
			{sections.map((section, index) => (
			<div
				key={index}
				className={`view ${section.className}`}
			>
				{section.className == 'view__two' || section.className == 'view__six' || section.className == 'view__seven'? <div className="noise"></div> : ''}
				{section.content.map((content, i) => (
				<div
					key={i}
					className='content__wrapper'
					style={{
						opacity: visibleSection === index ? 1 : 0,
						transform: visibleSection === index ? "translateY(0)" : "translateY(20px)",
						transition: "opacity 3s ease, transform 1s ease",
					}}
				>
					{content}
				</div>
				))}
				</div>
			))}
		</div>
	</div>
		

)
}

export default App
