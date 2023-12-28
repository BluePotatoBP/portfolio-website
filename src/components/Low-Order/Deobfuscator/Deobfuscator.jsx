import './Deobfuscator.css'
import { useState, useCallback } from "react";

const Deobfuscator = () => {
	const [inputValue, setInputValue] = useState("")
	const handleInputValueChange = useCallback((e) => setInputValue(e.target.value), []);

	let deobfuscatedString

	// This is insanely stupid, why
	try {
		deobfuscatedString = atob(inputValue)
	} catch (error) {
		deobfuscatedString = null
	}

	let correctOutput = deobfuscatedString === atob("Ymx1ZXBvdGF0b2JwQGR1Y2suY29t")

	const copyToClipboard = () => {
		if (correctOutput) {
			navigator.clipboard.writeText(deobfuscatedString)
			setInputValue("Copied!")
			setTimeout(() => {
				setInputValue("")
			}, 3000);
		}

	}

	return (
		<div className="deobfuscator-container">
			<div className="deobfuscator-container-sleeve">
				<input type="text" value={inputValue} onChange={handleInputValueChange} className="deobfuscator-input" placeholder='~Magic input field~' maxLength={30} />
				<div className="deobfuscated-text"
					style={correctOutput ? { backgroundColor: "rgba(0, 255, 0, 0.2)", cursor: "pointer", width: "fit-content" } : null}
					onClick={copyToClipboard}
					title='Click to copy!'>
					{correctOutput ? deobfuscatedString : null}
				</div>
			</div>
		</div>
	)
}

export default Deobfuscator