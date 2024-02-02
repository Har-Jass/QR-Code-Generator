import QRCode from 'qrcode'
import { useState } from 'react'

function isValidUrl(checkURL) {
	// Regular expression to match a typical URL pattern
    const urlPattern = /^(https?:\/\/)+(www\.)?[\w.-]+\.(com|in)(\/\S*)?$/i;

	return urlPattern.test(checkURL);
}

function App() {
	const [url, setUrl] = useState('')
	const [qr, setQr] = useState('')
	const [errorMessage, setErrorMessage] = useState('');

	const GenerateQRCode = () => {
		setQr('');
		if(isValidUrl(url)) {
			QRCode.toDataURL(url, {
				width: 800,
				margin: 0.5,
				color: {
					dark: '#161922',
					light: '#b9babc'
				}
			}, (err, url) => {
				if(err) {
					return console.error(err);
				}
				console.log(url);
				setQr(url);
			})
			setErrorMessage('');
		}
		else {
			setErrorMessage('Invalid URL. Please enter a valid URL.');
		}
	}

	const split_url = url.split('.');
	// const subdomain = split_url[0].split('//')[1];
	const subdomain = split_url[1];
	console.log(subdomain);

	return (
		<div className="app">
			<h1>QR Code Generator</h1>
			<input 
				type="text"
				placeholder="Paste URL"
				value={url}
				onChange={e => setUrl(e.target.value)}
			/>
			<button onClick={GenerateQRCode}>Generate</button>
			{
				errorMessage && 
					<p style={{ color: 'white', marginTop: '200px' }}>
						{
							errorMessage
						}
					</p>
			}
			{
				qr && <>
						<img src={qr} alt="qr-code" />
						<a href={qr} download={`${subdomain}`}>Download</a>
					  </>
			}
		</div>
	)
}

export default App
