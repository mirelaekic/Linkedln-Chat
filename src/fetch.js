const me = async () => {
	let TOKEN = process.env.REACT_APP_TOKEN
	console.log(TOKEN)
	console.log(process.env.REACT_APP_URL)
	try {
		let response = await fetch(`${process.env.REACT_APP_URL}profile/me`, {
			method: "GET",
			headers: new Headers({
				Authorization: `Bearer ${TOKEN}`,
			}),
		})
		response = await response.json()
		return response
		//console.log("user", response)
	} catch (e) {
		console.log("ERROR fetching HERE " + e)
	}
}
const addProfilePic = async (profile, userId) => {
	console.log("actually in")
	console.log(profile)
	console.log(userId)
	let TOKEN = process.env.REACT_APP_TOKEN
	try {
		let response = await fetch(
			`${process.env.REACT_APP_URL}profile/upload/${userId}`,
			{
				headers: new Headers({
					Authorization: `Bearer ${TOKEN}`,
				}),
				method: "POST",
				body: profile,
			}
		)
		response = await response.json()
		if (response.ok) {
			alert("profile pic changed")
		}
		console.log("Response: " + response)
		return response
	} catch (e) {
		console.log("ERROR fetching HERE " + e)
	}
}
export { me, addProfilePic }
