import ring from '../../assets/images/ring.jpg'
import ring1 from '../../assets/images/ring1.jpg'
import ring2 from '../../assets/images/ring2.jpg'
import ring3 from '../../assets/images/ring3.jpg'
import ring4 from '../../assets/images/ring4.jpg'
import ring5 from '../../assets/images/ring5.jpg'
import ring6 from '../../assets/images/ring6.jpg'
import ring7 from '../../assets/images/ring7.jpg'
import style from 'components/catalog-item/catalog-item.module.css'
import {ItemPropsType} from "types/types";

export const CatalogItem = ({item}: ItemPropsType) => {

    //Функция рандомного целого числа для отображение картинок
    function randomInteger(min: number, max: number) {
        let number = min + Math.random() * (max + 1 - min);
        return Math.floor(number);
    }

    // массив с картинками колец для приятного визуала страницы
    const ringsImage = [
        ring, ring1, ring2, ring3, ring4, ring5, ring6, ring7
    ]

    return (
        <div className={style.catalogItem}>
            <span className={style.id}>id: {item.id}</span>
            <img src={ringsImage[randomInteger(0, 7)]} alt="кольцо" className={style.image}/>
            <span className={style.title}>{item.product}</span>
            <span className={style.brand}>{item.brand ? item.brand : 'Valantis'}</span>
            <span className={style.price}>{item.price} ₽</span>
        </div>
    );
};