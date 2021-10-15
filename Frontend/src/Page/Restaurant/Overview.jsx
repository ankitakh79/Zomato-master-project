import React, { useState, useEffect } from 'react'
import { Link, useParams } from "react-router-dom"
import { IoMdArrowDropright } from "react-icons/io"
import Slider from 'react-slick';
import { useSelector, useDispatch } from "react-redux"
import ReactStars from "react-rating-stars-component";


//  Component
import MenuCollection from '../../Components/restaurant/MenuCollection';
import MenuSimilarRestaurantCard from '../../Components/restaurant/MenuSimilarRestaurantCard';
import { NextArrow, PrevArrow } from '../../Components/CarousalArrow';
import ReviewCard from '../../Components/restaurant/Reviews/reviewCard';
import Mapview from '../../Components/restaurant/Mapview';

import { getImage } from "../../Redux/Reducer/Image/Image.action";
import { getReviews } from "../../Redux/Reducer/Reviews/review.action";




const Overview = () => {
    const [menuImage, setMenuImages] = useState({ images: [] })
    const [reviews, setReviews] = useState([]);

    const { id } = useParams();

    const settings ={
        arrows: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        SliderToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    };

    const reduxState = useSelector(
        (globalStore) => globalStore.restaurant?.selectedRestaurant?.restaurant
    );

    const dispatch = useDispatch();

    useEffect(() => {
        if(reduxState){
            dispatch(getImage(reduxState?.menuImage)).then((data) => { 
                const images = [];
                data.payload.image?.images?.map(({location}) => images?.push(location));
                setMenuImages(images);
            });
            dispatch(getReviews(reduxState?._id)).then((data) => 
                setReviews(data.payload.reviews)
            );
        }
    }, []);

    const ratingChanged = (newRating) => {
        console.log(newRating);
      };
      const getLatLong = (mapAddress) => {
          return mapAddress?.split(",").map((item) => parseFloat(item));
      };
    return (
        <>
            <div className="flex flex-col md:flex-row relative">
                <div className="w-full md:w-8/12">
                    <h2 className="font-semibold text-lg md:text-2xl my-4">About this place</h2>
                    <div className="flex justify-between items-center">
                        <h4 className="text-lg font-medium">Menu</h4>
                        <Link to={`/restaurant/${id}/menu`}>
                            <span className="flex items-center gap-1 text-zomato-400">
                                See all menus <IoMdArrowDropright />
                            </span>
                        </Link>
                    </div>
                        <div className="flex flex-wrap gap-3 my-4">
                            <MenuCollection 
                                menuTitle="Menu"
                                pages="3"
                                image={menuImage}
                            />
                    </div>
                    <h4 className="text-2xl font-normal my-4">Cuisines</h4>
                    <div className="flex flex-wrap gap-2">
                        {reduxState?.cuisine.map((data) =>(
                        <span className="border border-gray-400 text-blue-600 px-2 py-1 rounded-full">{ data }</span>

                        ))}

                    </div>
                    <div className="my-4">
                        <h4 className="text-2xl font-normal">Average Cost</h4>
                        <h6>₹{reduxState?.averageCost} for one order (approx.)</h6>
                        <small className="text-gray-500">Exclusive of applicable taxes and charges, if any</small>
                    </div>
                    <div className="my-4">
                        <h4 className="text-2xl font-normal">Similar Restaurants</h4>
                        <Slider {...settings}>
                            <MenuSimilarRestaurantCard 
                                image="https://b.zmtcdn.com/data/pictures/chains/4/50674/14a1efab6820232e70c0ab3977eea12e_featured_v2.jpg?output-format=webp"
                                title="McDonald's"
                            />
                            <MenuSimilarRestaurantCard 
                                image="https://b.zmtcdn.com/data/pictures/chains/4/50674/14a1efab6820232e70c0ab3977eea12e_featured_v2.jpg?output-format=webp"
                                title="McDonald's"
                            />
                            <MenuSimilarRestaurantCard 
                                image="https://b.zmtcdn.com/data/pictures/chains/4/50674/14a1efab6820232e70c0ab3977eea12e_featured_v2.jpg?output-format=webp"
                                title="McDonald's"
                            />
                            <MenuSimilarRestaurantCard 
                                image="https://b.zmtcdn.com/data/pictures/chains/4/50674/14a1efab6820232e70c0ab3977eea12e_featured_v2.jpg?output-format=webp"
                                title="McDonald's"
                            />
                        </Slider>
                    </div>
                    <div className="my-4">
                        <h4 className="text-2xl font-normal">Rate your experience for</h4>
                        <div class="mt-2 flex items-center text-xl">
                            <label class="inline-flex items-center">
                                <input type="radio" className="form-radio text-zomato-400" name="radio-colors" checked/>
                                <span class="ml-2">Dining</span>
                            </label>
                            <label class="inline-flex items-center md:ml-6">
                                <input type="radio" className="form-radio ml-40  text-zomato-400" name="radio-colors"  />
                                <span class="ml-2">Delivery</span>
                            </label>
                        </div>
                            <ReactStars
                                count={5}
                                onChange={ratingChanged}
                                size={24}
                                activeColor="#ffd700"
                            />
                            {reviews.map((reviewData) => (
                                <ReviewCard {...reviewData} />
                            ))}
                    </div>
                    <div className="my-4 w-full md:hidden flex flex-col gap-4">
                        <Mapview 
                                title={reduxState?.name} 
                                phno={`+91${reduxState?.contactNumber}`}
                                mapLocation={getLatLong(reduxState?.mapLocation)}
                                address={reduxState?.address}
                        />
                    </div>
                    <div className="my-4 flex flex-col gap-1">
                        <ReviewCard />
                       
                    </div>
                </div>
                <aside 
                    style={{ height: "fit-content" }}
                    className="hidden md:flex md:w-4/12 sticky rounded-xl top-2 bg-white p-3 shadow-md flex-col gap-4">
                        <Mapview 
                            title={reduxState?.name} 
                            phno={`+91${reduxState?.contactNumber}`}
                            mapLocation={getLatLong(reduxState?.mapLocation)}
                            address={reduxState?.address}
                        />
                </aside>          
            </div>  
        </>
    )
}

export default Overview