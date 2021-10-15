import React from 'react'
import classNames from 'classnames'

const InfoButtons = (props) => {
    return (
        <div>
            <button className={classNames("flex items-center gap-3 border border-zomato-400 py-2 px-4 rounded-lg",
                {
                    "text-white bg-zomato-400": props.isActive,
                }
                )}
            >
                {props.children}
            </button>
        </div>
    )
}

export default InfoButtons