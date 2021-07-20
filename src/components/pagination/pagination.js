import React from 'react';

const Pagination = (props) => {
    const pageNumbers = [];

    if (props.ppl) {
        for (let i = 1; i <= Math.ceil(props.items.length/props.postsPerPage); i++) {
            pageNumbers.push(i);
        }
    }


    return (
        <nav>
            <ul className='pagination'>
                {pageNumbers.map(number => (
                    <li key={number} className='page-item'>
                        <a onClick={() => props.paginate(number)} href={`#${number}`} className='page-link'>
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Pagination;