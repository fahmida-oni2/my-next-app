'use client';
import React, { useEffect, useState } from 'react';
import Card from '@/components/Card/Card'; 
import "animate.css"; 
import Loading from '../Loading/Loading';
import ErrorKit from '../ErrorKit/ErrorKit';

const KitSearching = ({ initialKits }) => {
    const [search, setSearch] = useState('');
    const [filteredKits, setFilteredKits] = useState(() => initialKits || []);
    const [loading, setLoading] = useState(false); 

    // --- PAGINATION STATE ---
    const [currentPage, setCurrentPage] = useState(1);
    const kitsPerPage = 8; 

    useEffect(() => {
        setFilteredKits(initialKits || []);
    }, [initialKits]);

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            const baseData = initialKits || []; 

            const results = search.trim()
                ? baseData.filter(kit =>
                    kit.title.toLowerCase().includes(search.toLowerCase()) 
                  )
                : baseData;

            setFilteredKits(results);
            setCurrentPage(1); 
            setLoading(false);
        }, 400);

        return () => clearTimeout(timer);
    }, [initialKits, search]);

    // --- PAGINATION LOGIC ---
    const indexOfLastKit = currentPage * kitsPerPage;
    const indexOfFirstKit = indexOfLastKit - kitsPerPage;
    const currentKits = filteredKits.slice(indexOfFirstKit, indexOfLastKit);
    const totalPages = Math.ceil(filteredKits.length / kitsPerPage);

    const showNoResult = filteredKits.length === 0 && search.trim().length > 0;

    return (
        <div className="pb-10">
            {/* Header and Search */}
            <div className='lg:flex justify-between items-center mt-5 px-5 mb-8'>
                <div className='font-bold text-2xl text-base-content'> 
                    <span className="text-primary">{filteredKits.length}</span> Kits Found
                </div>
                
                <div className="form-control">
                    <div className="input-group">
                        <input 
                            value={search} 
                            onChange={e => setSearch(e.target.value)} 
                            type="text" 
                            placeholder="Search kit title..." 
                            className="input input-bordered focus:input-primary w-full max-w-xs"
                        />
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div>
                {loading ? (
                    <div className='flex justify-center items-center p-20'>
                        <Loading />
                    </div>
                ) : showNoResult ? (
                    <ErrorKit searchTerm={search} />
                ) : (
                    <>
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-5'>
                            {currentKits.map(kit => (
                                <Card key={kit._id} kit={kit} />
                            ))}
                        </div>

                        {/* --- PAGINATION UI --- */}
                        {totalPages > 1 && (
                            <div className="flex justify-center mt-12">
                                <div className="join border border-base-300 shadow-sm">
                                    <button 
                                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                        className={`join-item btn btn-md ${currentPage === 1 ? 'btn-disabled' : 'btn-ghost'}`}
                                    >
                                        «
                                    </button>
                                    
                                    {[...Array(totalPages)].map((_, index) => (
                                        <button
                                            key={index + 1}
                                            onClick={() => setCurrentPage(index + 1)}
                                            className={`join-item btn btn-md ${
                                                currentPage === index + 1 
                                                ? 'btn-primary text-primary-content' 
                                                : 'btn-ghost'
                                            }`}
                                        >
                                            {index + 1}
                                        </button>
                                    ))}

                                    <button 
                                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                        className={`join-item btn btn-md ${currentPage === totalPages ? 'btn-disabled' : 'btn-ghost'}`}
                                    >
                                        »
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default KitSearching;