import About from '@/components/About';
import Campaigns from '@/components/Campaigns';
import Carousel from '@/components/Carousel';
import Customers from '@/components/customers/Customers';
import MenuWrapper from '@/components/product/MenuWrapper';
import Reservation from '@/components/Reservation';
import React from 'react'



const HomeIndex = () => {
    return (
        <React.Fragment >
            <Carousel />
            <Campaigns />
            <MenuWrapper />
            <About />
            <Reservation />
            <Customers />
            {/* <ProductIndex /> */}

        </React.Fragment>
    )

}

export default HomeIndex;