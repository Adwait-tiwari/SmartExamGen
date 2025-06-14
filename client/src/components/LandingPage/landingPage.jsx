import React from 'react';
import Header from '../header/header';
import Footer from '../footer/footer';

function LandingPage(){
    return(
        <div className="bg-gray-100 font-sans">
            <Header/>
            <main className="container mx-auto py-12 px-6 sm:px-8">
                <section id="hero" className="mb-16 md:flex md:items-center md:justify-between">
                <div className="md:w-1/2 text-center md:text-left">
                    <h1 className="text-4xl font-bold text-indigo-700 mb-4">
                    Effortlessly Generate Engaging Question Papers
                    </h1>
                    <p className="text-lg text-gray-600 mb-6">
                    Save time and create high-quality assessments with our intuitive question paper generator.
                    </p>
                    <div className="space-x-4">
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-md">
                        Get Started 
                    </button>
                    </div>
                </div>
                </section>

                <section id="features" className="mb-16">
                <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">Key Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="bg-white rounded-lg shadow-md p-6 text-center">
                    {/* Icon for question types */}
                    <h3 className="text-xl font-semibold text-indigo-600 mb-2">Diverse Question Types</h3>
                    <p className="text-gray-700">Supports multiple-choice, true/false, fill-in-the-blanks, short answer, and more.</p>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-6 text-center">
                    {/* Icon for customization */}
                    <h3 className="text-xl font-semibold text-indigo-600 mb-2">Easy Customization</h3>
                    <p className="text-gray-700">Customize difficulty levels, topics, and marking schemes with ease.</p>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-6 text-center">
                    {/* Icon for time-saving */}
                    <h3 className="text-xl font-semibold text-indigo-600 mb-2">Time-Saving</h3>
                    <p className="text-gray-700">Generate papers in minutes, freeing up valuable teaching time.</p>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-6 text-center">
                    {/* Icon for organization */}
                    <h3 className="text-xl font-semibold text-indigo-600 mb-2">Organized Question Bank</h3>
                    <p className="text-gray-700">Store and manage your questions efficiently for future use.</p>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-6 text-center">
                    {/* Icon for export */}
                    <h3 className="text-xl font-semibold text-indigo-600 mb-2">Export Options</h3>
                    <p className="text-gray-700">Export your question papers in PDF or other preferred formats.</p>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-6 text-center">
                    {/* Icon for collaboration (if applicable) */}
                    <h3 className="text-xl font-semibold text-indigo-600 mb-2">Collaborative Features (Optional)</h3>
                    <p className="text-gray-700">Work with colleagues to create and review question papers.</p>
                    </div>
                </div>
                </section>

                <section id="how-it-works" className="mb-16">
                <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">How It Works</h2>
                <div className="md:flex justify-around items-center">
                    <div className="text-center mb-8 md:mb-0">
                    <span className="inline-flex items-center justify-center bg-indigo-100 text-indigo-500 rounded-full w-12 h-12 font-bold text-lg mb-4">1</span>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">Create Your Questions</h3>
                    <p className="text-gray-600">Easily add your questions through our intuitive interface or import them.</p>
                    </div>
                    <div className="text-center mb-8 md:mb-0">
                    <span className="inline-flex items-center justify-center bg-indigo-100 text-indigo-500 rounded-full w-12 h-12 font-bold text-lg mb-4">2</span>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">Customize Your Paper</h3>
                    <p className="text-gray-600">Select question types, set difficulty levels, and define the marking scheme.</p>
                    </div>
                    <div className="text-center">
                    <span className="inline-flex items-center justify-center bg-indigo-100 text-indigo-500 rounded-full w-12 h-12 font-bold text-lg mb-4">3</span>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">Generate & Export</h3>
                    <p className="text-gray-600">Preview your question paper and export it in your desired format.</p>
                    </div>
                </div>
                </section>

                <section id="benefits" className="mb-16">
                <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">Unlock the Benefits</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
                    {/* Icon for efficiency */}
                    <div className="bg-indigo-100 text-indigo-500 rounded-full w-10 h-10 flex items-center justify-center mr-4">
                        {/* Replace with your icon */}
                        <svg className="w-6 h-6 fill-current" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v6a1 1 0 102 0V7zm-1 4a1 1 0 112 0h-2z" clipRule="evenodd" /></svg>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-1">Boost Efficiency</h3>
                        <p className="text-gray-600">Streamline your assessment creation process and save valuable time.</p>
                    </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
                    {/* Icon for quality */}
                    <div className="bg-indigo-100 text-indigo-500 rounded-full w-10 h-10 flex items-center justify-center mr-4">
                        {/* Replace with your icon */}
                        <svg className="w-6 h-6 fill-current" viewBox="0 0 20 20"><path d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h14a1 1 0 001-1V4a1 1 0 00-1-1H3zm2 2v2h10V5H5zm-2 4v6h14V9H3z" /></svg>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-1">Enhance Quality</h3>
                        <p className="text-gray-600">Create well-structured and engaging question papers that accurately assess learning.</p>
                    </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
                    {/* Icon for flexibility */}
                    <div className="bg-indigo-100 text-indigo-500 rounded-full w-10 h-10 flex items-center justify-center mr-4">
                        {/* Replace with your icon */}
                        <svg className="w-6 h-6 fill-current" viewBox="0 0 20 20"><path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1V7z" /></svg>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-1">Increase Flexibility</h3>
                        <p className="text-gray-600">Tailor question papers to your specific curriculum and learning objectives.</p>
                    </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
                    {/* Icon for organization */}
                    <div className="bg-indigo-100 text-indigo-500 rounded-full w-10 h-10 flex items-center justify-center mr-4">
                        {/* Replace with your icon */}
                        <svg className="w-6 h-6 fill-current" viewBox="0 0 20 20"><path d="M4 2a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2H4zm2 2h12v2H6V4zm0 4h12v2H6V8zm0 4h12v2H6v-2zm-2 4h16v2H4v-2z" /></svg>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-1">Stay Organized</h3>
                        <p className="text-gray-600">Maintain a centralized repository of your questions for easy access and reuse.</p>
                    </div>
                    </div>
                </div>
                </section>

                <section id="call-to-action" className="py-12 bg-indigo-50">
                <div className="container mx-auto text-center">
                    <h2 className="text-3xl font-semibold text-indigo-700 mb-6">
                    Ready to Simplify Your Assessment Process?
                    </h2>
                    <p className="text-lg text-gray-600 mb-8">
                    Sign up today and experience the power of our question paper generator.
                    </p>
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-md text-lg">
                    Sign Up Now
                    </button>
                    <p className="mt-4 text-gray-600">
                    Or <a href="/demo" className="text-indigo-500 hover:underline">try our free demo</a>!
                    </p>
                </div>
                </section>
            </main>
            <Footer/>
      </div>
    )
}

export default LandingPage