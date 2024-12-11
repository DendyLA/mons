import './form.scss'



function Form() {


    return(
        <section className="form">
            <div className="container">
                <div className="form__wrapper">
                    <div className="form__title">давайте обсудим <br />ваш проект</div>
                    <form action="" className="form__form">
                        <input type="text" className="form__input" placeholder='Ваш E-mail/Телефон'/>
                        <div className="form__contract">Согласен на обработку <a href="">персональных данных</a> </div>
                    </form>
                    <div className="form__bottom">
                        <div className="form__item"><a href="mailto:hello@monscons.ru">hello@monscons.ru</a></div>
                        <div className="form__item"><a href="tel:79269600940">+7 (926) 960 09 40</a></div>
                        <div className="form__item form__media">
                            <div className="form__media__item"><a href="">TELEGRAM</a></div>
                            <div className="form__media__item"><a href="">Сетка</a></div>
                            <div className="form__media__item"><a href="">Дзен</a></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Form;