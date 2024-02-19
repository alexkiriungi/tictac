import { Link } from "react-router-dom";
import { Card } from 'flowbite-react';

export default function AlbumCard() {
  return (
    <div className='flex flex-col gap-6'>
        <h2 className='text-2xl font-semibold text-center'> Sample Cards</h2>
        <div className='flex flex-wrap gap-4 justify-center p-2'>
            <Card
            className='max-w-sm'
            imgAlt="#SportsBringsPeopleTogether"
            imgSrc='./public/images/sports.jpg'
            >
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Sports
                </h5>
                <p classNme="font-normal text-gray-700 dark:text-gray-400">
                    The smell of cheers and the sound of sweet beer! A feeling of happiness over 
                    a game with friends always hits differently! Try it somethime...
                </p>
            </Card>
            <Card
            className='max-w-sm'
            imgAlt="#ThereIsAThinLineBetweenLoveAndHate"
            imgSrc='./public/images/love.jpg'
            >
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Love vs Hate 
                </h5>
                <p classNme="font-normal text-gray-700 dark:text-gray-400">
                    There is a thin line between love and hate! Love is always conditional but hate
                    is inevitable. Opposites of the same nature and word count!...
                </p>
            </Card>
            <Card
            className='max-w-sm'
            imgAlt="#TomorrowIsNotPromisedDoItToday"
            imgSrc='./public/images/time.jpg'
            >
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Time 
                </h5>
                <p classNme="font-normal text-gray-700 dark:text-gray-400">
                    Time is running out! What have you accomplished so far? If you died today would
                     you feel fulfilled? If not, Do something about it!
                </p>
            </Card>
        </div>
    </div>
  );
}