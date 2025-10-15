'use client'

import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@repo/ui/lib'
import { useEffect, useState } from 'react'
import { ArrowUpRightIcon } from 'lucide-react'

import { IProject } from '@/models/project'
import { Spinner } from '@/components/shared'
import { useFetchData } from '@/hooks/use-fetch-data'

interface Props {
	showAllProjects: boolean
	maxProjects?: number
}

export const ProjectsSection = ({ showAllProjects, maxProjects }: Props) => {
	const [filteredProjects, setFilteredProjects] = useState<IProject[]>([])
	const [selectedCategory, setSelectedCategory] = useState<string>('all')

	// pagination
	const [perPage] = useState<number>(7)
	const [currentPage, setCurrentPage] = useState<number>(1)

	// search
	const [searchQuery, setSearchQuery] = useState<string>('')

	// handle page change
	const paginate = (pageNumber: number) => {
		setCurrentPage(pageNumber)
	}

	// fetch content data
	const { allData, loading } = useFetchData<IProject[]>('/api/projects')

	// Filter data by search query AND publish status in one step
	const filteredContent =
		searchQuery.trim() === ''
			? allData?.filter((content) => content.status === 'publish') || []
			: allData?.filter(
					(content) =>
						content.status === 'publish' && content.title.toLowerCase().includes(searchQuery.toLowerCase()),
				) || []

	// total pages based on filtered content
	const totalPages = Math.ceil(filteredContent.length / perPage)

	// calculate index of the first content displayed on the current page
	const indexOfFirstContent = (currentPage - 1) * perPage
	const indexOfLastContent = currentPage * perPage

	// get current page of content (slice AFTER filtering)
	const currentContent = filteredContent.slice(indexOfFirstContent, indexOfLastContent)

	const buttonClasses = cn(
		'inline-flex h-8 items-center rounded-3xl border-none p-2 text-sm font-bold leading-none sm:h-12 sm:px-8 sm:py-4 sm:text-lg',
		'bg-[var(--week-white)] text-[var(--main-site-color)]',
		'dark:bg-[#140c1c] dark:text-[var(--pure-white)]',
		'hover:bg-gradient-to-r hover:from-[var(--main-site-color)] hover:to-[var(--dark-site-secondary)] hover:text-[var(--pure-white)]',
		'transition-all duration-300',
	)

	const activeClasses = cn(
		'bg-gradient-to-r from-[var(--main-site-color)] to-[#2a1454] text-[var(--pure-white)]',
		'dark:bg-gradient-to-r dark:from-[var(--main-site-color)] dark:to-[#2a1454] dark:text-[var(--pure-white)]',
	)

	useEffect(() => {
		// filter projects based on selected category
		if (selectedCategory === 'all') {
			setFilteredProjects((allData ?? []).filter((project) => project.status === 'publish'))
		} else {
			setFilteredProjects(
				(allData ?? []).filter(
					(project) => project.status === 'publish' && project.projectCategory?.[0] === selectedCategory,
				),
			)
		}
	}, [selectedCategory, allData])

	return (
		<section className='projects'>
			<div className='container m-auto'>
				<div className='relative mx-auto mb-12 mt-0 w-full max-w-[700px] text-center sm:mt-20'>
					<h2
						className='mb-0 inline-flex gap-4 bg-gradient-to-r from-[var(--main-site-color)] to-[var(--dark-site-secondary)] bg-clip-text text-4xl text-transparent sm:text-5xl dark:to-[#dddddd]'
						data-aos='fade-up'
					>
						My Recent Works
					</h2>

					<p
						className='mt-4 text-center text-sm text-[var(--dark-black)] sm:text-xl dark:text-[#999]'
						data-aos='fade-up'
					>
						I put your ideas and thus your wishes in the form of a unique web project that inspires you and
						your customers
					</p>
				</div>

				<div
					className='flex flex-wrap items-center justify-center gap-4'
					data-aos='fade-zoom-in'
					data-aos-easing='ease-in-back'
					data-aos-delay='300'
					data-aos-offset='0'
				>
					<button
						onClick={() => setSelectedCategory('all')}
						className={cn(buttonClasses, { [activeClasses]: selectedCategory === 'all' })}
					>
						All
					</button>

					<button
						onClick={() => setSelectedCategory('website-development')}
						className={cn(buttonClasses, { [activeClasses]: selectedCategory === 'website-development' })}
					>
						Website
					</button>

					<button
						onClick={() => setSelectedCategory('app-development')}
						className={cn(buttonClasses, { [activeClasses]: selectedCategory === 'app-development' })}
					>
						Apps
					</button>

					<button
						onClick={() => setSelectedCategory('design-system')}
						className={cn(buttonClasses, { [activeClasses]: selectedCategory === 'design-system' })}
					>
						Design
					</button>

					<button
						onClick={() => setSelectedCategory('website-migration')}
						className={cn(buttonClasses, { [activeClasses]: selectedCategory === 'website-migration' })}
					>
						Migration
					</button>

					<button
						onClick={() => setSelectedCategory('e-commerce-site')}
						className={cn(buttonClasses, { [activeClasses]: selectedCategory === 'e-commerce-site' })}
					>
						E-commerce
					</button>

					<button
						onClick={() => setSelectedCategory('performance-evaluation')}
						className={cn(buttonClasses, {
							[activeClasses]: selectedCategory === 'performance-evaluation',
						})}
					>
						Performance
					</button>
				</div>

				<div className='projects-card'>
					{loading ? (
						<div className='flex h-[50vh] w-screen items-center justify-center'>
							<Spinner />
						</div>
					) : (
						<>
							{filteredProjects.length === 0 ? (
								<h1 className='mt-12 flex h-[25vh] w-full items-center justify-center text-[var(--dark-black)] dark:text-[#999]'>
									No projects found
								</h1>
							) : (
								filteredProjects.slice(0, showAllProjects ? undefined : maxProjects).map((project) => (
									<Link
										key={project._id.toString()}
										href={`/projects/${project.slug}`}
										className='pro-card'
										data-aos='flip-left'
										data-aos-easing='ease-out-cubic'
										data-aos-duration='2000'
									>
										<div className='pro-img-box'>
											<Image
												src={project.images?.[0] || '/img/no-image.png'}
												alt={project.title ? `${project.title} image` : 'Project image'}
												width={550}
												height={400}
												quality={100}
											/>
										</div>

										<div className='pro-content-box'>
											<h2 className='mb-0 text-sm uppercase lg:text-lg xl:mb-4 xl:text-2xl'>
												{project.title}
											</h2>

											<ArrowUpRightIcon size={35} />
										</div>
									</Link>
								))
							)}
						</>
					)}
				</div>

				{!showAllProjects && (
					<div className='flex items-center justify-center'>
						<button className={cn(buttonClasses, 'mt-12 h-12 px-8 py-4 text-lg')}>
							<Link href='/projects'>View all projects</Link>
						</button>
					</div>
				)}
			</div>
		</section>
	)
}
