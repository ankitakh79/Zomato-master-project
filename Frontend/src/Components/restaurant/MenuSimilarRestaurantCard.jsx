import React from 'react'
import { TiStar } from "react-icons/ti"

const MenuSimilarRestaurantCard = (props) => {
    return (
        <>
            <div className=" bg-white shadow rounded-md w-24 md:w-60 ">
                <div className="w-full h-52">
                    <img 
                        src={props.image} 
                        alt="food"
                        className="w-full h-full object-cover rounded-t-md"
                    />
                </div>
                <div className="flex flex-col gap-2 p-3">
                    <h3 className="font-semibold text-lg ">{ props.title }</h3>
                    <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-1">
                            <span className="flex items-center gap-1 bg-green-700 text-white  px-2 py-1 rounded">
                                3.0
                                <TiStar />
                            </span> 
                            DINING
                        </span>
                        <span className="w-2 h-4 border-r border-gray-500" />
                        <span className="flex items-center gap-1">
                            <span className="flex items-center gap-1 bg-green-700 text-white p-1 rounded">
                                3.0
                                <TiStar />
                            </span> 
                            DINING
                        </span>
                    </div>
                    <h4>Burger, Fast Food, Beverages, Desserts</h4>
                </div>
            </div>
        </>
    )
}

export default MenuSimilarRestaurantCard