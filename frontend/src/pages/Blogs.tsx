import React from 'react'
import { BlogCard } from '../components/BlogCard'

export const Blogs = () => {
  return (
    <div className="flex justify-center">
      <div className=" max-w-xl">
        <BlogCard
          authorName={'Satyam Srinath'}
          title={
            'Thank you for taking out some precious time of the your busy schedule and considering my application.'
          }
          content={
            'Thank you for taking out some precious time of the your busy schedule and considering my application.'
          }
          publishedDate={'2nd Feb 2024'}
        />
        <BlogCard
          authorName={'Satyam Srinath'}
          title={
            'Thank you for taking out some precious time of the your busy schedule and considering my application.'
          }
          content={
            'Thank you for taking out some precious time of the your busy schedule and considering my application.'
          }
          publishedDate={'2nd Feb 2024'}
        />
        <BlogCard
          authorName={'Satyam Srinath'}
          title={
            'Thank you for taking out some precious time of the your busy schedule and considering my application.'
          }
          content={
            'Thank you for taking out some precious time of the your busy schedule and considering my application.'
          }
          publishedDate={'2nd Feb 2024'}
        />
      </div>
    </div>
  )
}
