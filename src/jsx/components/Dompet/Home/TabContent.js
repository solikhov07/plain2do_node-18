import React from 'react';


const IconSuccess = () =>{
	return(
		<>
			<svg className="bgl-success tr-icon" width="63" height="63" viewBox="0 0 63 63" fill="none" xmlns="http://www.w3.org/2000/svg">
				<g><path d="M35.2219 42.9875C34.8938 42.3094 35.1836 41.4891 35.8617 41.1609C37.7484 40.2531 39.3453 38.8422 40.4828 37.0758C41.6477 35.2656 42.2656 33.1656 42.2656 31C42.2656 24.7875 37.2125 19.7344 31 19.7344C24.7875 19.7344 19.7344 24.7875 19.7344 31C19.7344 33.1656 20.3523 35.2656 21.5117 37.0813C22.6437 38.8477 24.2461 40.2586 26.1328 41.1664C26.8109 41.4945 27.1008 42.3094 26.7727 42.993C26.4445 43.6711 25.6297 43.9609 24.9461 43.6328C22.6 42.5063 20.6148 40.7563 19.2094 38.5578C17.7656 36.3047 17 33.6906 17 31C17 27.2594 18.4547 23.743 21.1016 21.1016C23.743 18.4547 27.2594 17 31 17C34.7406 17 38.257 18.4547 40.8984 21.1016C43.5453 23.7484 45 27.2594 45 31C45 33.6906 44.2344 36.3047 42.7852 38.5578C41.3742 40.7508 39.3891 42.5063 37.0484 43.6328C36.3648 43.9555 35.55 43.6711 35.2219 42.9875Z" fill="#2BC155"></path><path d="M36.3211 31.7274C36.5891 31.9953 36.7203 32.3453 36.7203 32.6953C36.7203 33.0453 36.5891 33.3953 36.3211 33.6633L32.8812 37.1031C32.3781 37.6063 31.7109 37.8797 31.0055 37.8797C30.3 37.8797 29.6273 37.6008 29.1297 37.1031L25.6898 33.6633C25.1539 33.1274 25.1539 32.2633 25.6898 31.7274C26.2258 31.1914 27.0898 31.1914 27.6258 31.7274L29.6437 33.7453L29.6437 25.9742C29.6437 25.2196 30.2562 24.6071 31.0109 24.6071C31.7656 24.6071 32.3781 25.2196 32.3781 25.9742L32.3781 33.7508L34.3961 31.7328C34.9211 31.1969 35.7852 31.1969 36.3211 31.7274Z" fill="#2BC155"></path>
				</g>
			</svg>
		</>
	)
}
const IconCancel = () =>{
	return(
		<>
			<svg className="bgl-danger tr-icon" width="63" height="63" viewBox="0 0 63 63" fill="none" xmlns="http://www.w3.org/2000/svg">
				<g><path d="M35.2219 19.0125C34.8937 19.6906 35.1836 20.5109 35.8617 20.8391C37.7484 21.7469 39.3453 23.1578 40.4828 24.9242C41.6476 26.7344 42.2656 28.8344 42.2656 31C42.2656 37.2125 37.2125 42.2656 31 42.2656C24.7875 42.2656 19.7344 37.2125 19.7344 31C19.7344 28.8344 20.3523 26.7344 21.5117 24.9187C22.6437 23.1523 24.2461 21.7414 26.1328 20.8336C26.8109 20.5055 27.1008 19.6906 26.7726 19.007C26.4445 18.3289 25.6297 18.0391 24.9461 18.3672C22.6 19.4937 20.6148 21.2437 19.2094 23.4422C17.7656 25.6953 17 28.3094 17 31C17 34.7406 18.4547 38.257 21.1015 40.8984C23.743 43.5453 27.2594 45 31 45C34.7406 45 38.257 43.5453 40.8984 40.8984C43.5453 38.2516 45 34.7406 45 31C45 28.3094 44.2344 25.6953 42.7851 23.4422C41.3742 21.2492 39.389 19.4937 37.0484 18.3672C36.3648 18.0445 35.55 18.3289 35.2219 19.0125Z" fill="#FF2E2E"></path><path d="M36.3211 30.2726C36.589 30.0047 36.7203 29.6547 36.7203 29.3047C36.7203 28.9547 36.589 28.6047 36.3211 28.3367L32.8812 24.8969C32.3781 24.3937 31.7109 24.1203 31.0055 24.1203C30.3 24.1203 29.6273 24.3992 29.1297 24.8969L25.6898 28.3367C25.1539 28.8726 25.1539 29.7367 25.6898 30.2726C26.2258 30.8086 27.0898 30.8086 27.6258 30.2726L29.6437 28.2547L29.6437 36.0258C29.6437 36.7804 30.2562 37.3929 31.0109 37.3929C31.7656 37.3929 32.3781 36.7804 32.3781 36.0258L32.3781 28.2492L34.3961 30.2672C34.9211 30.8031 35.7851 30.8031 36.3211 30.2726Z" fill="#FF2E2E"></path></g>
			</svg>
		</>
	)
}
const StatusPending = () =>{
	return(
		<>
			<span className="text-light fs-16 font-w500 text-end d-block">Pending</span>
		</>
	)
}
const StatusComplete = () =>{
	return(
		<>
			<span className="text-success fs-16 font-w500 text-end d-block">Completed</span>
		</>
	)
}
const StatusCancel = () =>{
	return(
		<>
			<span className="text-danger fs-16 font-w500 text-end d-block">Canceled</span>
		</>
	)
}


const TransactionsData = [
	{ icons: <IconSuccess /> , title: 'XYZ Store ID', subtitle: 'Cashback', date:'June 4, 2021', price: '+$5,553', status: <StatusComplete />, },
	{ icons: <IconCancel /> , title: 'Chef Renata', subtitle: 'Transfer', date:'June 5, 2021', price: '-$167', status: <StatusPending />, },
	{ icons: <IconCancel /> , title: 'Cindy Alexandro', subtitle: 'Cashback', date:'June 6, 2021', price: '-$6,341', status: <StatusComplete />, },
	{ icons: <IconSuccess /> , title: 'Paipal', subtitle: 'Transfer', date:'June 8, 2021', price: '+$1,999', status: <StatusCancel />, },
	{ icons: <IconCancel /> , title: 'Hawkins Jr.', subtitle: 'Transfer', date:'June 8, 2021', price: '+$3,415', status: <StatusCancel />, },
]
const TransactionsData2 = [
	{ icons: <IconCancel /> , title: 'Chef Renata', subtitle: 'Transfer', date:'June 5, 2021', price: '-$167', status: <StatusPending />, },
	{ icons: <IconSuccess /> , title: 'XYZ Store ID', subtitle: 'Cashback', date:'June 4, 2021', price: '+$5,553', status: <StatusComplete />, },
	{ icons: <IconCancel /> , title: 'Hawkins Jr.', subtitle: 'Transfer', date:'June 8, 2021', price: '+$3,415', status: <StatusCancel />, },
]
const TransactionsData3 = [
	{ icons: <IconCancel /> , title: 'Hawkins Jr.', subtitle: 'Transfer', date:'June 8, 2021', price: '+$3,415', status: <StatusCancel />, },
	{ icons: <IconSuccess /> , title: 'Paipal', subtitle: 'Transfer', date:'June 8, 2021', price: '+$1,999', status: <StatusCancel />, },
	{ icons: <IconCancel /> , title: 'Chef Renata', subtitle: 'Transfer', date:'June 5, 2021', price: '-$167', status: <StatusPending />, },
	{ icons: <IconCancel /> , title: 'Cindy Alexandro', subtitle: 'Cashback', date:'June 6, 2021', price: '-$6,341', status: <StatusComplete />, },
]



export {TransactionsData, TransactionsData2, TransactionsData3};	 
