"use client"
import About from '@/components/About';
import Campaigns from '@/components/Campaigns';
import Carousel from '@/components/Carousel';
import Customers from '@/components/customers/Customers';
import MenuWrapper from '@/components/product/MenuWrapper';
import Reservation from '@/components/Reservation';



const HomeIndex = ({ categoryList, productList }) => {

    return (
        <div>
            <Carousel />
            <Campaigns />
            <MenuWrapper categoryList={categoryList} productList={productList} />
            <About />
            <Reservation />
            <Customers />
        </div>
    );
}

export default HomeIndex;
