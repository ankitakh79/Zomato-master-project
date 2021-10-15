import React from 'react'
import { MdContentCopy } from "react-icons/md"
import { FaDirections } from "react-icons/fa"
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'


const Mapview = (props) => {
    return (
        <>
            <div>
                <h4 className="text-xl font-normal">Call</h4>
                <h5 className="text-zomato-400 font-normal text-lg">{props.phno}</h5>
            </div>
            <div className="gap-3">
                <h4 className="text-2xl font-normal">Direction</h4>
                <div className="w-full h-48">
                    <MapContainer center={props.mapLocation} zoom={13} scrollWheelZoom={false}>
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={props.mapLocation}>
                            <Popup>
                                {props.title}
                            </Popup>
                        </Marker>
                    </MapContainer>
                </div>
            </div>
            <p>
                {props.address}
                </p>
                <div className="flex items-center gap-2">
                    <button className="flex items-center gap-3 px-3 py-2 text-gray-700 border border-gray-400 rounded-lg">
                        <MdContentCopy /> copy
                    </button>
                    <button className="flex items-center gap-3 px-3 py-2 text-gray-700 border border-gray-400 rounded-lg">
                        <span className="text-zomato-400">
                            <FaDirections />
                        </span> directions
                    </button>
                </div>
        </>
    )
}

export default Mapview