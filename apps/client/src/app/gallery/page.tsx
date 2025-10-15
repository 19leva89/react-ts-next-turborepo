'use client'

/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

import { IPhoto } from '@/models/photo'
import { Spinner } from '@/components/shared'
import { useFetchData } from '@/hooks/use-fetch-data'

const GalleryPage = () => {
	const { allData, loading } = useFetchData<IPhoto[]>('/api/photos')

	return (
		<>
			<Head>
				<title>Sobolev: Gallery Photos</title>
			</Head>

			<div className='gallery-page'>
				<div className='container m-auto'>
					<div className='gallery-top-sec'>
						<div className='top-phone-sec'>
							<div className='left-title-sec'>
								<h4 data-aos='fade-right'>Sobolev Gallery Photos</h4>

								<h1 data-aos='fade-right'>
									Vaibhav <br /> Photographers
								</h1>

								<Link href='/gallery#gallery-images'>
									<button>View more</button>
								</Link>
							</div>

							<div className='right-img-sec'>
								<Image
									src='/img/gallery-1.jpg'
									alt='gallery'
									data-aos='flip-left'
									data-aos-ease='ease-in-cubic'
									data-aos-duration='2000'
									width={330}
									height={450}
								/>

								<div className='r-img-top'>
									<Image
										src='/img/gallery-2.jpg'
										alt='gallery'
										data-aos='flip-right'
										data-aos-ease='ease-in-cubic'
										data-aos-duration='2000'
										width={420}
										height={560}
									/>

									<Image
										src='/img/gallery-3.jpg'
										alt='gallery'
										data-aos='flip-right'
										data-aos-ease='ease-in-cubic'
										data-aos-duration='2000'
										width={300}
										height={400}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className='gallery-btm-photos' id='gallery-images'>
					<div className='container m-auto'>
						<div className='g-btm-title text-center'>
							<h3>
								<span>01:</span> Our portfolio
							</h3>
							<h2>
								Sobolev capture <span>All of your</span> <br /> beautiful moments
							</h2>
						</div>

						{loading ? (
							<div className='flex items-center justify-center'>
								<Spinner />
							</div>
						) : (
							<div className='gallery-image-grid'>
								{allData?.map((photo) => (
									<div
										key={photo._id.toString()}
										data-aos='flip-left'
										data-aos-ease='ease-in-cubic'
										data-aos-duration='2000'
										className='image-item'
									>
										<img
											src={photo.images && photo.images.length > 0 ? photo.images[0] : '/img/no-image.png'}
											alt='gallery'
										/>

										<div className='gallery-img-item-info'>
											<h2>{photo.title}</h2>
											<p>by Sobolev</p>
										</div>
									</div>
								))}
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	)
}

export default GalleryPage
