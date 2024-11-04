import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
//Images
import circle from './../../../../images/pattern/circle.png';
import pattern6 from './../../../../images/pattern/pattern6.png';
import pattern8 from './../../../../images/pattern/pattern8.png';
import pattern9 from './../../../../images/pattern/pattern9.png';
import pattern10 from './../../../../images/pattern/pattern10.png';


const CardCenterOwl = () => {
	const settings = {
		dots: false,
		infinite: true,
		arrows: false,
		speed: 500,
		slidesToShow: 3,
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 1600,
				settings: {
				  slidesToShow: 3,
				  slidesToScroll: 1,
				  
				},
			},
			{
				breakpoint: 1400,
				settings: {
				  slidesToShow: 1,
				  slidesToScroll: 1,
				  centerMode: true,
				  centerPadding: "270px",
				  
				},
			},
			{
				breakpoint: 1024,
				settings: {
				  slidesToShow: 1,
				  slidesToScroll: 1,
				  centerMode: true,
				  centerPadding: "200px",
				  
				},
			},
			
			{
				breakpoint: 768,
				settings: {
				  slidesToShow: 1,
				  slidesToScroll: 1,
				},
			},
		],
	};
	return (
		<Slider  className="card-slider" {...settings}>
			<div className="items p-3">
				<div className="card-bx bg-orange mb-0">
					<img className="pattern-img" src={pattern8} alt="" />
					<div className="card-info text-white">
						<div className="d-flex align-items-center">
							<div className="me-auto">
								<p className="mb-1">Main Balance</p>
								<h2 className="fs-36 text-white mb-5">$673,412.66</h2>
							</div>
							<img src={circle} className="mb-4" alt="" />
						</div>
						<div className="d-flex">
							<div className="me-sm-5 me-3">
								<p className="fs-14 mb-1">VALID THRU</p>
								<span>08/21</span>
							</div>
							<div>
								<p className="fs-14 mb-1">CARD HOLDER</p>
								<span>Franklin Jr.</span>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="items p-3">
				<div className="card-bx bg-blue">
					<img className="pattern-img" src={pattern6} alt="" />
					<div className="card-info text-white">
						<img src={circle} className="mb-4" alt="" />
						<h2 className="text-white card-balance">$824,571.93</h2>
						<p className="fs-16">Wallet Balance</p>
						<div className="d-flex align-items-end">
							<span>+0,8% than last week</span>
							<div className="me-5 ms-auto">
								<p className="fs-14 mb-1">VALID THRU</p>
								<span>08/21</span>
							</div>
							<div>
								<p className="fs-14 mb-1">CARD HOLDER</p>
								<span>Franklin Jr.</span>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="items p-3">
				<div className="card-bx bg-green mb-0">
					<img className="pattern-img" src={pattern9} alt="" />
					<div className="card-info text-white">
						<div className="d-flex align-items-center">
							<div className="me-auto">
								<p className="mb-1">Main Balance</p>
								<h2 className="fs-36 text-white mb-5">$673,412.66</h2>
							</div>
							<img src={circle} className="mb-4" alt="" />
						</div>
						<div className="d-flex">
							<div className="me-5">
								<p className="fs-14 mb-1">VALID THRU</p>
								<span>08/21</span>
							</div>
							<div>
								<p className="fs-14 mb-1">CARD HOLDER</p>
								<span>Franklin Jr.</span>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="items p-3">
				<div className="card-bx bg-purpel mb-0">
					<img className="pattern-img" src={pattern10} alt="" />
					<div className="card-info text-white">
						<div className="d-flex align-items-center">
							<div className="me-auto">
								<p className="mb-1">Main Balance</p>
								<h2 className="fs-36 text-white mb-5">$673,412.66</h2>
							</div>
							<img src={circle} className="mb-4" alt="" />
						</div>
						<div className="d-flex">
							<div className="me-5">
								<p className="fs-14 mb-1">VALID THRU</p>
								<span>08/21</span>
							</div>
							<div>
								<p className="fs-14 mb-1">CARD HOLDER</p>
								<span>Franklin Jr.</span>
							</div>
						</div>
					</div>
				</div>
			</div>
			
		</Slider>
	);
};

export default CardCenterOwl;