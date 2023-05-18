import React from 'react';

const Footer = () => {
    return (
        <>
            <section className="">
                <div className=" bg-grey-400 dark:bg-gray-800 p-8">
                    <div className="sm:flex mb-4">
                        <div className="sm:w-1/4 h-auto">
                            <div className="text-orange-500 mb-2">Orange</div>
                                <ul className="list-reset leading-normal">
                                    <li className="hover:text-orange-500 text-grey-400">One</li>
                                    <li className="hover:text-orange-500 text-grey-400">Two</li>
                                    <li className="hover:text-orange-500 text-grey-400">Three</li>
                                    <li className="hover:text-orange-500 text-grey-400">Four</li>
                                    <li className="hover:text-orange-500 text-grey-400">Five</li>
                                    <li className="hover:text-orange-500 text-grey-400">Six</li>
                                    <li className="hover:text-orange-500 text-grey-400">Seven</li>
                                    <li className="hover:text-orange-500 text-grey-400">Eight</li>
                                </ul>
                        </div>
                        <div className="sm:w-1/4 h-auto sm:mt-0 mt-8">
                            <div className="text-blue-700 mb-2">Blue</div>
                            <ul className="list-reset leading-normal">
                                <li className="hover:text-blue-700 text-grey-400">One</li>
                                <li className="hover:text-blue-700 text-grey-400">Two</li>
                                <li className="hover:text-blue-700 text-grey-400">Three</li>
                            </ul>

                            <div className="text-blue-400 mb-2 mt-4">Blue-light</div>
                            <ul className="list-reset leading-normal">
                                <li className="hover:text-blue-400 text-grey-400">One</li>
                                <li className="hover:text-blue-400 text-grey-400">Two</li>
                                <li className="hover:text-blue-400 text-grey-400">Three</li>
                            </ul>

                        </div>
                        <div className="sm:w-1/4 h-auto sm:mt-0 mt-8">
                                <div className="text-green-700 mb-2">Green-dark</div>
                        <ul className="list-reset leading-normal">
                            <li className="hover:text-green-700 text-grey-400">One</li>
                            <li className="hover:text-green-700 text-grey-400">Two</li>
                            <li className="hover:text-green-700 text-grey-400">Three</li>
                        </ul>

                        <div className="text-green-400 mb-2 mt-4">Green-light</div>
                        <ul className="list-reset leading-normal">
                            <li className="hover:text-green-400 text-grey-darker">One</li>
                            <li className="hover:text-green-400 text-grey-darker">Two</li>
                            <li className="hover:text-green-400 text-grey-darker">Three</li>
                        </ul>


                        </div>
                        <div className="sm:w-1/2 sm:mt-0 mt-8 h-auto">
                            <div className="text-red-light mb-2 font-bold underline dark:text-gray-400 hover:text-cyan-300">Newsletter</div>
                            <p className="text-grey-darker leading-normal text-gray-500">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi, consectetur. </p>
                            <div className="mt-4 flex">
                                <input type="text" className="p-2 border border-grey-light round text-grey-dark text-sm h-auto" placeholder="Your email address" />
                                <button className="bg-orange-500 text-gray-300 font-semibold  rounded-sm h-auto text-xs p-3">Subscribe</button>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            
        </>
    );
};

export default Footer;
