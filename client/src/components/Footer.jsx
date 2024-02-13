import { Footer } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { BsLinkedin, BsGithub } from 'react-icons/bs';

export default function FooterComp () {
    return (
        <Footer container className='border border-t-8 border-blue-400'>
            <div className="w-full max-w-7xl mx-auto">
                <div className="grid  w-full justify-between sm:flex mdgrid-cols-1">
                    <div className="mt-5">
                        <Link to='/' className='self-center whitespace-nowrap text-lg
                            sm:text-xl font-bold dark:text-white'>
                            <span className='px-2 py1 bg-gradient-to-r from-pink-500
                            via-indigo-500 to-purple-500 rounded-lg text-white'>Tic</span>
                            Tac
                        </Link>
                    </div>
                    <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3">
                        <div>
                            <Footer.Title title='Album' />
                            <Footer.LinkGroup col>
                                <Footer.Link href='#'>
                                    Background
                                </Footer.Link>
                                <Footer.Link href='#'>
                                    Photos
                                </Footer.Link>
                            </Footer.LinkGroup>
                        </div>
                        <div>
                            <Footer.Title title='Socials' />
                            <Footer.LinkGroup col>
                                <Footer.Link href='https://linkedin.com/alex-kiriungi-719993200/'
                                target='_blank' rel='noopener noreferrer'>
                                    LinkedIn
                                </Footer.Link>
                                <Footer.Link href='https://github.com/alexkiriungi'
                                target='_blank' rel='noopener noreferrer'>
                                    GitHub
                                </Footer.Link>
                            </Footer.LinkGroup>
                        </div>
                        <div>
                        <Footer.Title title='Legal' />
                        <Footer.LinkGroup col>
                            <Footer.Link href='#'>
                                Terms &amp; Conditions
                            </Footer.Link>
                            <Footer.Link href='#'>
                                Privacy Policy
                            </Footer.Link>
                        </Footer.LinkGroup>
                        </div>
                    </div>
                </div>  
                <Footer.Divider />
                <div className='w-full sm:flex sm:items-center sm:justify-between'>
                    <Footer.Copyright 
                    href='https://alexkiriungi.github.io/portfolio'
                    target='_blank'
                    rel='noopener noreferrer'
                    by='AlexKiriungi'
                    year={new Date().getFullYear()} 
                    />
                    <div className='flex gap-6 sm:mt-0 mt-4 sm:justify-center'>
                        <Footer.Icon 
                        href='https://linkedin.com/alex-kiriungi-719993200/'
                        target='_blank' rel='noopener noreferrer'
                        icon={BsLinkedin} />
                        <Footer.Icon 
                        href='https://github.com/alexkiriungi'
                        target='_blank' rel='noopener noreferrer'
                        icon={BsGithub} />
                    </div>
                </div>  
            </div>    
        </Footer>
    );
}