'use client';
import { projects } from '../variables';
import { useState } from 'react';
import Image from 'next/image';
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill, BsFillArrowUpCircleFill } from 'react-icons/bs';

const ProjectDescription = ({ params }) => {
    const isBrowser = () => typeof window !== 'undefined';
    const scrollToTop = () => {
        if (!isBrowser()) return;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const project = projects.find((project) => project.id === Number(params.id));
    const [thumbnailId, setThumbnailId] = useState(0);

    const handleThumbnailUpdate = (delta) => {
        setThumbnailId((prev) => {
            if (prev + delta < 0) {
                return project.thumbnail - 1;
            } else {
                return (prev + delta) % project.thumbnail
            }
        }
        );
    }

    return (
        <main className='max-w-[800px] w-2/3 mx-auto my-10 flex flex-col gap-5 items-left'>
            {project.video ? project.video :
                <div className='flex items-center w-fit mx-auto'>
                    <BsFillArrowLeftCircleFill
                        className='mr-[-75px] z-40 text-3xl text-offwhite
                bg-highlight rounded-full  border-highlight border-2
                hover:text-highlight hover:bg-offwhite hover:border-offwhite'
                        onClick={() => handleThumbnailUpdate(-1)} />
                    <div>
                        <Image
                            width={600} height={350}
                            className='rounded-xl  z-50 w-[800px] h-[500px]'
                            src={`/projects/${project.id}/thumbnail_${thumbnailId}.JPG`}
                            style={{ objectFit: "contain" }}
                            alt='Image' />
                    </div>
                    <BsFillArrowRightCircleFill
                        className='ml-[-75px] z-40 text-3xl text-offwhite
                bg-highlight rounded-full  border-highlight border-2
                hover:text-highlight hover:bg-offwhite hover:border-offwhite'
                        onClick={() => handleThumbnailUpdate(1)} />
                </div>
            }
            <h1 className='text-3xl'>{project.title}</h1>
            <div className='flex gap-8 justify-between'>
                <p className=' font-light flex-2'>{project.description}</p>
                <div className='flex-1 min-w-[200px]'>
                    <h3>Tech Used</h3>
                    <ul className='list-disc'>
                        {project.technology.length === 0 ?
                            <li className='ml-7 font-light'>なし</li> :
                            project.technology.map((name, index) => {
                                return (<li key={index} className='ml-7 font-light'>
                                    {name}
                                </li>)
                            })}
                    </ul>
                </div>
            </div>
            {project.tldr ?
                <div className='bg-highlight2 rounded-xl p-5'>
                    <h3 className='text-xl'>TL;DR</h3>
                    <ul className='list-disc'>
                        {project.tldr.map((tldr, index) => {
                            return (<li className='ml-7' key={index}>{tldr}</li>)
                        })}
                    </ul>
                </div>
                : null}
            <div className='p-5'>

            {project.page}
            </div>
            <BsFillArrowUpCircleFill onClick={scrollToTop}
                className='fixed bottom-[10%] right-[5%] text-5xl hover:text-purple-200' />
        </main>
    )
}

export default ProjectDescription