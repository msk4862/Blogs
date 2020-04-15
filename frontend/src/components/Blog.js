import React from 'react'

import './styles/Blog.css'

const Blog = (props) => {

    return (
        <div className='card'>
            <div className='card-body'>
                <h4 className='card-title'><a href='#'>{props.title}</a></h4>
                <p className='card-text'>{props.desc}</p>
                <div className='row justify-content-between'>
                    <p className='col-6 col-sm-6 date'>Created on {props.date}</p>                    
                    <div className='col-4 col-sm-4 ml-auto'>
                        <i><span>by</span>
                            <a href='#' className='card-link'> author</a>
                        </i>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Blog