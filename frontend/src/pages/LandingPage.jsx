import { Car, Fuel, Leaf, User } from 'lucide-react';
import React from 'react';

const LandingPage = () => {
    return (
        <div className="h-[89vh] flex flex-col items-center w-full bg-teal-200">
            <div style={{
                backgroundImage: 'url(https://img.icons8.com/fluency/48/leaf.png)',
                backgroundPosition: 'center', 
                height: '100vh',
                width: '100%', 
            }} className="flex-1 w-full flex justify-center items-center">
                <div className='flex items-center text-6xl text-center font-mono gap-2  font-bold'>
                    Together We Go Further
                </div>
            </div>

            <div className="flex-1 bg-white w-full py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    <div className="flex flex-col items-center text-center">
                        <Leaf />
                        <h3 className="text-xl font-semibold mb-2">Save the Environment</h3>
                        <p className="text-gray-600">
                            Reduce carbon emissions by sharing rides and helping to protect the planet.
                        </p>
                    </div>

                    <div className="flex flex-col items-center text-center">
                        <Fuel />
                        <h3 className="text-xl font-semibold mb-2">Save on Fuel</h3>
                        <p className="text-gray-600">
                            Share your journey, reduce fuel costs, and save money together.
                        </p>
                    </div>

                    <div className="flex flex-col items-center text-center">
                        <User />
                        <h3 className="text-xl font-semibold mb-2">Build Community</h3>
                        <p className="text-gray-600">
                            Carpooling brings people together and strengthens your local community.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
