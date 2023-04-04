import React from "react"
import "./Footer.css"

import { BsTwitter, BsDiscord, BsGithub } from "react-icons/bs"


const Footer = () => {

	return (
		<footer className="footer-container">
			<div className="footer-content">
				<div className="footer-socials">
					<a href="https://twitter.com/BluePotatoBP" draggable={false} target="_blank" rel='noreferrer' aria-label="twitter" className="link"><BsTwitter className='icon' /></a>
					<a href="https://discord.gg/v8zkSc9" draggable={false} target="_blank" rel='noreferrer' aria-label="discord" className="link"><BsDiscord className='icon' /></a>
					<a href="https://github.com/BluePotatoBP" draggable={false} target="_blank" rel='noreferrer' aria-label="github" className="link"><BsGithub className='icon' /></a>
				</div>
			</div>
		</footer>
	)
}

export default Footer